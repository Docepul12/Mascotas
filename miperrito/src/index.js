import React from 'react';
import ReactDOM from 'react-dom/client'; // Importa desde 'react-dom/client' en lugar de 'react-dom'
import App from './App';
import { Provider } from 'react-redux'; // Importar Provider de react-redux
import store from './store'; // Importar el store creado en store.js

// Crear el root usando ReactDOM.createRoot en lugar de ReactDOM.render
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}> {/* Envolver la aplicación con Provider y pasarle el store */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

