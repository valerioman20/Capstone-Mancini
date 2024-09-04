import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar.jsx';
import CourseList from './components/CourseList.jsx';
import CourseForm from './components/CourseForm.jsx';
import CourseDetail from './components/CourseDetail.jsx';
import Cart from './components/Cart.jsx'; // Importa il componente Carrello
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from './components/Jumbotron.jsx';
import Footer from './components/Footer.jsx'; 
import './App.css'; 
import { CartProvider } from './components/CartContext.jsx'; // Assicurati di usare il percorso corretto

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <CartProvider> {/* Avvolge tutta l'app con il provider del carrello */}
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <NavigationBar handleShow={handleShow} />
          <div className="container mt-5 flex-grow-1">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Jumbotron />
                    <CourseList />
                    <CourseForm show={show} handleClose={handleClose} />
                  </>
                }
              />
              <Route
                path="/courses/:id"
                element={<CourseDetail />}
              />
              <Route
                path="/cart" // Aggiungi la rotta per il carrello
                element={<Cart />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
