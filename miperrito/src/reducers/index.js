import { combineReducers } from 'redux';
import authReducer from './authReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  // Agregar aquí otros reducers si los hay
});

export default rootReducer;


