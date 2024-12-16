import { useForm, Controller } from "react-hook-form";
import { useProducts } from "../context/MovieContext";
import uploadIcon from "../assets/addphoto.svg";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoBagAdd } from "react-icons/io5";

function ProductsFormPage() {
  const server = import.meta.env.VITE_BASE_URL+"/img/";
  const { register, handleSubmit, control, setValue, setError, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      duration: 0,
      calification: 0,
      category: "",
      description:"",
      image: uploadIcon,
    },
  });
  const { createProduct, getProduct, updateProductNoUpdateImage, updateProduct } = useProducts();
  const [selectedImage, setSelectedImage] = useState(uploadIcon);
  const inputImage = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  const [updateImage, setUpdateImage] = useState(false);

  useEffect(() => {
    async function loadProduct() {
      if (params.id) {
        const product = await getProduct(params.id);
        setValue("name", product.name);
        setValue("duration", product.duration);
        setValue("calification", product.calification);
        setValue("category", product.category);
        setValue("description", product.description);
        setValue("image", server + product.image); // Sincronizar con el campo 'image'
        setSelectedImage(server + product.image);
      }
    }
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    // Validar imagen si no se ha actualizado
    if (data.image === uploadIcon) {
      setError("image", {
        type: "manual",
        message: "La imagen es obligatoria",
      });
      return; // Evita que el formulario se envíe si la imagen no está seleccionada
    }

    if (params.id) {
      if (!updateImage) {
        const updateData = {
          name: data.name,
          duration: data.duration.toString(),
          calification: data.calification.toString(),
          category: data.category.toString(),
          description: data.description.toString(),
          image: data.image
        };
        updateProductNoUpdateImage(params.id, updateData);
      } else {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("duration", data.duration);
        formData.append("calification", data.calification);
        formData.append("category", data.category);
        formData.append("description", data.description);
        formData.append("image", data.image); // Archivo
        updateProduct(params.id, formData);
      }
    } else {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("duration", data.duration);
      formData.append("calification", data.calification);
      formData.append("category", data.category);
        formData.append("description", data.description);
      formData.append("image", data.image); // Archivo
      createProduct(formData);
    }
    navigate("/products");
  });

  const handleImageClick = () => {
    inputImage.current.click();
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    setSelectedImage(file ? URL.createObjectURL(file) : uploadIcon);
    setUpdateImage(!!file); // Indicar que se está cambiando la imagen
    field.onChange(file);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl text-center font-bold my-4">Registrar Pelicula</h1>

          <label htmlFor="name">Titulo</label>
          <input
            type="text"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Titulo"
            {...register("name", { required: "El titulo es obligatorio" })}
            autoFocus
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <label htmlFor="duration">Duracion</label>
          <input
            type="number"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Duracion de la pelicula"
            {...register("duration", { required: "La duracion es obligatoria", valueAsNumber: true })}
          />
          {errors.price && <p className="text-red-500">{errors.price.message}</p>}

          <div className="my-4">
    <label htmlFor="calification" className="block text-white font-semibold mb-2">
        Calificación
    </label>
    <select
        id="calification"
        className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
        {...register("calification", { required: "La calificación es obligatoria" })}
        defaultValue=""
    >
        <option value="" disabled>Elige una calificación del 1 al 10</option>
        {Array.from({ length: 10 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
                {i + 1}
            </option>
        ))}
    </select>
    {errors.calification && <p className="text-red-500 mt-1 text-sm">{errors.calification.message}</p>}
</div>

          
          
          <label htmlFor="Categoria">Categoria</label>
          <input
           type="text"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Categoria"
            {...register("category", { required: "La categoria es obligatoria" })}
          />
          {errors.category && <p className="text-red-500">{errors.description.message}</p>}

          <label htmlFor="description">Descripción</label>
<textarea
  className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
  placeholder="Descripcion de la pelicula"
  {...register("description", { required: "La descripción es obligatoria" })}
/>
{errors.description && <p className="text-red-500">{errors.description.message}</p>}


          

          <label htmlFor="image">Insertar Imagen</label>
          <div className="py-2 my-2">
            {selectedImage && (
              <img
                src={selectedImage}
                alt="Imagen seleccionada"
                width={200}
                height={200}
                className="max-h-[200px] object-contain"
                onClick={handleImageClick}
              />
            )}
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <input
                  type="file"
                  ref={inputImage}
                  onChange={(e) => handleImageChange(e, field)}
                  className="hidden"
                />
              )}
            />
          </div>
          {errors.image && <p className="text-red-500">{errors.image.message}</p>}

          <div className="flex space-x-4 mt-4">
            <button
              className="bg-transparent hover:bg-zinc-500 text-zinc-500 font-semibold hover:text-white py-2 px-4 border border-zinc-500 hover:border-transparent rounded flex items-center justify-center w-full"
              type="submit"
            >
              <IoBagAdd size={30} className="mr-2" />
              Agregar
            </button>
            <button
              className="bg-transparent hover:bg-red-500 text-red-500 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded flex items-center justify-center w-full"
              type="button"
              onClick={() => { navigate('/products'); }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductsFormPage;
