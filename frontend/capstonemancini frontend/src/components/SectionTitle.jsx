import React from 'react';
import { Container } from 'react-bootstrap';

function SectionTitle({ text }) {
  return (
    <Container>
      <h1 style={{ textAlign: 'center', margin: '50px 0' }}>{text}</h1>
    </Container>
  );
}

export default SectionTitle;
