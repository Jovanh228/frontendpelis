import { useForm, Controller } from "react-hook-form";
import { useSeries } from "../context/SeriesContext";
import uploadIcon from "../assets/addphoto.svg";
import { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IoBagAdd } from "react-icons/io5";

function SeriesFormPage() {
    const server = import.meta.env.VITE_BASE_URL+"/img/";

  const { register, handleSubmit, control, setValue, setError, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      seasons: 0,
      calification: 0,
      category: "",
      description: "",
      image: uploadIcon,
    },
  });
  const { createSeries, getSerie, updateSeriesNoUpdateImage, updateSeries } = useSeries();
  const [selectedImage, setSelectedImage] = useState(uploadIcon);
  const inputImage = useRef(null);
  const navigate = useNavigate();
  const params = useParams();
  const [updateImage, setUpdateImage] = useState(false);

  useEffect(() => {
    async function loadSerie() {
      if (params.id) {
        const serie = await getSerie(params.id);
        setValue("name", serie.name);
        setValue("seasons", serie.seasons);
        setValue("calification", serie.calification);
        setValue("category", serie.category);
        setValue("description", serie.description);
        setValue("image", server + serie.image);
        setSelectedImage(server + serie.image);
      }
    }
    loadSerie();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    if (data.image === uploadIcon) {
      setError("image", {
        type: "manual",
        message: "La imagen es obligatoria",
      });
      return;
    }

    if (params.id) {
      if (!updateImage) {
        const updateData = {
          name: data.name,
          seasons: data.seasons.toString(),
          calification: data.calification.toString(),
          category: data.category.toString(),
          description: data.description.toString(),
          image: data.image
        };
        updateSeriesNoUpdateImage(params.id, updateData);
      } else {
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("seasons", data.seasons);
        formData.append("calification", data.calification);
        formData.append("category", data.category);
        formData.append("description", data.description);
        formData.append("image", data.image);
        updateSeries(params.id, formData);
      }
    } else {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("seasons", data.seasons);
      formData.append("calification", data.calification);
      formData.append("category", data.category);
      formData.append("description", data.description);
      formData.append("image", data.image);
      createSeries(formData);
    }
    navigate("/series");
  });

  const handleImageClick = () => {
    inputImage.current.click();
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    setSelectedImage(file ? URL.createObjectURL(file) : uploadIcon);
    setUpdateImage(!!file);
    field.onChange(file);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form onSubmit={onSubmit}>
          <h1 className="text-2xl text-center font-bold my-4">Registrar Serie</h1>

          <label htmlFor="name">Título</label>
          <input
            type="text"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Título"
            {...register("name", { required: "El título es obligatorio" })}
            autoFocus
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}

          <label htmlFor="seasons">Temporadas</label>
          <input
            type="number"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Número de temporadas"
            {...register("seasons", { required: "El número de temporadas es obligatorio", valueAsNumber: true })}
          />
          {errors.seasons && <p className="text-red-500">{errors.seasons.message}</p>}

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

          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Categoría"
            {...register("category", { required: "La categoría es obligatoria" })}
          />
          {errors.category && <p className="text-red-500">{errors.category.message}</p>}

          <label htmlFor="description">Descripción</label>
          <textarea
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Descripción de la serie"
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
              onClick={() => { navigate('/series'); }}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SeriesFormPage;
