import PropTypes from "prop-types";

function HomeCard({
    item,
    type,
    toggleComments,
    activeComments,
    comments,
    handleAddComment,
    setUsername,
    setNewComment,
    newComment,
    username,
}) {
    const server = import.meta.env.VITE_BASE_URL+"/img/";

    const getCalificationStyles = (calification) => {
        if (calification <= 4) return "bg-red-500";
        if (calification <= 8) return "bg-yellow-500";
        return "bg-green-500";
    };

    return (
        <div className="bg-zinc-800 max-w-md w-full p-5 rounded-lg overflow-hidden shadow-lg">
            {/* Header */}
            <header className="flex justify-between items-center mb-3">
                <h1 className="text-xl font-bold text-white">{item.name}</h1>
            </header>

            {/* Imagen */}
            <div className="relative">
                <img
                    src={server + item.image}
                    alt={item.name}
                    className="w-full h-52 object-cover rounded-md"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-70 text-white flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-md p-4">
                    <p className="text-center">{item.description}</p>
                </div>
            </div>

            {/* Información */}
            <div className="my-3">
                <p className="text-slate-300 text-sm">
                    <span className="font-bold">Categoría:</span> {item.category}
                </p>
                {type === "series" && (
                    <p className="text-slate-300 text-sm">
                        <span className="font-bold">Temporadas:</span> {item.seasons}
                    </p>
                )}
                {type === "movie" && (
                    <p className="text-slate-300 text-sm">
                        <span className="font-bold">Duración:</span> {item.duration} min
                    </p>
                )}
            </div>

            {/* Calificación */}
            <div
                className={`w-12 h-12 flex items-center justify-center rounded-full text-white ${getCalificationStyles(
                    item.calification
                )} text-lg font-semibold mx-auto`}
            >
                {item.calification}
            </div>

            {/* Botón para mostrar/ocultar comentarios */}
            <button
                onClick={() => toggleComments(item._id, type)}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md w-full"
            >
                {activeComments === item._id
                    ? "Ocultar Comentarios"
                    : "Mostrar Comentarios"}
            </button>

            {/* Comentarios */}
            {activeComments === item._id && (
                <div className="mt-4">
                    <ul className="bg-gray-700 p-3 rounded-md max-h-32 overflow-y-auto text-sm mb-2">
                        {comments[item._id]?.length > 0 ? (
                            comments[item._id].map((comment, index) => (
                                <li
                                    key={index}
                                    className="text-gray-300 mb-1 whitespace-pre-wrap break-words"
                                >
                                    <strong className="text-blue-400">
                                        {comment.username}:
                                    </strong>{" "}
                                    {comment.text}
                                </li>
                            ))
                        ) : (
                            <li className="text-gray-400">No hay comentarios aún.</li>
                        )}
                    </ul>

                    {/* Formulario para agregar comentario */}
                    <input
                        type="text"
                        placeholder="Tu nombre"
                        value={username[item._id] || ""}
                        onChange={(e) =>
                            setUsername({ ...username, [item._id]: e.target.value })
                        }
                        className="mt-2 w-full p-2 rounded bg-gray-600 text-white placeholder-gray-400"
                    />
                    <textarea
                        placeholder="Escribe tu comentario..."
                        value={newComment[item._id] || ""}
                        onChange={(e) =>
                            setNewComment({ ...newComment, [item._id]: e.target.value })
                        }
                        className="mt-2 w-full p-2 rounded bg-gray-600 text-white placeholder-gray-400 resize-none"
                    />
                    <button
                        onClick={() => handleAddComment(item._id, type)}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md mt-2 w-full"
                    >
                        Enviar Comentario
                    </button>
                </div>
            )}
        </div>
    );
}

HomeCard.propTypes = {
    item: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    toggleComments: PropTypes.func.isRequired,
    activeComments: PropTypes.string,
    comments: PropTypes.object,
    handleAddComment: PropTypes.func.isRequired,
    setUsername: PropTypes.func.isRequired,
    setNewComment: PropTypes.func.isRequired,
    newComment: PropTypes.object,
    username: PropTypes.object,
};

export default HomeCard;
