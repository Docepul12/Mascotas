import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import thunk from 'redux-thunk'; // Importar thunk correctamente (sin llaves)
import { composeWithDevTools } from 'redux-devtools-extension'; // Importar composeWithDevTools correctamente

// Crear una función para configurar el store
const configureStore = () => {
  const middlewares = [thunk];
  const middlewareEnhancer = applyMiddleware(...middlewares);
  
  // Configurar DevTools sólo si está disponible
  const composedEnhancers = composeWithDevTools(middlewareEnhancer);

  const store = createStore(rootReducer, composedEnhancers);
  return store;
};

const store = configureStore();

export default store;





