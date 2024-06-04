// src/store.js

import { createStore } from 'redux';
import rootReducer from './reducers'; // Importez votre rootReducer

const store = createStore(rootReducer); // Créez le store en utilisant votre rootReducer

export default store;
