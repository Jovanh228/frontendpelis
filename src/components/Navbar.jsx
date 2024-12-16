import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { IoPersonAdd, IoLogIn, IoLogOut, IoPerson } from "react-icons/io5";
import { FaPlus, FaFilm, FaTv } from "react-icons/fa";
import { useState } from "react";

function Navbar() {
    const { isAuthenticated, logout, user } = useAuth();
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [contentMenuOpen, setContentMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleContentMenuClick = () => {
        if (isAuthenticated) {
            setContentMenuOpen(!contentMenuOpen);
        } else {
            navigate("/");
        }
    };

    const handleUserMenuClick = () => {
        setUserMenuOpen(!userMenuOpen);
    };

    const closeMenus = () => {
        setUserMenuOpen(false);
        setContentMenuOpen(false);
    };

    return (
        <nav className="bg-gradient-to-r from-red-600 to-red-800 px-5 py-4 rounded-lg flex justify-between items-center shadow-md">
            {/* Logo con menú desplegable */}
            <div className="relative">
                <button
                    onClick={handleContentMenuClick}
                    className="text-4xl font-extrabold text-white hover:text-gray-200 transition-all duration-300 flex items-center gap-x-2 focus:outline-none"
                >
                    <span className="hidden sm:inline">🎥 Peliculas & Series 🎬</span>
                    <FaFilm className="sm:hidden text-white text-3xl" />
                </button>
                {isAuthenticated && contentMenuOpen && (
                    <ul className="absolute bg-zinc-800 mt-2 rounded-lg shadow-lg w-48">
                        <li>
                            <Link
                                to="/products"
                                onClick={closeMenus}
                                className="block px-4 py-2 text-white hover:bg-zinc-600 rounded-t-lg transition-all duration-300 flex items-center gap-x-2"
                            >
                                <FaFilm /> <span className="hidden sm:inline">Películas</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/series"
                                onClick={closeMenus}
                                className="block px-4 py-2 text-white hover:bg-zinc-600 rounded-b-lg transition-all duration-300 flex items-center gap-x-2"
                            >
                                <FaTv /> <span className="hidden sm:inline">Series</span>
                            </Link>
                        </li>
                    </ul>
                )}
            </div>

            {/* Menú de usuario */}
            <ul className="flex items-center gap-x-4">
                {isAuthenticated ? (
                    <>
                        <li className="relative">
                            <button
                                onClick={handleUserMenuClick}
                                className="flex items-center text-white gap-x-2 focus:outline-none"
                            >
                                <IoPerson size={28} className="text-gray-200" />
                                <span className="font-semibold text-lg hidden sm:inline">
                                    {user.username}
                                </span>
                            </button>
                            {userMenuOpen && (
                                <ul className="absolute bg-zinc-800 mt-2 rounded-lg shadow-lg w-48">
                                    <li>
                                        <Link
                                            to="/add-product"
                                            onClick={closeMenus}
                                            className="block px-4 py-2 text-white hover:bg-zinc-600 rounded-t-lg transition-all duration-300 flex items-center gap-x-2"
                                        >
                                            <FaPlus /> <span>Agregar Película</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/add-series"
                                            onClick={closeMenus}
                                            className="block px-4 py-2 text-white hover:bg-zinc-600 transition-all duration-300 flex items-center gap-x-2"
                                        >
                                            <FaPlus /> <span>Agregar Serie</span>
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => {
                                                logout();
                                                closeMenus();
                                            }}
                                            className="block w-full text-left px-4 py-2 text-white hover:bg-red-600 rounded-b-lg transition-all duration-300 flex items-center gap-x-2"
                                        >
                                            <IoLogOut /> <span>Salir</span>
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link
                                to="/login"
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-x-2 shadow-md transition duration-300"
                            >
                                <IoLogIn size={20} />
                                <span className="hidden sm:inline">Iniciar Sesión</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="/register"
                                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full text-sm font-medium flex items-center gap-x-2 shadow-md transition duration-300"
                            >
                                <IoPersonAdd size={20} />
                                <span className="hidden sm:inline">Registrarse</span>
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default Navbar;
