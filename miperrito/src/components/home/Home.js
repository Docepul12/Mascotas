import React from 'react'; 
import '../../App.css';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Bienvenidos a MiPerrito</h1>
      <p>Tu solución integral para el cuidado de tu mascota. Aquí puedes gestionar paseadores, dueños, mascotas y paseos de manera sencilla y rápida.</p>
      <div className="home-features">
        <div className="feature">
          <h3>Gestión de Paseadores</h3>
          <p>Registra, modifica y elimina información de los paseadores de mascotas fácilmente.</p>
          <Link to="/gestion-paseadores">Gestión de Paseadores</Link>
        </div>
        <div className="feature">
          <h3>Gestión de Dueños</h3>
          <p>Mantén un registro actualizado de los dueños y gestiona su información de manera efectiva.</p>
        </div>
        <div className="feature">
          <h3>Gestión de Mascotas</h3>
          <p>Agrega, modifica y elimina información de las mascotas en el sistema.</p>
        </div>
        <div className="feature">
          <h3>Programación de Paseos</h3>
          <p>Organiza y gestiona los paseos de las mascotas, asignando paseadores y horarios según las necesidades.</p>
        </div>
      </div>
    </div>
  );
};

export default Home;

