import PropTypes from "prop-types";
import { useState } from "react";
import { useSeries } from "../context/SeriesContext";
import { Link } from 'react-router-dom';
import { IoTrashBinSharp, IoPencilSharp } from "react-icons/io5";

function SeriesCard({ series }) {
    const server = 'http://localhost:3000/img/';

    const { deleteSeries } = useSeries();

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
                <h1 className="text-2xl font-bold">{series.name}</h1>
                <div className="flex gap-x-2 items-center">
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                        onClick={() => deleteSeries(series._id)}
                    >
                        <IoTrashBinSharp />
                    </button>
                    <Link
                        to={'/series/' + series._id}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                        <IoPencilSharp />
                    </Link>
                </div>
            </header>

            {/* Imagen de la carátula de la serie */}
            <div className="relative">
                <img
                    src={server + series.image}
                    alt="Imagen de la serie"
                    className="w-full h-[300px] object-cover rounded-lg transition-transform duration-300 ease-in-out"
                />
                {/* Descripción que aparece al pasar el mouse */}
                <div
                    className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300"
                    onClick={toggleDescription}
                >
                    <div className="text-center p-4 max-w-xs overflow-hidden">
                        <p className="whitespace-normal break-words">
                            {series.description}
                        </p>
                    </div>
                </div>
            </div>

            <div className="my-4 flex justify-between items-center">
                <div className="flex flex-col">
                    <p className="text-slate-300 my-2">
                        <span className="font-bold">Temporadas: </span>{series.seasons}
                    </p>
                    <p className="text-slate-300 my-2">
                        <span className="font-bold">Categoría: </span>{series.category}
                    </p>
                </div>
                {/* Calificación con tamaño y estilo ajustados */}
                <div className={`w-16 h-16 flex items-center justify-center rounded-full text-white ${getCalificationStyles(series.calification)} text-xl font-semibold`}>
                    {series.calification}
                </div>
            </div>
        </div>
    );
}

SeriesCard.propTypes = {
    series: PropTypes.object.isRequired,
};

export default SeriesCard;
