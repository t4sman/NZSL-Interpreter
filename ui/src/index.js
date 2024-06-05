import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import './index.css';
import {createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import JonnyPage from "./pages/jonnyPage";
import TasmansPage from "./pages/tas";
import TunsPage from './pages/tun';
import LoginSignupPage from './pages/loginSignup';
import HowToPage from './pages/HowToPage';

const router =  createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "jonnyPage",
        element: <JonnyPage />
    },
    {
        path: "tasPage",
        element: <TasmansPage />
    },
    {
        path: "tunPage",
        element: <TunsPage />
    },
    {
        path: "loginSignup",
        element: <LoginSignupPage />
    },
    {
        path: "howto",
        element: <HowToPage />
    }
  
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <RouterProvider router={router} />
);