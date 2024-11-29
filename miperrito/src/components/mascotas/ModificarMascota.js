import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import mascotasService from '../../services/mascotasService';
import '../../App.css';
import { useParams, useNavigate } from 'react-router-dom';

const ModificarMascota = () => {
  const { id } = useParams();
  console.log('ID obtenido:', id); // Mostrar el ID en la consola para verificar
  const navigate = useNavigate(); // Hook para la navegación después de la modificación
  const [nombre, setNombre] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [genero, setGenero] = useState(1); // 1 para macho, 2 para hembra
  const [recomendacionesEspeciales, setRecomendacionesEspeciales] = useState('');
  const [foto, setFoto] = useState(null);
  const [dueno, setDueno] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    // Verificar si id está definido
    if (!id) {
      console.error('El ID proporcionado es inválido.');
      return;
    }

    const fetchMascota = async () => {
      try {
        const mascota = await mascotasService.obtenerMascotaPorId(id);
        if (!mascota) {
          console.error('No se encontró la mascota con el ID proporcionado.');
          return;
        }
        setNombre(mascota.nombre);
        setRaza(mascota.raza);
        setEdad(mascota.edad);
        setGenero(mascota.genero);
        setRecomendacionesEspeciales(mascota.recomendacionesEspeciales);
        setFoto(mascota.foto);
        setDueno(mascota.dueno);
        setPreviewImage(mascota.foto);
      } catch (error) {
        console.error('Error al obtener la mascota:', error);
      }
    };

    fetchMascota();
  }, [id]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const mascotaData = {
      nombre,
      raza,
      edad: Number(edad),
      genero: Number(genero),
      recomendacionesEspeciales,
      foto,
      dueno,
    };

    try {
      await mascotasService.modificarMascota(id, mascotaData);
      alert('Mascota modificada exitosamente.');
      navigate('/gestion-mascotas/listar'); // Navegar de vuelta a la lista de mascotas
    } catch (error) {
      console.error('Error al modificar la mascota:', error);
      const errorMessage = error.response?.data?.message || 'Error al modificar la mascota.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modificar-mascota-container">
      <h2>Modificar Mascota</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3" controlId="nombre">
          <Form.Label>Nombre:</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value.toUpperCase())}
            required
            maxLength="100"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="raza">
          <Form.Label>Raza:</Form.Label>
          <Form.Control
            type="text"
            value={raza}
            onChange={(e) => setRaza(e.target.value)}
            required
            maxLength="50"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="edad">
          <Form.Label>Edad:</Form.Label>
          <Form.Control
            type="number"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
            min="0"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="genero">
          <Form.Label>Género:</Form.Label>
          <Form.Control
            as="select"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          >
            <option value="1">Macho</option>
            <option value="2">Hembra</option>
          </Form.Control>
        </FormGroup>

        <FormGroup className="mb-3" controlId="recomendacionesEspeciales">
          <Form.Label>Recomendaciones Especiales:</Form.Label>
          <Form.Control
            type="text"
            value={recomendacionesEspeciales}
            onChange={(e) => setRecomendacionesEspeciales(e.target.value)}
            required
            maxLength="250"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="foto">
          <Form.Label>Foto de la Mascota:</Form.Label>
          <Form.Control
            type="file"
            name="foto"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
          />
          {previewImage && (
            <div className="preview">
              <img src={previewImage} alt="Previsualización de la foto de la mascota" style={{ maxWidth: '200px', marginTop: '10px' }} />
            </div>
          )}
        </FormGroup>

        <FormGroup className="mb-3" controlId="dueno">
          <Form.Label>Dueño:</Form.Label>
          <Form.Control
            type="text"
            value={dueno}
            onChange={(e) => setDueno(e.target.value)}
            required
          />
        </FormGroup>

        <Button variant="warning" type="submit" disabled={loading}>
          {loading ? 'Modificando...' : 'Modificar Mascota'}
        </Button>
      </Form>
    </div>
  );
};

export default ModificarMascota;
