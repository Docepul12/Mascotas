import React, { useState } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import paseadoresService from '../../services/paseadoresService';
import '../../App.css';

const CrearPaseador = () => {
  const [nombre, setNombre] = useState('');
  const [tipoIdentificacion, setTipoIdentificacion] = useState('CC');
  const [identificacion, setIdentificacion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  const [telefonoEmpresa, setTelefonoEmpresa] = useState('');
  const [direccionEmpresa, setDireccionEmpresa] = useState('');
  const [direccionPaseador, setDireccionPaseador] = useState('');
  const [foto, setFoto] = useState(null);
  const [tarifa, setTarifa] = useState('');
  const [calificacion, setCalificacion] = useState(1);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

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

    if (!isValidEmail(email)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      setLoading(false);
      return;
    }

    const paseadorData = {
      nombre,
      tipoIdentificacion,
      identificacion,
      telefono,
      email,
      telefonoEmpresa,
      direccionEmpresa,
      direccionPaseador,
      foto,
      tarifa: Number(tarifa),
      calificacion: Number(calificacion),
    };

    console.log(paseadorData);
    try {
      await paseadoresService.crearPaseador(paseadorData);
      alert('Paseador registrado exitosamente.');
      handleReset();
    } catch (error) {
      console.error('Error al registrar el paseador:', error);
      const errorMessage = error.response?.data?.message || 'Error al registrar el paseador.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setNombre('');
    setTipoIdentificacion('CC');
    setIdentificacion('');
    setTelefono('');
    setEmail('');
    setTelefonoEmpresa('');
    setDireccionEmpresa('');
    setDireccionPaseador('');
    setFoto(null);
    setTarifa('');
    setCalificacion(1);
    setPreviewImage(null);
  };

  return (
    <div className="crear-paseador-container">
      <h2>Registrar Paseador</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3" controlId="nombre">
          <Form.Label>Nombres y Apellidos:</Form.Label>
          <Form.Control
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value.toUpperCase())}
            required
            maxLength="100"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="tipoIdentificacion">
          <Form.Label>Tipo de Identificación:</Form.Label>
          <Form.Control
            as="select"
            value={tipoIdentificacion}
            onChange={(e) => setTipoIdentificacion(e.target.value)}
            required
          >
            <option value="CC">CC</option>
            <option value="TI">TI</option>
            <option value="CE">CE</option>
          </Form.Control>
        </FormGroup>

        <FormGroup className="mb-3" controlId="identificacion">
          <Form.Label>Número de Identificación:</Form.Label>
          <Form.Control
            type="text"
            value={identificacion}
            onChange={(e) => setIdentificacion(e.target.value)}
            required
            maxLength="20"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="telefono">
          <Form.Label>Teléfono de Contacto del Paseador:</Form.Label>
          <Form.Control
            type="text"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
            maxLength="20"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="email">
          <Form.Label>Correo Electrónico:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength="50"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="telefonoEmpresa">
          <Form.Label>Teléfono de Contacto de la Empresa:</Form.Label>
          <Form.Control
            type="text"
            value={telefonoEmpresa}
            onChange={(e) => setTelefonoEmpresa(e.target.value)}
            required
            maxLength="50"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="direccionEmpresa">
          <Form.Label>Dirección de la Empresa:</Form.Label>
          <Form.Control
            type="text"
            value={direccionEmpresa}
            onChange={(e) => setDireccionEmpresa(e.target.value)}
            required
            maxLength="100"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="direccionPaseador">
          <Form.Label>Dirección del Paseador:</Form.Label>
          <Form.Control
            type="text"
            value={direccionPaseador}
            onChange={(e) => setDireccionPaseador(e.target.value)}
            required
            maxLength="100"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="foto">
          <Form.Label>Foto del Paseador:</Form.Label>
          <Form.Control
            type="file"
            name="foto"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
            required
          />
          {previewImage && (
            <div className="preview">
              <img src={previewImage} alt="Previsualización de la foto del paseador" style={{ maxWidth: '200px', marginTop: '10px' }} />
            </div>
          )}
        </FormGroup>

        <FormGroup className="mb-3" controlId="tarifa">
          <Form.Label>Tarifa por Hora:</Form.Label>
          <Form.Control
            type="number"
            value={tarifa}
            onChange={(e) => setTarifa(e.target.value)}
            required
            min="0"
            step="any"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="calificacion">
          <Form.Label>Calificación del Paseador (1-10):</Form.Label>
          <Form.Control
            type="number"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
            required
            min="1"
            max="10"
          />
        </FormGroup>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Registrando...' : 'Registrar Paseador'}
        </Button>
        <Button variant="secondary" onClick={handleReset} className="ms-2">
          Restablecer
        </Button>
      </Form>
    </div>
  );
};

export default CrearPaseador;
