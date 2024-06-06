import 'bootstrap/dist/css/bootstrap.css';
import React from "react";
import ReactDOM from "react-dom/client";
import App from './App';
import './index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import JonnyPage from "./pages/jonnyPage";
import TasmansPage from "./pages/tas";
import TunsPage from './pages/tun';
import HowToPage from './pages/HowToPage';
import Auth from './pages/Auth';
import AuthProvider from 'react-auth-kit';
import createStore from 'react-auth-kit/createStore';

const store = createStore({
    authName:'token',
    authType:'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === 'https:',
  });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <AuthProvider
            store={store}
        >
            <div id='content'>
            <Router>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/jonnyPage" element={<JonnyPage />} />
                    <Route path="/tasPage" element={<TasmansPage />} />
                    <Route path="/howto" element={<HowToPage />} />
                    <Route path="/auth" element={<Auth />} />
                </Routes>
            </Router>
            </div>
        </AuthProvider>
);