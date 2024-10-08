// routes/courseRoutes.js

import express from "express";
import mongoose from "mongoose";
import Course from "../models/Course.js";
import User from "../models/User.js";
import multer from 'multer';
import { storage } from '../config/cloudinary.js';

const upload = multer({ storage });

const router = express.Router();

// GET /courses: ritorna la lista di tutti i corsi o filtra per ricerca
router.get("/", async (req, res) => {
  try {
    const { search } = req.query; // Ottieni il parametro di ricerca dalla query string
    console.log('Parametro di ricerca:', search); // Log per debug
    const query = {};

    // Se c'è una query di ricerca, aggiungi il filtro per il titolo o descrizione
    if (search) {
      query.$or = [
        { titolo: { $regex: search, $options: "i" } }, // Filtra per titolo
        { descrizione: { $regex: search, $options: "i" } }, // Filtra per descrizione
      ];
    }

    // Trova i corsi con il filtro (se esiste) o tutti i corsi
    const courses = await Course.find(query).populate("autore", "nome cognome email");
    console.log('Corsi trovati:', courses.length); // Log per debug
    res.json(courses);
  } catch (err) {
    console.error('Errore durante la ricerca dei corsi:', err); // Log degli errori
    res.status(500).json({ message: err.message });
  }
});

// GET /courses/:id: ritorna un singolo corso
router.get("/:id", async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("autore", "nome cognome email");
    if (!course) {
      return res.status(404).json({ message: "Corso non trovato" });
    }
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /courses: crea un nuovo corso
router.post('/', upload.single('immagine'), async (req, res) => {
  const { titolo, descrizione, prezzo, autore, categoria } = req.body;

  // Verifica se l'ID dell'autore è un ObjectId valido
  if (!mongoose.Types.ObjectId.isValid(autore)) {
    return res.status(400).json({ message: 'ID autore non valido' });
  }

  try {
    const user = await User.findById(autore);
    if (!user) {
      return res.status(404).json({ message: 'Autore non trovato' });
    }

    const immagine = req.file ? req.file.path : null;

    const course = new Course({ titolo, descrizione, prezzo, autore, categoria, immagine });
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    console.error('Errore nella creazione del corso:', err);
    res.status(400).json({ message: err.message });
  }
});

// PUT /courses/:id: modifica un corso esistente
router.put("/:id", async (req, res) => {
  const { titolo, descrizione, prezzo, categoria, immagine } = req.body;
  
  try {
    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      { titolo, descrizione, prezzo, categoria, immagine },
      { new: true }
    );
    
    if (!updatedCourse) {
      return res.status(404).json({ message: "Corso non trovato" });
    }
    
    res.json(updatedCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /courses/:id: cancella un corso
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
  
    // Verifica se l'ID è un ObjectId valido
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID non valido" });
    }
    
    const deletedCourse = await Course.findByIdAndDelete(id);
    
    if (!deletedCourse) {
      return res.status(404).json({ message: "Corso non trovato" });
    }
    
    res.json({ message: "Corso eliminato" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

