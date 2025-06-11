import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navigation from './components/Navigation';
import ContactList from './components/ContactList';
import ContactForm from './components/ContactForm';
import ContactDetails from './components/ContactDetails';

// Importar estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ContactList />} />
            <Route path="/create" element={<ContactForm />} />
            <Route path="/edit/:id" element={<ContactForm isEdit={true} />} />
            <Route path="/contact/:id" element={<ContactDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <ToastContainer 
          position="top-right" 
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </Router>
  );
}

// Componente 404
const NotFound = () => (
  <div className="container text-center mt-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <i className="fas fa-exclamation-triangle fa-5x text-warning mb-4"></i>
        <h1 className="display-4">404</h1>
        <h4 className="mb-4">Página no encontrada</h4>
        <p className="text-muted mb-4">
          La página que buscas no existe o ha sido movida.
        </p>
        <a href="/" className="btn btn-primary">
          <i className="fas fa-home me-1"></i>
          Volver al Inicio
        </a>
      </div>
    </div>
  </div>
);

// Componente Footer
const Footer = () => (
  <footer className="bg-dark text-light py-4 mt-5">
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h5>
            <i className="fas fa-address-book me-2"></i>
            AtenciónTotal
          </h5>
          <p className="mb-0">Sistema de Gestión de Contactos</p>
        </div>
        <div className="col-md-6 text-md-end">
          <p className="mb-0">
            © 2024 AtenciónTotal. Todos los derechos reservados.
          </p>
          <small className="text-muted">
            Desarrollado con React + Node.js + MongoDB
          </small>
        </div>
      </div>
    </div>
  </footer>
);

export default App;
