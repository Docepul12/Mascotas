// src/components/paseadores/EliminarPaseador.js
import React, { useState, useEffect } from 'react';
import { Button, Modal, ListGroup } from 'react-bootstrap';
import paseadoresService from '../../services/paseadoresService';

const EliminarPaseador = () => {
  const [paseadores, setPaseadores] = useState([]);
  const [selectedPaseador, setSelectedPaseador] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    // Cargar la lista de paseadores
    const fetchPaseadores = async () => {
      try {
        const response = await paseadoresService.listarPaseadores();
        setPaseadores(response);
      } catch (error) {
        console.error('Error al cargar los paseadores:', error);
      }
    };
    fetchPaseadores();
  }, []);

  const handleEliminarClick = (paseador) => {
    setSelectedPaseador(paseador);
    setShowConfirm(true);
  };

  const handleConfirmEliminar = async () => {
    setLoading(true);
    setErrorMessage('');

    try {
      // Verificar si el paseador tiene turnos asignados antes de eliminar
      if (selectedPaseador.turnosAsignados) {
        setErrorMessage('No se puede eliminar al paseador, tiene turnos asignados.');
        setLoading(false);
        setShowConfirm(false);
        return;
      }

      // Llamar al servicio para eliminar al paseador
      await paseadoresService.eliminarPaseador(selectedPaseador.id);
      alert('Paseador eliminado exitosamente.');
      setPaseadores(paseadores.filter(p => p.id !== selectedPaseador.id));
    } catch (error) {
      console.error('Error al eliminar el paseador:', error);
      setErrorMessage('Error al eliminar el paseador.');
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="eliminar-paseador-container">
      <h2>Eliminar Paseador</h2>
      {errorMessage && <p className="text-danger">{errorMessage}</p>}
      <ListGroup>
        {paseadores.length === 0 ? (
          <p>No hay paseadores registrados.</p>
        ) : (
          paseadores.map((paseador) => (
            <ListGroup.Item key={paseador.id}>
              {paseador.nompas}
              <Button
                variant="danger"
                className="float-end"
                onClick={() => handleEliminarClick(paseador)}
              >
                Eliminar
              </Button>
            </ListGroup.Item>
          ))
        )}
      </ListGroup>

      {/* Modal de confirmación */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar al paseador {selectedPaseador?.nompas}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmEliminar} disabled={loading}>
            {loading ? 'Eliminando...' : 'Eliminar'}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EliminarPaseador;
