import React, { useEffect, useState } from 'react';
import paseadoresService from '../../services/paseadoresService';
import '../../App.css';

const ListarPaseadores = () => {
  const [paseadores, setPaseadores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaseadores = async () => {
      try {
        const data = await paseadoresService.listarPaseadores();
        setPaseadores(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaseadores();
  }, []);

  if (loading) {
    return <div className="loading">Cargando paseadores...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="listar-paseadores-container">
      <h2>Lista de Paseadores</h2>
      {paseadores.length === 0 ? (
        <div>No hay paseadores registrados.</div>
      ) : (
        <table className="paseadores-table">
          <thead>
            <tr>
              <th>Nombres y Apellidos</th>
              <th>Tipo de Identificación</th>
              <th>Número de Identificación</th>
              <th>Teléfono de Contacto</th>
              <th>Correo Electrónico</th>
              <th>Tarifa por Hora</th>
              <th>Calificación</th>
            </tr>
          </thead>
          <tbody>
            {paseadores.map((paseador) => (
              <tr key={paseador.numide}>
                <td>{paseador.nompas}</td>
                <td>{paseador.tipide}</td>
                <td>{paseador.numide}</td>
                <td>{paseador.numcelpas}</td>
                <td>{paseador.email}</td>
                <td>{paseador.tarifa}</td>
                <td>{paseador.calpas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ListarPaseadores;
