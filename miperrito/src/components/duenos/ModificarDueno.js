import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

const ModificarDueno = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nombreDueno, setNombreDueno] = useState('');
  const [telefonoDueno, setTelefonoDueno] = useState('');
  const [direccionDueno, setDireccionDueno] = useState('');
  const [correoDueno, setCorreoDueno] = useState('');
  const [fotoDueno, setFotoDueno] = useState(null);
  const [mascotas, setMascotas] = useState(''); // String
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  // Definir la URL base desde las variables de entorno
  const baseURL = process.env.REACT_APP_API_BASE;

  useEffect(() => {
    if (!id) {
      console.error('El ID proporcionado es inválido.');
      return;
    }

    const fetchDueno = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/duenos/${id}`);
        const dueno = response.data;
        setNombreDueno(dueno.nombreDueno);
        setTelefonoDueno(dueno.telefonoDueno);
        setDireccionDueno(dueno.direccionDueno);
        setCorreoDueno(dueno.correoDueno);
        setMascotas(dueno.mascotas.join(', '));
        setPreviewImage(dueno.fotoDueno);
      } catch (error) {
        console.error('Error al obtener el dueño:', error);
      }
    };

    fetchDueno();
  }, [id, baseURL]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFotoDueno(file);
      setPreviewImage(file); // Actualiza con el archivo seleccionado para previsualización
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

      if (fotoDueno instanceof File) {
        formData.append('fotoDueno', fotoDueno);
      }

      if (mascotas && mascotas.trim() !== '') {
        formData.append('mascotas', mascotas);
      }

      await axios.put(`${baseURL}/api/duenos/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Dueño modificado exitosamente.');
      navigate('/gestion-duenos/listar');
    } catch (error) {
      console.error('Error al modificar el dueño:', error);
      const errorMessage = error.response?.data?.message || 'Error al modificar el dueño.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modificar-dueno-container">
      <h2>Modificar Dueño</h2>
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
          />
          {previewImage && (
            <div className="preview">
              <img src={previewImage instanceof File ? URL.createObjectURL(previewImage) : `${baseURL}/${previewImage}`} alt="Previsualización de la foto del dueño" style={{ maxWidth: '200px', marginTop: '10px' }} />
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

        <Button variant="warning" type="submit" disabled={loading}>
          {loading ? 'Modificando...' : 'Modificar Dueño'}
        </Button>
      </Form>
    </div>
  );
};

export default ModificarDueno;

