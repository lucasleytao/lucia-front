import React, { createContext, useReducer, useContext, useEffect } from 'react';

// Definindo o formato do estado inicial
const initialState = {
  token: null,
  refreshToken: null,
  first_name: null,
  ideias: [],
  progress:null
};

// Criando o contexto
const AuthContext = createContext();

// Reducer para atualizar os tokens e manipular o array ideias
function authReducer(state, action) {
  switch (action.type) {
    case 'SET_TOKENS':
      return {
        ...state,
        token: action.payload.token,
        refreshToken: action.payload.refreshToken,
        first_name: action.payload.first_name,
        progress: action.payload.progress,
      };
    case 'LOGOUT':
      return {
        ...state,
        token: null,
        refreshToken: null,
        first_name: null,
        ideias: [],
        progress:null
      };
    case 'ADD_IDEIA':
      return {
        ...state,
        ideias: [...state.ideias, action.payload]
      };
    case 'DELETE_IDEIA':
      return {
        ...state,
        ideias: state.ideias.filter((_, index) => index !== action.payload)
      };
    case 'SET_IDEIAS':
      return {
        ...state,
        ideias: action.payload
      };
    default:
      return state;
  }
}

// Função para carregar o estado inicial de sessionStorage
const loadInitialState = () => {
  const storedState = sessionStorage.getItem('authState');
  return storedState ? JSON.parse(storedState) : initialState;
};

// Componente Provider
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, loadInitialState());

  useEffect(() => {
    // Salva o estado no sessionStorage sempre que mudar
    sessionStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o contexto de autenticação
export const useAuth = () => useContext(AuthContext);
