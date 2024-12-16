import PropTypes from "prop-types";
import { useState } from "react";
import { useProducts } from "../context/MovieContext";
import { Link } from 'react-router-dom';
import { IoTrashBinSharp, IoPencilSharp } from "react-icons/io5";

function ProductCard({ product }) {
    const server = import.meta.env.VITE_BASE_URL+"/img/";

    const { deleteProduct } = useProducts();

    const getCalificationStyles = (calification) => {
        if (calification <= 4) return "bg-red-500";
        if (calification <= 8) return "bg-yellow-500";
        return "bg-green-500";
    };

    const [setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(prevState => !prevState);
    };

    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-sm overflow-hidden">
            <header className="flex justify-between">
                <h1 className="text-2xl font-bold">{product.name}</h1>
                <div className="flex gap-x-2 items-center">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        onClick={() => deleteProduct(product._id)}
                    >
                        <IoTrashBinSharp />
                    </button>
                    <Link
                        to={'/products/' + product._id}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                        <IoPencilSharp />
                    </Link>
                </div>
            </header>

            {/* Imagen de la carátula de la película */}
            <div className="relative">
                <img
                    src={server + product.image}
                    alt="Imagen de la película"
                    className="w-full h-[300px] object-cover rounded-lg transition-transform duration-300 ease-in-out"
                />
                {/* Descripción que aparece al pasar el mouse */}
                <div
                    className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                    onClick={toggleDescription}
                >
                    <div className="text-center p-4 max-w-xs overflow-hidden">
                        <p className="whitespace-normal break-words">
                            {product.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="my-4 flex justify-between items-center">
                <div className="flex flex-col">
                    <p className="text-slate-300 my-2">
                        <span className="font-bold">Duracion: </span>{product.duration}
                    </p>
                    <p className="text-slate-300 my-2">
                        <span className="font-bold">Categoría: </span>{product.category}
                    </p>
                </div>
                {/* Calificación con tamaño y estilo ajustados */}
                <div className={`w-16 h-16 flex items-center justify-center rounded-full text-white ${getCalificationStyles(product.calification)} text-xl font-semibold`}>
                    {product.calification}
                </div>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
};

export default ProductCard;
