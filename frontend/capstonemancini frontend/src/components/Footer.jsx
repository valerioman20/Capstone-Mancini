import React from 'react';

function Footer() {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-4">
      <div className="container">
        <p>© 2024 Il Tuo Nome. Tutti i diritti riservati.</p>
        <p>
          <a href="/privacy" className="text-white">Privacy Policy</a> | 
          <a href="/terms" className="text-white"> Termini di Servizio</a>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
