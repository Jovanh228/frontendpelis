import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage";
import RegisterPage from "./pages/RegisterPage";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import MoviesPage from "./pages/MoviesPage";
import MoviesFormPage from "./pages/MoviesFormPage";
import SeriesPage from "./pages/SeriesPage";
import SeriesFormPage from "./pages/SeriesFormPage";
import ProtectedRoute from "./ProtectedRoute";
import { ProductsProvider } from "./context/MovieContext";
import { SeriesProvider } from "./context/SeriesContext";
import Navbar from "./components/Navbar";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <SeriesProvider>
          <BrowserRouter
            future={{
              v7_startTransition: true,
              v7_relativeSplatPath: true,
            }}
          >
            <main className="container mx-auto px-10">
              <Navbar />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/profile" element={<ProfilePage />} />
                  <Route path="/products" element={<MoviesPage />} />
                  <Route path="/add-product" element={<MoviesFormPage />} />
                  <Route path="/products/:id" element={<MoviesFormPage />} />
                  <Route path="/series" element={<SeriesPage />} />
                  <Route path="/add-series" element={<SeriesFormPage />} />
                  <Route path="/series/:id" element={<SeriesFormPage />} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </BrowserRouter>
        </SeriesProvider>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
