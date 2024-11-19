import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Puedes crear un archivo CSS para estilizar la barra de navegación

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Inicio</Link>
      </div>
      <ul className="navbar-links">
      
      <Link to="/login">Iniciar Sesión</Link>
      </ul>
    </nav>
  );
};

export default Navbar;
