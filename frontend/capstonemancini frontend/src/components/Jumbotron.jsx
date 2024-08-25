import React from 'react';
import { Container, Button } from 'react-bootstrap';
import coperta6 from '../assets/coperta6.png';

function Jumbotron() {
    const jumbotronStyle = {
      backgroundImage: `url(${coperta6})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white', 
      padding: '100px 50px',
      borderRadius: '10px',
      textAlign: 'center',
      
    }; 

  return (
    <Container style={jumbotronStyle} className="p-5 mb-4 rounded-3">
      <h1>Realizza la tua vita.</h1>
      <p>

      </p>
      <p>
        <Button className="btn-gold">Learn more</Button>
      </p>
    </Container>
  );
}

export default Jumbotron;

