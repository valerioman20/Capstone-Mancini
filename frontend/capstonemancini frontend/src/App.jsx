import React, { useState } from 'react';
import NavigationBar from './components/Navbar.jsx';
import CourseList from './components/CourseList.jsx';
import CourseForm from './components/CourseForm.jsx';

function App() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const refreshCourses = () => {
    // Ricarica i corsi dopo l'aggiunta di un nuovo corso
  };

  return (
    <div>
      <NavigationBar handleShow={handleShow} /> {/* Passiamo handleShow alla Navbar */}
      <div className="container mt-5">
        <h1>I nostri Corsi</h1>
        <CourseList />
        <CourseForm show={show} handleClose={handleClose} refreshCourses={refreshCourses} />
      </div>
    </div>
  );
}

export default App;
