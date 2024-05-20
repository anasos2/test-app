import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import './i18n'; // Assurez-vous que le fichier d'internationalisation est correctement importé
import './index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Importer les fonctions nécessaires de Firebase
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import Live from './Components/Live';
import Language from './Components/Language';
import RegisterScreen from './Components/RegisterScreen';
import LoginScreen from './Components/LoginScreen';
import Pourcentage from './Components/Pourcentage';
import Perday from './Components/PerDay';
import Home from './Components/Home'
import MyComponent from './Components/MyComponent';
import Detail from './Components/Detail';


// Votre configuration Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCsNtvptPmq4ykII19uQDxaQRvDp10fPgE",
  authDomain: "cofffee-13fe9.firebaseapp.com",
  projectId: "cofffee-13fe9",
  storageBucket: "cofffee-13fe9.appspot.com",
  messagingSenderId: "909814183342",
  appId: "1:909814183342:web:910052e1edd4e6c1c5043f"
};;

const router = createBrowserRouter([ 
  {
    path: '/',
    element: <Language />,
  },
  {
    path: '/live',
    element: <Live />,
  },
 
  {
    path: '/home',
    element: <Home />,
  },
 
  {
    path: '/register',
    element: <RegisterScreen />,
  },
  {
    path: '/login',
    element: <LoginScreen />,
  },
  {
    path: '/pourcentage',
    element: <Pourcentage />,
  },
  {
    path: '/nn',
    element: <MyComponent />,
  },
  {
    path: '/detail',
    element: <Detail />,
  },
  {
    path: '/perday',
    element: <Perday />,
  },

]);

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

// Rendre votre application React
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Enregistrer le service worker
serviceWorkerRegistration.register();
