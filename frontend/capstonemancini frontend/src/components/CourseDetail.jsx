import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button, Modal, Form } from 'react-bootstrap';
import { CartContext } from './CartContext.jsx'; // Assicurati che il percorso sia corretto

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    // Effettua la richiesta API per ottenere i dettagli del corso
    axios.get(`http://localhost:5002/api/courses/${id}`)
      .then(response => {
        setCourse(response.data);
        setFormData(response.data);
      })
      .catch(error => {
        console.error('Errore nel recupero del corso:', error); // Mostra l'errore in console
        setError('Errore nel caricamento del corso o corso non trovato.');
      });
  }, [id]);

  const handleAddToCart = () => {
    if (course) {
      addToCart(course); // Aggiungi il corso al carrello
      alert('Corso aggiunto al carrello!');
    }
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5002/api/courses/${id}`)
      .then(() => {
        alert('Corso cancellato con successo!');
        navigate('/'); // Reindirizza alla lista dei corsi
      })
      .catch(error => {
        console.error('Errore nella cancellazione del corso:', error);
        alert('Errore nella cancellazione del corso.');
      });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5002/api/courses/${id}`, formData)
      .then(response => {
        setCourse(response.data);
        setShowEditModal(false);
        alert('Corso aggiornato con successo!');
      })
      .catch(error => {
        console.error('Errore nella modifica del corso:', error);
        alert('Errore nella modifica del corso.');
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Se c'è un errore, mostra il messaggio di errore
  if (error) {
    return <p>{error}</p>;
  }

  // Se il corso non è ancora stato caricato, mostra un messaggio di caricamento
  if (!course) {
    return <p>Caricamento in corso...</p>;
  }

  return (
    <Container>
      <Card>
        <Card.Img variant="top" src={course.immagine || 'https://via.placeholder.com/150'} />
        <Card.Body>
          <Card.Title>{course.titolo}</Card.Title>
          <Card.Text>{course.descrizione}</Card.Text>
          <Card.Text><strong>Prezzo:</strong> ${course.prezzo}</Card.Text>
          <Card.Text><strong>Categoria:</strong> {course.categoria}</Card.Text>
          <Card.Text><strong>Autore:</strong> {course.autore.nome} {course.autore.cognome}</Card.Text>
          <Card.Text><strong>Email dell'autore:</strong> {course.autore.email}</Card.Text>
          <Button as={Link} to="/" variant="gold" className="me-2">Torna alla lista dei corsi</Button>
          <Button variant="primary" onClick={() => setShowEditModal(true)} className="me-2">Modifica</Button>
          <Button variant="danger" onClick={handleDelete} className="me-2">Cancella</Button>
          <Button variant="success" onClick={handleAddToCart} className="ms-2">Aggiungi al Carrello</Button>
        </Card.Body>
      </Card>

      {/* Modal per la modifica del corso */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modifica Corso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditSubmit}>
            <Form.Group controlId="titolo">
              <Form.Label>Titolo</Form.Label>
              <Form.Control
                type="text"
                name="titolo"
                value={formData.titolo}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="descrizione">
              <Form.Label>Descrizione</Form.Label>
              <Form.Control
                type="text"
                name="descrizione"
                value={formData.descrizione}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="prezzo">
              <Form.Label>Prezzo</Form.Label>
              <Form.Control
                type="number"
                name="prezzo"
                value={formData.prezzo}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group controlId="categoria">
              <Form.Label>Categoria</Form.Label>
              <Form.Control
                type="text"
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Salva Modifiche
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default CourseDetail;
