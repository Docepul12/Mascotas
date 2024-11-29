import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import CrearPaseador from './components/paseadores/CrearPaseador';
import ListarPaseadores from './components/paseadores/ListarPaseadores';
import GestionPaseadores from './components/paseadores/GestionPaseadores';
import ModificarPaseador from './components/paseadores/ModificarPaseador';
import CrearMascota from './components/mascotas/CrearMascota';
import ListarMascotas from './components/mascotas/ListarMascotas';
import ModificarMascota from './components/mascotas/ModificarMascota';
import EliminarMascota from './components/mascotas/EliminarMascota';
import GestionMascotas from './components/mascotas/GestionMascotas';
import GestionDuenos from './components/duenos/GestionDuenos';
import CrearDueno from './components/duenos/CrearDueno';
import ListarDuenos from './components/duenos/ListarDuenos';
import ModificarDueno from './components/duenos/ModificarDueno';
import EliminarDueno from './components/duenos/EliminarDueno';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            {/* Ruta para la página principal */}
            <Route path="/" element={<Home />} />

            {/* Gestión de Paseadores */}
            <Route path="/gestion-paseadores" element={<GestionPaseadores />} />
            <Route path="/gestion-paseadores/crear" element={<CrearPaseador />} />
            <Route path="/gestion-paseadores/listar" element={<ListarPaseadores />} />
            <Route path="/gestion-paseadores/modificar/:id" element={<ModificarPaseador />} />

            {/* Ruta para iniciar sesión */}
            <Route path="/login" element={<Login />} />

            {/* Gestión de Mascotas */}
            <Route path="/gestion-mascotas" element={<GestionMascotas />} />
            <Route path="/gestion-mascotas/crear" element={<CrearMascota />} />
            <Route path="/gestion-mascotas/listar" element={<ListarMascotas />} />
            <Route path="/gestion-mascotas/modificar/:id" element={<ModificarMascota />} />
            <Route path="/gestion-mascotas/eliminar" element={<EliminarMascota />} />

            {/* Rutas de Dueños */}
            <Route path="/gestion-duenos" element={<GestionDuenos />} />
            <Route path="/gestion-duenos/crear" element={<CrearDueno />} />
            <Route path="/gestion-duenos/listar" element={<ListarDuenos />} />
            <Route path="/gestion-duenos/modificar/:id" element={<ModificarDueno />} />
            <Route path="/gestion-duenos/eliminar" element={<EliminarDueno />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;



