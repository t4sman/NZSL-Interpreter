import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import './index.css';
import {createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import JonnyPage from "./pages/jonnyPage";
import TasmansPage from "./pages/tas";
import TunsPage from './pages/tun';

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
  
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <RouterProvider router={router} />
);