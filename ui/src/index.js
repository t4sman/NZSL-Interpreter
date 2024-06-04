import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import './index.css';
import {createBrowserRouter, RouterProvider, Route } from 'react-router-dom';
import JonnyPage from "./pages/jonnyPage";
import TasmansPage from "./pages/tas";
import TunsPage from './pages/tun';
import HowToPage from './pages/HowToPage';
//import GuideButton from './components/GuideButton';

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
        path: "howto",
        element: <HowToPage />
    }
  
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( 
    <RouterProvider router={router} />
);