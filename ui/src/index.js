import React from "react";
import ReactDOM from "react-dom";
import App from './App';
import './index.css';
import {createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import JonnyPage from "./pages/jonnyPage";

const router =  createBrowserRouter([
    {
        path: "/",
        element: <App />
    },
    {
        path: "jonnyPage",
        element: <JonnyPage />
    },
  
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <RouterProvider router={router} />
);