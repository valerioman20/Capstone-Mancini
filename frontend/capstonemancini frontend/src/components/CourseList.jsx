import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';

function CourseList() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5002/api/courses')
      .then(response => {
        console.log('Corsi ricevuti:', response.data);
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
              <Card.Img variant="top" src={course.immagine || 'https://via.placeholder.com/150'} />
              <Card.Body>
                <Card.Title>{course.titolo}</Card.Title>
                <Card.Text>{course.descrizione}</Card.Text>
                <Card.Text><strong>Prezzo:</strong> ${course.prezzo}</Card.Text>
                <Button variant="primary">Modifica</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
  
}

export default CourseList;
