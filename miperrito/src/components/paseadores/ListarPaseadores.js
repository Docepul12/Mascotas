import React, { useEffect, useState } from 'react'; 
import { Table, Container, Image, Pagination, Button } from 'react-bootstrap';
import paseadoresService from '../../services/paseadoresService';
import { Link } from 'react-router-dom';
import '../../App.css';

const usePagination = (items, itemsPerPage = 3) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
        {number}
      </Pagination.Item>
    );
  }

  const PaginationComponent = () => (
    <Pagination className="justify-content-center">
      <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
      <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
      {paginationItems}
      <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
      <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
    </Pagination>
  );

  return { currentItems, PaginationComponent, currentPage, totalPages, paginate };
};

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

  const { currentItems: currentPaseadores, PaginationComponent } = usePagination(paseadores);

  const handleDelete = async (id) => {
    try {
      await paseadoresService.eliminarPaseador(id);
      setPaseadores((prevPaseadores) => prevPaseadores.filter((paseador) => paseador._id !== id));
    } catch (err) {
      console.error('Error al eliminar el paseador:', err);
      setError('Error al eliminar el paseador');
    }
  };

  if (loading) {
    return <div className="loading">Cargando paseadores...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <Container className="listar-paseadores-container">
      <h2>Lista de Paseadores</h2>
      {paseadores.length === 0 ? (
        <div>No hay paseadores registrados.</div>
      ) : (
        <>
          <Table striped bordered hover responsive className="paseadores-table">
            <thead>
              <tr>
                <th>Nombres y Apellidos</th>
                <th>Tipo de Identificación</th>
                <th>Número de Identificación</th>
                <th>Teléfono de Contacto</th>
                <th>Correo Electrónico</th>
                <th>Teléfono de Contacto de la Empresa</th>
                <th>Dirección de la Empresa</th>
                <th>Dirección del Paseador</th>
                <th>Foto</th>
                <th>Tarifa por Hora</th>
                <th>Calificación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentPaseadores.map((paseador) => (
                <tr key={paseador._id}>
                  <td>{paseador.nombre}</td>
                  <td>{paseador.tipoIdentificacion}</td>
                  <td>{paseador.identificacion}</td>
                  <td>{paseador.telefono}</td>
                  <td>{paseador.email}</td>
                  <td>{paseador.telefonoEmpresa}</td>
                  <td>{paseador.direccionEmpresa}</td>
                  <td>{paseador.direccionPaseador}</td>
                  <td>
                    {paseador.foto && (
                      <Image src={process.env.REACT_APP_API_BASE+paseador.foto} alt="Foto del Paseador" thumbnail style={{ maxWidth: '100px' }} />
                    )}
                  </td>
                  <td>{paseador.tarifa}</td>
                  <td>{paseador.calificacion}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(paseador._id)} className="me-2">
                      Eliminar
                    </Button>
                    
                    <Link to={`/gestion-paseadores/modificar/${paseador._id}`} className="btn btn-warning">
                      Modificar
                    </Link>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <PaginationComponent />
        </>
      )}
    </Container>
  );
};

export default ListarPaseadores;
