import React from 'react';
import { Container, Button } from 'react-bootstrap';
import corso3 from '../assets/corso3.jpg';

function Jumbotron() {
    const jumbotronStyle = {
      backgroundImage: `url(${corso3})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white', 
      padding: '100px 50px',
      borderRadius: '10px',
      textAlign: 'center',
    }; 

  return (
    <Container style={jumbotronStyle} className="p-5 mb-4 rounded-3">
      <h1>Benvenuto alla Nostra Piattaforma di Corsi Online!</h1>
      <p>
        I nostri corsi sono accessibili ovunque, in qualsiasi momento. Ogni corso è progettato per offrirti un'esperienza
        di apprendimento pratica e coinvolgente. Con tutorial passo-passo, esercitazioni interattive e supporto costante,
        avrai tutto ciò che ti serve per raggiungere i tuoi obiettivi.
      </p>
      <p>
        <Button className="btn-gold">Learn more</Button>
      </p>
    </Container>
  );
}

export default Jumbotron;

