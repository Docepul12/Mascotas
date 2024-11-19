import { Button, Form, FormGroup } from "react-bootstrap";
import { useState } from "react";
import iAX from "../../services/axiosInstance";
import { useDispatch } from "react-redux";
import { setTokenAction } from "../../reducers/authReducer";  // Cambiar importación a setTokenAction

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await iAX.post("/api/auth/login", { email, password });
      const token = response.data.token;

      // Guardar token en el estado global usando Redux
      dispatch(setTokenAction(token));  // Usar la acción correcta

      // Opción: Guardar token en LocalStorage
      localStorage.setItem('token', token);

      setErrorMessage('Login exitoso');
    } catch (error) {
      setErrorMessage('Error en el login: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>
      <Form onSubmit={handleLogin}>
        <FormGroup>
          <Form.Label>Correo Electrónico</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </FormGroup>
        <FormGroup>
          <Form.Label>Contraseña</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </FormGroup>
        <Button type="submit" variant="primary">
          Iniciar Sesión
        </Button>
      </Form>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </div>
  );
}

export default Login;

