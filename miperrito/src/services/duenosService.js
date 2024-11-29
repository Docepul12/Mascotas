import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api/duenos';

// Función auxiliar para manejar los errores
const handleAxiosError = (error) => {
  console.error('Error de Axios:', error);
  throw new Error(error.response?.data?.message || 'Ocurrió un error inesperado');
};

// Función auxiliar para crear FormData, excluyendo valores null o undefined
const createFormData = (data) => {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    if (data[key] !== null && data[key] !== undefined) {
      formData.append(key, data[key]);
    }
  });
  return formData;
};

const duenosService = {
  crearDueno: async (duenoData) => {
    try {
      console.log('FormData1', duenoData);
      const formData = createFormData(duenoData);
      console.log('FormData:', formData);
      console.table(Array.from(formData.entries()));
      const response = await axios.post(`${API_URL}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Dueño creado exitosamente:', response.data);
      return response.data;
    } catch (error) {
      // Depurar el error
      console.error('Error al enviar el formulario:', error);

      if (error.response) {
        // Respuesta del servidor con error
        console.error('Datos del error (error.response):', error.response.data);
        console.error('Código de estado:', error.response.status);
        console.error('Encabezados:', error.response.headers);
      } else if (error.request) {
        // No se recibió respuesta del servidor
        console.error('Solicitud realizada, sin respuesta (error.request):', error.request);
      } else {
        // Otro tipo de error
        console.error('Error desconocido:', error.message);
      }

      // Propagar el error o manejarlo
      handleAxiosError(error);
    }
  },

  listarDuenos: async () => {
    try {
      const response = await axios.get(`${API_URL}/`);
      console.log('Dueños listados:', response.data);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  obtenerDuenoPorId: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      console.log('Dueño obtenido exitosamente:', response.data);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  modificarDueno: async (id, duenoData) => {
    try {
      let response;
      if (duenoData.hasFile) { // Verificar si hay un archivo
        const formData = createFormData(duenoData);
        response = await axios.put(`${API_URL}/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      } else {
        response = await axios.put(`${API_URL}/${id}`, duenoData);
      }
      console.log('Dueño modificado exitosamente:', response.data);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },

  eliminarDueno: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log('Dueño eliminado exitosamente:', response.data);
      return response.data;
    } catch (error) {
      handleAxiosError(error);
    }
  },
};

export default duenosService;
