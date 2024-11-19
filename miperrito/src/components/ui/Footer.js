import React from 'react';
import './Footer.css'; // Asegúrate de crear un archivo CSS para los estilos del footer

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; {new Date().getFullYear()} Gestión de Paseadores. Todos los derechos reservados.</p>
      <p>
        <a href="/privacy-policy">Política de Privacidad</a> | <a href="/terms-of-service">Términos de Servicio</a>
      </p>
    </footer>
  );
};

export default Footer;
