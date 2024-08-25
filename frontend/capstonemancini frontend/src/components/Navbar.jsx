import React from 'react';
import { Navbar, Nav, Container, Button, Form, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import logo from '../assets/logocorso.svg'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

function NavigationBar({ handleShow }) {
  const handleSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements.search.value;
    // Logica di ricerca, ad esempio reindirizzare a una pagina con i risultati
    console.log("Ricerca per:", query);
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/"> {/* Collegamento al logo */}
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
            <Nav.Link href="#courses">Chi siamo</Nav.Link>
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
