import React, { useContext } from 'react';
import { Navbar, Nav, Container, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logocorso.svg'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons'; // Importa l'icona del carrello
import { CartContext } from './CartContext.jsx'; // Assicurati che il percorso sia corretto

function NavigationBar({ handleShow }) {
  const { cart } = useContext(CartContext); // Usa il contesto del carrello per accedere al numero di articoli

  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.search.value;
    console.log("Ricerca per:", query);
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
