import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavigationBar from './components/Navbar.jsx';
import CourseList from './components/CourseList.jsx';
import CourseForm from './components/CourseForm.jsx';
import CourseDetail from './components/CourseDetail.jsx'; // Importa il nuovo componente di dettaglio
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from './components/Jumbotron.jsx';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Router>
      <div>
        <NavigationBar handleShow={handleShow} />
        <div className="container mt-5">
          <Jumbotron />
          <Routes>
            <Route path="/" element={<CourseList />} />
            <Route path="/courses/:id" element={<CourseDetail />} /> {/* Rotta per il dettaglio del corso */}
          </Routes>
          <CourseForm show={show} handleClose={handleClose} />
        </div>
      </div>
    </Router>
  );
}

export default App;
