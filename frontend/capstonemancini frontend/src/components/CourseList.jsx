import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; // Importa Link per la navigazione
import axios from 'axios';

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5002/api/courses')
      .then(response => {
        setCourses(response.data);
      })
      .catch(error => console.error('Errore nel recupero dei corsi:', error));
  }, []);

  return (
    <Container>
      <Row>
        {courses.map(course => (
          <Col md={4} key={course._id} className="mb-4">
            <Card>
              <Link to={`/courses/${course._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <Card.Img variant="top" src={course.immagine || 'https://via.placeholder.com/150'} />
                <Card.Body>
                  <Card.Title>{course.titolo}</Card.Title>
                  <Card.Text>{course.descrizione}</Card.Text>
                  <Card.Text><strong>Prezzo:</strong> ${course.prezzo}</Card.Text>
                  <Button variant="gold">Dettagli</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default CourseList;
