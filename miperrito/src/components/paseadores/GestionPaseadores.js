import React from 'react'; 
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const GestionPaseadores = () => {
  return (
    <div className="gestion-paseadores-container">
      <h2>Gestión de Paseadores</h2>
      <p>Seleccione una opción para gestionar los paseadores:</p>
      <div className="gestion-buttons">
        <Link to="/gestion-paseadores/crear">
          <Button variant="primary" className="m-2">Crear Paseador</Button>
        </Link>
        <Link to="/gestion-paseadores/listar">
          <Button variant="secondary" className="m-2">Listar Paseadores</Button>
        </Link>
        
      </div>
    </div>
  );
};

export default GestionPaseadores;
