import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { IoPersonAdd, IoLogIn, IoEyeSharp, IoEyeOffSharp } from "react-icons/io5";
import ReCaptcha from "react-google-recaptcha";

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { signin, isAuthenticated, errors: loginErrors } = useAuth();
  const [passwordShown, setPasswordShown] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const navigate = useNavigate();

  const togglePasswordVisibility = () => setPasswordShown(!passwordShown);

  useEffect(() => {
    if (isAuthenticated) navigate("/products");
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit((data) => signin(data));

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <div className="bg-zinc-900 shadow-lg rounded-lg max-w-md w-full p-8">
        <h1 className="text-center text-3xl font-bold text-gray-100 mb-6">Iniciar Sesión</h1>

        {/* Mensajes de error */}
        {loginErrors && loginErrors.map((error, i) => (
          <div className="bg-red-600 text-white p-2 rounded-md my-2" key={i}>
            {error}
          </div>
        ))}

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Input Email */}
          <div>
            <label htmlFor="email" className="block text-gray-300 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              {...register("email", { required: "El email es obligatorio" })}
              placeholder="Ingresa tu email"
              className="w-full bg-zinc-800 text-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email.message}</p>}
          </div>

          {/* Input Contraseña */}
          <div>
            <label htmlFor="password" className="block text-gray-300 font-medium mb-1">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={passwordShown ? "text" : "password"}
                {...register("password", {
                  required: "La contraseña es obligatoria",
                  minLength: { value: 6, message: "Mínimo 6 caracteres" },
                })}
                placeholder="Ingresa tu contraseña"
                className="w-full bg-zinc-800 text-gray-300 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              />
              {/* Botón para alternar visibilidad de contraseña */}
              {passwordShown ? (
                <IoEyeSharp
                  size={25}
                  className="absolute top-2.5 right-3 text-gray-400 cursor-pointer hover:text-blue-400"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <IoEyeOffSharp
                  size={25}
                  className="absolute top-2.5 right-3 text-gray-400 cursor-pointer hover:text-blue-400"
                  onClick={togglePasswordVisibility}
                />
              )}
            </div>
            {errors.password && <p className="text-red-400 text-sm">{errors.password.message}</p>}
          </div>

          {/* ReCaptcha */}
          <div className="flex justify-center mt-4">
            <ReCaptcha
              sitekey="6LfmMpoqAAAAALziyKFVqquerlwE9VXboFIAU_ZL"
              onChange={(value) => setCaptchaValue(value)}
            />
          </div>

          {/* Botón de Login */}
          <button
            type="submit"
            disabled={!captchaValue}
            className={`w-full py-2 rounded-full font-semibold text-white shadow-md transition-all ${
              captchaValue
                ? "bg-blue-600 hover:bg-blue-700"
                : "bg-gray-500 cursor-not-allowed"
            }`}
          >
            <IoLogIn size={20} className="inline-block mr-2" />
            Iniciar Sesión
          </button>
        </form>

        {/* Registro */}
        <p className="text-center text-gray-300 mt-6">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-400 hover:text-blue-300 font-medium flex justify-center items-center gap-x-1">
            Crea una <IoPersonAdd size={20} />
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
