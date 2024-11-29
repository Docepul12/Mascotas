import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const GestionDuenos = () => {
  return (
    <div className="gestion-duenos-container">
      <h2>Gestión de Dueños</h2>
      <p>Seleccione una opción para gestionar los dueños:</p>
      <div className="gestion-buttons">
        <Link to="/gestion-duenos/crear">
          <Button variant="primary" className="m-2">Crear Dueño</Button>
        </Link>
        <Link to="/gestion-duenos/listar">
          <Button variant="secondary" className="m-2">Listar Dueños</Button>
        </Link>
      </div>
    </div>
  );
};

export default GestionDuenos;
