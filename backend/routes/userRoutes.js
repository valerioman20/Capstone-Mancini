import express from "express";
import User from "../models/User.js";
import mongoose from "mongoose"; 

const router = express.Router();

// GET /users: ritorna la lista degli utenti
router.get("/", async (req, res) => {
    try {
      // Recupera tutti gli utenti dal database
      const users = await User.find();
      // Invia la lista degli utenti come risposta JSON
      res.json(users);
    } catch (err) {
      // In caso di errore, invia una risposta di errore
      res.status(500).json({ message: err.message });
    }
  });
  
  // GET /users/123: ritorna il singolo utente
  router.get("/:id", async (req, res) => {
    try {
      // Cerca un utente specifico per ID
      const user = await User.findById(req.params.id);
      if (!user) {
        // Se l'utente non viene trovato, invia una risposta 404
        return res.status(404).json({ message: "Utente non trovato" });
      }
      // Invia l'utente trovato come risposta JSON
      res.json(user);
    } catch (err) {
      // In caso di errore, invia una risposta di errore
      res.status(500).json({ message: err.message });
    }
  });
  
  // POST /users: crea un nuovo utente
  router.post("/", async (req, res) => {
    // Crea una nuova istanza di User con i dati dalla richiesta
    const user = new User(req.body);
    try {
      // Salva il nuovo utente nel database
      const newUser = await user.save();
      // Invia il nuovo utente creato come risposta JSON con status 201 (Created)
      res.status(201).json(newUser);
    } catch (err) {
      // In caso di errore (es. validazione fallita), invia una risposta di errore
      res.status(400).json({ message: err.message });
    }
  });
  
  // PUT /users/123: modifica l'utente con l'id associato
  router.put("/:id", async (req, res) => {
    try {
      // Trova e aggiorna l'utente nel database
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
      );
      if (!updatedUser) {
        // Se l'utente non viene trovato, invia una risposta 404
        return res.status(404).json({ message: "Utente non trovato" });
      }
      // Invia l'utente aggiornato come risposta JSON
      res.json(updatedUser);
    } catch (err) {
      // In caso di errore, invia una risposta di errore
      res.status(400).json({ message: err.message });
    }
  });
  
// DELETE /users/:id: cancella l'utente con l'id associato
router.delete("/:id", async (req, res) => {
    try {
      const { id } = req.params;
  
      // Verifica se l'ID è un ObjectId valido
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "ID non valido" });
      }
  
      // Trova e elimina l'utente dal database
      const deletedUser = await User.findByIdAndDelete(id);
      if (!deletedUser) {
        // Se l'utente non viene trovato, invia una risposta 404
        return res.status(404).json({ message: "Utente non trovato" });
      }
  
      // Invia un messaggio di conferma come risposta JSON
      res.json({ message: "Utente eliminato" });
    } catch (err) {
      // In caso di errore, invia una risposta di errore
      res.status(500).json({ message: err.message });
    }
  });
  
  export default router;
