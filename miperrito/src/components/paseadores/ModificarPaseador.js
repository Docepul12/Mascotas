import React, { useState, useEffect } from 'react';
import { Button, Form, FormGroup } from 'react-bootstrap';
import paseadoresService from '../../services/paseadoresService';
import '../../App.css';

const ModificarPaseador = ({ match }) => {
  const [nompas, setNompas] = useState('');
  const [tipide, setTipide] = useState('CC');
  const [numide, setNumide] = useState('');
  const [numcelpas, setNumcelpas] = useState('');
  const [email, setEmail] = useState('');
  const [numcelemp, setNumcelemp] = useState('');
  const [diremp, setDiremp] = useState('');
  const [dirpas, setDirpas] = useState('');
  const [imgpas, setImgpas] = useState(null);
  const [tarifa, setTarifa] = useState('');
  const [calpas, setCalpas] = useState(1);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const paseadorId = match.params.id;

  useEffect(() => {
    const fetchPaseador = async () => {
      try {
        const paseador = await paseadoresService.obtenerPaseadorPorId(paseadorId);
        setNompas(paseador.nompas);
        setTipide(paseador.tipide);
        setNumide(paseador.numide);
        setNumcelpas(paseador.numcelpas);
        setEmail(paseador.email);
        setNumcelemp(paseador.numcelemp);
        setDiremp(paseador.diremp);
        setDirpas(paseador.dirpas);
        setTarifa(paseador.tarifa);
        setCalpas(paseador.calpas);
        setPreviewImage(paseador.imgpas);
      } catch (error) {
        console.error('Error al obtener los datos del paseador:', error);
        alert('Error al cargar los datos del paseador.');
      }
    };

    fetchPaseador();
  }, [paseadorId]);

  const isValidEmail = (email) => /\S+@\S+\.\S+/.test(email);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImgpas(file);
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
      nompas,
      tipide,
      numide,
      numcelpas,
      email,
      numcelemp,
      diremp,
      dirpas,
      imgpas,
      tarifa,
      calpas,
    };

    try {
      await paseadoresService.modificarPaseador(paseadorId, paseadorData);
      alert('Paseador actualizado exitosamente.');
    } catch (error) {
      console.error('Error al actualizar el paseador:', error);
      alert('Error al actualizar el paseador.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modificar-paseador-container">
      <h2>Modificar Paseador</h2>
      <Form onSubmit={handleSubmit}>
        <FormGroup className="mb-3" controlId="nompas">
          <Form.Label>Nombres y Apellidos:</Form.Label>
          <Form.Control
            type="text"
            value={nompas}
            onChange={(e) => setNompas(e.target.value.toUpperCase())}
            required
            maxLength="100"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="tipide">
          <Form.Label>Tipo de Identificación:</Form.Label>
          <Form.Control
            as="select"
            value={tipide}
            onChange={(e) => setTipide(e.target.value)}
            required
          >
            <option value="CC">CC</option>
            <option value="TI">TI</option>
            <option value="CE">CE</option>
          </Form.Control>
        </FormGroup>

        <FormGroup className="mb-3" controlId="numide">
          <Form.Label>Número de Identificación:</Form.Label>
          <Form.Control
            type="text"
            value={numide}
            onChange={(e) => setNumide(e.target.value)}
            required
            maxLength="20"
            disabled
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="numcelpas">
          <Form.Label>Teléfono de Contacto del Paseador:</Form.Label>
          <Form.Control
            type="text"
            value={numcelpas}
            onChange={(e) => setNumcelpas(e.target.value)}
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

        <FormGroup className="mb-3" controlId="numcelemp">
          <Form.Label>Teléfono de Contacto de la Empresa:</Form.Label>
          <Form.Control
            type="text"
            value={numcelemp}
            onChange={(e) => setNumcelemp(e.target.value)}
            required
            maxLength="50"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="diremp">
          <Form.Label>Dirección de la Empresa:</Form.Label>
          <Form.Control
            type="text"
            value={diremp}
            onChange={(e) => setDiremp(e.target.value)}
            required
            maxLength="100"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="dirpas">
          <Form.Label>Dirección del Paseador:</Form.Label>
          <Form.Control
            type="text"
            value={dirpas}
            onChange={(e) => setDirpas(e.target.value)}
            required
            maxLength="100"
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="imgpas">
          <Form.Label>Foto del Paseador:</Form.Label>
          <Form.Control
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleImageChange}
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
          />
        </FormGroup>

        <FormGroup className="mb-3" controlId="calpas">
          <Form.Label>Calificación del Paseador (1-10):</Form.Label>
          <Form.Control
            type="number"
            value={calpas}
            onChange={(e) => setCalpas(e.target.value)}
            required
            min="1"
            max="10"
          />
        </FormGroup>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Actualizando...' : 'Actualizar Paseador'}
        </Button>
      </Form>
    </div>
  );
};

export default ModificarPaseador;
