import React, { useContext, useState } from 'react';
import { Navbar, Nav, Container, Button, Form, FormControl } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logocorso.svg'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from './CartContext.jsx';
import axios from 'axios';

function NavigationBar({ handleShow }) {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    
    if (searchQuery.trim() === '') {
      alert('Inserisci un termine di ricerca');
      return;
    }

    try {
      // Effettua la richiesta di ricerca al backend con il parametro search
      const response = await axios.get(`http://localhost:5002/api/courses?search=${encodeURIComponent(searchQuery)}`);
      const filteredCourses = response.data;
      navigate('/', { state: { filteredCourses } });
    } catch (error) {
      console.error('Errore nella ricerca:', error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="CourseHub Logo"
            width="50"
            height="50"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/">Chi siamo</Nav.Link>
            <Nav.Link as={Link} to="/">Registrati</Nav.Link>
            <Nav.Link as={Link} to="/">Login</Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Cerca corsi"
              className="me-2"
              aria-label="Cerca"
              name="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)} // Gestisce il cambiamento dell'input
            />
            <Button variant="outline-light" type="submit">Cerca</Button>
          </Form>
          <Button className="btn-gold ms-2" onClick={handleShow}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
          <Link to="/cart" className="ms-3 position-relative text-white">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.length}
              </span>
            )}
          </Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
