// src/reducers/authReducer.js

// Tipos de acción
export const SET_MI_TOKEN = 'SET_MI_TOKEN';

// Estado inicial
const initialState = {
  token: null,
};

// Acción para establecer el token
export const setTokenAction = (token) => ({
  type: SET_MI_TOKEN,
  payload: token,
});

// Reducer de autenticación
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MI_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
