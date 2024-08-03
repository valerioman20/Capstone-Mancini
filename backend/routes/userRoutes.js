import express from "express";
import mongoose from "mongoose";
import User from "../models/User.js";
import Course from "../models/Course.js"; // Importa il modello Course

const router = express.Router();

// GET /users: ritorna la lista degli utenti
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /users/:id: ritorna il singolo utente
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /users: crea un nuovo utente
router.post("/", async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /users/:id: modifica l'utente con l'id associato
router.put("/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: "Utente non trovato" });
    }
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /users/:id: cancella l'utente con l'id associato
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "ID non valido" });
    }

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "Utente non trovato" });
    }

    res.json({ message: "Utente eliminato" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /users/:id/courses: ritorna i corsi creati dall'utente specificato
router.get("/:id/courses", async (req, res) => {
  try {
    const userId = req.params.id;

    // Verifica se l'ID dell'utente è un ObjectId valido
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "ID utente non valido" });
    }

    // Trova i corsi creati dall'utente specificato
    const courses = await Course.find({ autore: userId }).populate("autore", "nome cognome email");
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;

