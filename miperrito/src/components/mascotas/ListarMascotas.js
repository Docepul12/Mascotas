import React, { useEffect, useState } from 'react';
import { Table, Container, Image, Pagination, Button } from 'react-bootstrap';
import mascotasService from '../../services/mascotasService';
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

const ListarMascotas = () => {
  const [mascotas, setMascotas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMascotas = async () => {
      try {
        const data = await mascotasService.listarMascotas();
        setMascotas(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMascotas();
  }, []);

  const { currentItems: currentMascotas, PaginationComponent } = usePagination(mascotas);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta mascota?')) {
      try {
        await mascotasService.eliminarMascota(id);
        setMascotas((prevMascotas) => prevMascotas.filter((mascota) => mascota._id !== id));
      } catch (err) {
        console.error('Error al eliminar la mascota:', err);
        setError('Error al eliminar la mascota');
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando mascotas...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <Container className="listar-mascotas-container">
      <h2>Lista de Mascotas</h2>
      {mascotas.length === 0 ? (
        <div>No hay mascotas registradas.</div>
      ) : (
        <>
          <Table striped bordered hover responsive className="mascotas-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Raza</th>
                <th>Edad</th>
                <th>Género</th>
                <th>Recomendaciones Especiales</th>
                <th>Foto</th>
                <th>Dueño</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentMascotas.map((mascota) => (
                <tr key={mascota._id}>
                  <td>{mascota.nombre}</td>
                  <td>{mascota.raza}</td>
                  <td>{mascota.edad} años</td>
                  <td>{mascota.genero === 1 ? 'Macho' : 'Hembra'}</td>
                  <td>{mascota.recomendacionesEspeciales}</td>
                  <td>
                    {mascota.foto && (
                      <Image src={process.env.REACT_APP_API_BASE+mascota.foto} alt="Foto de la mascota" thumbnail style={{ maxWidth: '100px' }} />
                    )}
                  </td>
                  <td>{mascota.dueno}</td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(mascota._id)} className="me-2" aria-label={`Eliminar mascota ${mascota.nombre}`}>
                      Eliminar
                    </Button>
                    <Link to={`/gestion-mascotas/modificar/${mascota._id}`} className="btn btn-warning">
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

export default ListarMascotas;
