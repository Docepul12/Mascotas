import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import mascotasService from '../../services/mascotasService';
import '../../App.css';

const CrearMascota = () => {
  const [mascota, setMascota] = useState({
    nombre: '',
    raza: '',
    edad: '',
    genero: 1, // 1 para macho, 2 para hembra
    recomendacionesEspeciales: '',
    foto: null,
    dueno: '',
  });
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMascota({ ...mascota, foto: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMascota({ ...mascota, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Crear un FormData para enviar todos los datos, incluyendo el archivo de imagen
    const formData = new FormData();
    Object.keys(mascota).forEach((key) => {
      formData.append(key, mascota[key]);
    });

    try {
      await mascotasService.crearMascota(formData); // Enviar FormData al backend
      alert('Mascota registrada exitosamente.');
      handleReset();
    } catch (error) {
      console.error('Error al registrar la mascota:', error);
      const errorMessage = error.response?.data?.message || 'Error al registrar la mascota.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMascota({
      nombre: '',
      raza: '',
      edad: '',
      genero: 1,
      recomendacionesEspeciales: '',
      foto: null,
      dueno: '',
    });
    setPreviewImage(null);
  };

  return (
    <div className="crear-mascota-container">
      <h2>Registrar Mascota</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3" controlId="nombre">
          <Form.Label>Nombre de la Mascota:</Form.Label>
          <Form.Control
            type="text"
            name="nombre"
            value={mascota.nombre}
            onChange={handleChange}
            maxLength="100"
            required
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="raza">
          <Form.Label>Raza:</Form.Label>
          <Form.Control
            type="text"
            name="raza"
            value={mascota.raza}
            onChange={handleChange}
            maxLength="50"
            required
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="edad">
          <Form.Label>Edad:</Form.Label>
          <Form.Control
            type="number"
            name="edad"
            value={mascota.edad}
            onChange={handleChange}
            min="0"
            required
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="genero">
          <Form.Label>Género:</Form.Label>
          <Form.Control
            as="select"
            name="genero"
            value={mascota.genero}
            onChange={handleChange}
            required
          >
            <option value="1">Macho</option>
            <option value="2">Hembra</option>
          </Form.Control>
        </FormGroup>

        <FormGroup className="mb-3" controlId="recomendacionesEspeciales">
          <Form.Label>Recomendaciones Especiales:</Form.Label>
          <Form.Control
            as="textarea"
            name="recomendacionesEspeciales"
            value={mascota.recomendacionesEspeciales}
            onChange={handleChange}
            maxLength="250"
            required
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="foto">
          <Form.Label>Foto de la Mascota:</Form.Label>
          <Form.Control
            type="file"
            name="foto"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            required
          />
          {previewImage && (
            <div className="preview">
              <img src={previewImage} alt="Previsualización de la foto de la mascota" style={{ maxWidth: '200px', marginTop: '10px' }} />
            </div>
          )}
        </FormGroup>

        <FormGroup className="mb-3" controlId="dueno">
          <Form.Label>Dueño (ID):</Form.Label>
          <Form.Control
            type="text"
            name="dueno"
            value={mascota.dueno}
            onChange={handleChange}
            required
          />
        </FormGroup>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar Mascota'}
        </Button>
        <Button variant="secondary" onClick={handleReset} className="ms-2">
          Restablecer
        </Button>
      </Form>
    </div>
  );
};

export default CrearMascota;
