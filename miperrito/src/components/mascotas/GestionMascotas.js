import React from 'react';  
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const GestionMascotas = () => {
  return (
    <div className="gestion-mascotas-container">
      <h2>Gestión de Mascotas</h2>
      <p>Seleccione una opción para gestionar las mascotas:</p>
      <div className="gestion-buttons">
        <Link to="/gestion-mascotas/crear">
          <Button variant="primary" className="m-2">Crear Mascota</Button>
        </Link>
        <Link to="/gestion-mascotas/listar">
          <Button variant="secondary" className="m-2">Listar Mascotas</Button>
        </Link>
      </div>
    </div>
  );
};

export default GestionMascotas;
