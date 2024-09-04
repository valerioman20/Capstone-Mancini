import React, { useContext } from 'react';
import { Container, ListGroup, Button, Row, Col, Image } from 'react-bootstrap';
import { CartContext } from './CartContext.jsx'; // Assicurati che il percorso sia corretto
import { Link } from 'react-router-dom';

function Cart() {
  const { cart, removeFromCart } = useContext(CartContext);

  const getTotalPrice = () => {
    return cart.reduce((total, course) => total + course.prezzo, 0).toFixed(2);
  };

  return (
    <Container className="mt-4">
      <h2>Il tuo Carrello</h2>
      {cart.length === 0 ? (
        <p>Il carrello è vuoto.</p>
      ) : (
        <>
          <ListGroup>
            {cart.map(course => (
              <ListGroup.Item key={course._id} className="d-flex justify-content-between align-items-center">
                <Row className="w-100">
                  <Col xs={3} md={2}>
                    <Image src={course.immagine || 'https://via.placeholder.com/150'} rounded fluid />
                  </Col>
                  <Col xs={6} md={8}>
                    <h5>{course.titolo}</h5>
                    <p>Prezzo: ${course.prezzo}</p>
                  </Col>
                  <Col xs={3} md={2} className="text-end">
                    <Button variant="danger" onClick={() => removeFromCart(course._id)}>Rimuovi</Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="mt-3 d-flex justify-content-between align-items-center">
            <h4>Totale: ${getTotalPrice()}</h4>
            <Button variant="success" onClick={() => alert('Procedi al checkout (funzionalità da implementare)')}>
              Procedi al Checkout
            </Button>
          </div>
        </>
      )}
      <Button as={Link} to="/" variant="gold" className="mt-3">Continua a Cercare Corsi</Button>
    </Container>
  );
}

export default Cart;
