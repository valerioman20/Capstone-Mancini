import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, Button } from 'react-bootstrap';

function CourseDetail() {
  const { id } = useParams(); // Ottieni l'ID del corso dalla rotta
  const [course, setCourse] = useState(null);
  const [error, setError] = useState(null); // Stato per gestire eventuali errori

  useEffect(() => {
    // Effettua la richiesta API per ottenere i dettagli del corso
    axios.get(`http://localhost:5002/api/courses/${id}`)
      .then(response => {
        console.log('Dati corso:', response.data); // Log per vedere i dati ricevuti
        setCourse(response.data); // Salva i dati del corso nello stato
      })
      .catch(error => {
        console.error('Errore nel recupero del corso:', error); // Log dell'errore
        setError('Errore nel caricamento del corso o corso non trovato.'); // Imposta il messaggio di errore
      });
  }, [id]);

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
          {/* Accedi alle singole proprietà dell'autore */}
          <Card.Text><strong>Autore:</strong> {course.autore.nome} {course.autore.cognome}</Card.Text>
          <Card.Text><strong>Email dell'autore:</strong> {course.autore.email}</Card.Text>
          <Button as={Link} to="/" variant="gold">Torna alla lista dei corsi</Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default CourseDetail;
