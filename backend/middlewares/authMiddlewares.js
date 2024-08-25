import { verifyJWT } from '../utils/jwt.js';
import User from '../models/User.js'; // Importa il modello User

// Middleware di autenticazione
export const authMiddleware = async (req, res, next) => {
  try {
    // Estrai il token dall'header Authorization
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    // Se non c'è un token, restituisci un errore 401 (Unauthorized)
    if (!token) {
      return res.status(401).send('Token mancante');
    }

    // Verifica e decodifica il token usando la funzione verifyJWT
    const decoded = await verifyJWT(token);

    // Usa l'ID dell'utente dal token per trovare l'utente nel database
    const user = await User.findById(decoded.id).select('-password');
    
    // Se l'utente non viene trovato nel database, restituisci un errore 401
    if (!user) {
      return res.status(401).send('Utente non trovato');
    }

    // Aggiungi l'oggetto user alla richiesta
    req.user = user;

    // Passa al prossimo middleware o alla route handler
    next();
  } catch (error) {
    // Se c'è un errore durante la verifica del token o nel trovare l'utente,
    // restituisci un errore 401
    res.status(401).send('Token non valido');
  }
};
