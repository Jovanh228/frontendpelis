import { useEffect, useState } from "react";
import axios from "axios";
import HomeCard from "../components/HomeCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

function HomePage() {
  const server = import.meta.env.VITE_BASE_URL;
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [error, setError] = useState(null);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState({});
    const [username, setUsername] = useState({});
    const [activeComments, setActiveComments] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const moviesResponse = await axios.get(`${server}/api/public-movies`);
                const seriesResponse = await axios.get(`${server}/api/public-series`);
                setMovies(moviesResponse.data);
                setSeries(seriesResponse.data);
            // eslint-disable-next-line no-unused-vars
            } catch (error) {
                setError("Error al cargar las películas y series. Intenta nuevamente más tarde.");
            }
        };
        fetchData();
    }, []);

    const fetchComments = async (id, type) => {
        try {
            const url = type === "movie"
                ? `${server}/api/products/${id}/comments`
                : `${server}/api/series/${id}/comments`;
            const response = await axios.get(url);
            setComments((prev) => ({ ...prev, [id]: response.data }));
        } catch (error) {
            console.error("Error al obtener comentarios:", error);
        }
    };

    const toggleComments = (id, type) => {
        if (activeComments === id) {
            setActiveComments(null);
        } else {
            setActiveComments(id);
            fetchComments(id, type);
        }
    };

    const handleAddComment = async (id, type) => {
        if (!username[id] || !newComment[id]) {
            alert("Por favor, completa tu nombre y comentario.");
            return;
        }

        try {
            const url = type === "movie"
                ? `${server}/api/products/${id}/comments`
                : `${server}/api/series/${id}/comments`;

            await axios.post(url, { username: username[id], text: newComment[id] });

            setNewComment((prev) => ({ ...prev, [id]: "" }));
            setUsername((prev) => ({ ...prev, [id]: "" }));
            fetchComments(id, type);
        } catch (error) {
            console.error("Error al añadir comentario:", error);
        }
    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 max-w-7xl w-full p-10 rounded-md">
                {/* Navegación */}
                <div className="flex justify-center gap-10 mb-8">
                    <a href="#peliculas" className="text-blue-400 hover:text-blue-500 font-bold text-lg transition duration-300">
                        Ver Películas
                    </a>
                    <a href="#series" className="text-blue-400 hover:text-blue-500 font-bold text-lg transition duration-300">
                        Ver Series
                    </a>
                </div>

                {error && <p className="text-red-500">{error}</p>}

                {/* Carrusel de Películas */}
                <h2 id="peliculas" className="text-3xl font-semibold text-white mt-5 mb-4 text-center">
                    Películas
                </h2>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="w-full"
                >
                    {movies.length > 0 ? (
                        movies.map((movie) => (
                            <SwiperSlide key={movie._id}>
                                <HomeCard
                                    item={movie}
                                    type="movie"
                                    toggleComments={toggleComments}
                                    activeComments={activeComments}
                                    comments={comments}
                                    handleAddComment={handleAddComment}
                                    setUsername={setUsername}
                                    setNewComment={setNewComment}
                                    newComment={newComment}
                                    username={username}
                                />
                            </SwiperSlide>
                        ))
                    ) : (
                        <p className="text-gray-300 text-center">No hay películas para mostrar.</p>
                    )}
                </Swiper>

                {/* Carrusel de Series */}
                <h2 id="series" className="text-3xl font-semibold text-white mt-10 mb-4 text-center">
                    Series
                </h2>
                <Swiper
                    modules={[Navigation, Pagination]}
                    spaceBetween={20}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    breakpoints={{
                        640: { slidesPerView: 1 },
                        768: { slidesPerView: 2 },
                        1024: { slidesPerView: 3 },
                    }}
                    className="w-full"
                >
                    {series.length > 0 ? (
                        series.map((serie) => (
                            <SwiperSlide key={serie._id}>
                                <HomeCard
                                    item={serie}
                                    type="series"
                                    toggleComments={toggleComments}
                                    activeComments={activeComments}
                                    comments={comments}
                                    handleAddComment={handleAddComment}
                                    setUsername={setUsername}
                                    setNewComment={setNewComment}
                                    newComment={newComment}
                                    username={username}
                                />
                            </SwiperSlide>
                        ))
                    ) : (
                        <p className="text-gray-300 text-center">No hay series para mostrar.</p>
                    )}
                </Swiper>
            </div>
        </div>
    );
}

export default HomePage;
