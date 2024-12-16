import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { IoPersonAdd, IoLogIn } from "react-icons/io5";
import ReCaptcha from "react-google-recaptcha";

function RegisterPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/products");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-zinc-900 shadow-2xl rounded-lg max-w-md w-full p-8">
        {/* Título */}
        <h1 className="text-3xl font-extrabold text-center text-gray-100 mb-6">Registrar Usuario</h1>

        {/* Mensajes de error */}
        {registerErrors && registerErrors.map((error, i) => (
          <div className="bg-red-600 text-white p-2 rounded-md my-2 text-center" key={i}>
            {error}
          </div>
        ))}

        {/* Formulario */}
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Usuario */}
          <div>
            <label htmlFor="username" className="block text-gray-300 font-semibold mb-1">
              Usuario
            </label>
            <input
              type="text"
              placeholder="Nombre de usuario"
              {...register("username", { required: true, minLength: 5 })}
              className="w-full bg-zinc-800 text-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.username?.type === "required" && (
              <p className="text-red-400 text-sm mt-1">El nombre de usuario es obligatorio</p>
            )}
            {errors.username?.type === "minLength" && (
              <p className="text-red-400 text-sm mt-1">La longitud mínima es de 5 caracteres</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Correo electrónico"
              {...register("email", {
                required: true,
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Introduce un email válido",
                },
              })}
              className="w-full bg-zinc-800 text-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.email && (
              <p className="text-red-400 text-sm mt-1">{errors.email.message || "El email es obligatorio"}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-300 font-semibold mb-1">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              {...register("password", { required: true, minLength: 6 })}
              className="w-full bg-zinc-800 text-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.password?.type === "required" && (
              <p className="text-red-400 text-sm mt-1">La contraseña es obligatoria</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-400 text-sm mt-1">La contraseña debe tener al menos 6 caracteres</p>
            )}
          </div>

          {/* ReCaptcha */}
          <div className="flex justify-center mt-4">
            <ReCaptcha
              sitekey="6LfFRo4qAAAAAKxtEXJhPpBNev7q_8TycAasdEOS"
              onChange={(value) => setCaptchaValue(value)}
            />
          </div>

          {/* Botón de Registro */}
          <button
            type="submit"
            disabled={!captchaValue}
            className={`w-full py-2 rounded-full font-bold text-white shadow-md transition-all ${
              captchaValue
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <IoPersonAdd size={24} />
              Registrar
            </div>
          </button>
        </form>

        {/* Link para Iniciar Sesión */}
        <p className="text-center text-gray-300 mt-6">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-400 hover:text-blue-300 font-medium flex items-center justify-center gap-2">
            Inicia sesión <IoLogIn size={20} />
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
