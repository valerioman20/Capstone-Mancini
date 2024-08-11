import React, { useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

function CourseForm({ show, handleClose, refreshCourses }) {
  const [formData, setFormData] = useState({
    titolo: '',
    descrizione: '',
    prezzo: 0,
    autore: '',
    categoria: '',
  });

  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('titolo', formData.titolo);
    data.append('descrizione', formData.descrizione);
    data.append('prezzo', formData.prezzo);
    data.append('autore', formData.autore);
    data.append('categoria', formData.categoria);
    if (file) {
      data.append('immagine', file);
    }

    axios.post('http://localhost:5002/api/courses', data)
      .then((response) => {
        console.log('Corso creato:', response.data);
        refreshCourses();
        handleClose();
      })
      .catch((error) => {
        console.error('Errore nella creazione del corso:', error.response ? error.response.data : error.message);
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Aggiungi Nuovo Corso</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Campi del form */}
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

          <Form.Group controlId="immagine">
            <Form.Label>Immagine</Form.Label>
            <Form.Control
              type="file"
              name="immagine"
              onChange={handleFileChange}
            />
          </Form.Group>

          <Form.Group controlId="autore">
            <Form.Label>ID Autore</Form.Label>
            <Form.Control
              type="text"
              name="autore"
              value={formData.autore}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button className="btn-gold" type="submit">
            Salva Corso
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default CourseForm;
