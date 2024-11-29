import React, { useState } from 'react'; 
import { Button, Form, FormGroup } from 'react-bootstrap';
import axios from 'axios';
import '../../App.css';

const CrearDueno = () => {
  const [nombreDueno, setNombreDueno] = useState('');
  const [telefonoDueno, setTelefonoDueno] = useState('');
  const [direccionDueno, setDireccionDueno] = useState('');
  const [correoDueno, setCorreoDueno] = useState('');
  const [fotoDueno, setFotoDueno] = useState(null);
  const [mascotas, setMascotas] = useState(''); // String
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoDueno(file);
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

    try {
      const formData = new FormData();
      formData.append('nombreDueno', nombreDueno);
      formData.append('telefonoDueno', telefonoDueno);
      formData.append('direccionDueno', direccionDueno);
      formData.append('correoDueno', correoDueno);

      if (fotoDueno) {
        formData.append('fotoDueno', fotoDueno);
      }

      if (mascotas && mascotas.trim() !== '') {
        formData.append('mascotas', mascotas);
      }

      const response = await axios.post('http://localhost:3000/api/duenos/crear', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Dueño registrado exitosamente.');
      handleReset();
    } catch (error) {
      console.error('Error al registrar el dueño:', error);
      const errorMessage = error.response?.data?.message || 'Error al registrar el dueño.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setNombreDueno('');
    setTelefonoDueno('');
    setDireccionDueno('');
    setCorreoDueno('');
    setFotoDueno(null);
    setMascotas('');
    setPreviewImage(null);
  };

  return (
    <div className="crear-dueno-container">
      <h2>Registrar Dueño</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3" controlId="nombreDueno">
          <Form.Label>Nombres y Apellidos:</Form.Label>
          <Form.Control
            type="text"
            value={nombreDueno}
            onChange={(e) => setNombreDueno(e.target.value)}
            maxLength="100"
            required
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="telefonoDueno">
          <Form.Label>Teléfono:</Form.Label>
          <Form.Control
            type="text"
            value={telefonoDueno}
            onChange={(e) => setTelefonoDueno(e.target.value)}
            maxLength="15"
            required
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="direccionDueno">
          <Form.Label>Dirección:</Form.Label>
          <Form.Control
            type="text"
            value={direccionDueno}
            onChange={(e) => setDireccionDueno(e.target.value)}
            maxLength="150"
            required
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="correoDueno">
          <Form.Label>Correo Electrónico:</Form.Label>
          <Form.Control
            type="email"
            value={correoDueno}
            onChange={(e) => setCorreoDueno(e.target.value)}
            maxLength="100"
            required
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="fotoDueno">
          <Form.Label>Foto:</Form.Label>
          <Form.Control
            type="file"
            name="fotoDueno"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            required
          />
          {previewImage && (
            <div className="preview">
              <img src={previewImage} alt="Previsualización de la foto del dueño" style={{ maxWidth: '200px', marginTop: '10px' }} />
            </div>
          )}
        </FormGroup>

        <FormGroup className="mb-3" controlId="mascotas">
          <Form.Label>Mascotas (opcional):</Form.Label>
          <Form.Control
            type="text"
            value={mascotas}
            onChange={(e) => setMascotas(e.target.value)}
            placeholder="Nombre de la mascota, separadas por comas si hay varias"
          />
        </FormGroup>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar Dueño'}
        </Button>
        <Button variant="secondary" onClick={handleReset} className="ms-2">
          Restablecer
        </Button>
      </Form>
    </div>
  );
};

export default CrearDueno;
