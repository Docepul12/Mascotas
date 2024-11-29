import React, { useEffect, useState } from 'react'; 
import { Table, Container, Image, Pagination, Button } from 'react-bootstrap';
import duenosService from '../../services/duenosService';
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

const ListarDuenos = () => {
  const [duenos, setDuenos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDuenos = async () => {
      try {
        const data = await duenosService.listarDuenos();
        setDuenos(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDuenos();
  }, []);

  const { currentItems: currentDuenos, PaginationComponent } = usePagination(duenos);

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este dueño?')) {
      try {
        await duenosService.eliminarDueno(id);
        setDuenos((prevDuenos) => prevDuenos.filter((dueno) => dueno._id !== id));
      } catch (err) {
        console.error('Error al eliminar el dueño:', err);
        setError('Error al eliminar el dueño');
      }
    }
  };

  if (loading) {
    return <div className="loading">Cargando dueños...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <Container className="listar-duenos-container">
      <h2>Lista de Dueños</h2>
      {duenos.length === 0 ? (
        <div>No hay dueños registrados en el sistema.</div>
      ) : (
        <>
          <Table striped bordered hover responsive className="duenos-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Teléfono</th>
                <th>Dirección</th>
                <th>Correo</th>
                <th>Foto</th>
                <th>Mascotas</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {currentDuenos.map((dueno) => (
                <tr key={dueno._id}>
                  <td>{dueno.nombreDueno}</td>
                  <td>{dueno.telefonoDueno}</td>
                  <td>{dueno.direccionDueno}</td>
                  <td>{dueno.correoDueno}</td>
                  <td>
                    {dueno.fotoDueno && (
                      <Image src={process.env.REACT_APP_API_BASE + dueno.fotoDueno} alt="Foto del dueño" thumbnail style={{ maxWidth: '100px' }} />
                    )}
                  </td>
                  <td>
                    {dueno.mascotas && dueno.mascotas.length > 0 ? (
                      dueno.mascotas.map((mascota) => (
                        <div key={mascota._id}>
                          <p>{mascota.nombre} ({mascota.raza}, {mascota.edad} años)</p>
                        </div>
                      ))
                    ) : (
                      <span>Sin mascotas registradas</span>
                    )}
                  </td>
                  <td>
                    <Button variant="danger" onClick={() => handleDelete(dueno._id)} className="me-2" aria-label={`Eliminar dueño ${dueno.nombreDueno}`}>
                      Eliminar
                    </Button>
                    <Link to={`/gestion-duenos/modificar/${dueno._id}`} className="btn btn-warning">
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

export default ListarDuenos;
