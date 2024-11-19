import React from 'react';  
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/ui/Navbar';
import Footer from './components/ui/Footer';
import Home from './components/home/Home';
import Login from './components/auth/Login';
import CrearPaseador from './components/paseadores/CrearPaseador';
import ListarPaseadores from './components/paseadores/ListarPaseadores';
import GestionPaseadores from './components/paseadores/GestionPaseadores'; // Nuevo componente para gestión de paseadores
import ModificarPaseador from './components/paseadores/ModificarPaseador';
import EliminarPaseador from './components/paseadores/EliminarPaseador';
// import CrearMascota from './components/mascotas/CrearMascota';
// import ListarMascotas from './components/mascotas/ListarMascotas';
// import ModificarMascota from './components/mascotas/ModificarMascota';
// import EliminarMascota from './components/mascotas/EliminarMascota';
// import CrearDueño from './components/dueños/CrearDueño';
// import ListarDueños from './components/dueños/ListarDueños';
// import ModificarDueño from './components/dueños/ModificarDueño';
// import EliminarDueño from './components/dueños/EliminarDueño';
// import CrearPaseo from './components/paseos/CrearPaseo';
// import ListarPaseos from './components/paseos/ListarPaseos';
// import ModificarPaseo from './components/paseos/ModificarPaseo';
// import EliminarPaseo from './components/paseos/EliminarPaseo';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gestion-paseadores" element={<GestionPaseadores />} /> {/* Nueva ruta para gestión de paseadores */}
            <Route path="/gestion-paseadores/crear" element={<CrearPaseador />} />
            <Route path="/gestion-paseadores/listar" element={<ListarPaseadores />} />
            <Route path="/gestion-paseadores/eliminar" element={<EliminarPaseador />} />           
            <Route path="/modificar-paseador" element={<ModificarPaseador />} />
            <Route path="/eliminar-paseador" element={<EliminarPaseador />} />
             <Route path="/login" element={<Login />} />
            {/* <Route path="/crear-mascota" element={<CrearMascota />} />
            <Route path="/listar-mascotas" element={<ListarMascotas />} />
            <Route path="/modificar-mascota" element={<ModificarMascota />} />
            <Route path="/eliminar-mascota" element={<EliminarMascota />} />
            <Route path="/crear-dueño" element={<CrearDueño />} />
            <Route path="/listar-dueños" element={<ListarDueños />} />
            <Route path="/modificar-dueño" element={<ModificarDueño />} />
            <Route path="/eliminar-dueño" element={<EliminarDueño />} />
            <Route path="/crear-paseo" element={<CrearPaseo />} />
            <Route path="/listar-paseos" element={<ListarPaseos />} />
            <Route path="/modificar-paseo" element={<ModificarPaseo />} />
            <Route path="/eliminar-paseo" element={<EliminarPaseo />} /> */} 
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;


