// Importazione dei moduli necessari
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import userRoutes from "./routes/userRoutes.js";
import courseRoutes from "./routes/courseRoutes.js"; // Assicurati di importare le rotte dei corsi

// MIDDLEWARE Importazione dei middleware per la gestione degli errori
import { badRequestHandler, unauthorizedHandler, notFoundHandler, genericErrorHandler } from "./middlewares/errorHandlers.js";

// Carica le variabili d'ambiente dal file .env
dotenv.config();

// Controlla se la variabile d'ambiente MONGODB_URI è definita
if (!process.env.MONGODB_URI) {
  console.error("Errore: la variabile d'ambiente MONGODB_URI non è definita.");
  process.exit(1); // Termina l'applicazione con un codice di uscita non-zero
}

// Creazione dell'istanza dell'applicazione Express
const app = express();

// Applicazione dei middleware globali
app.use(cors());
app.use(express.json());

// Connessione al database MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connesso"))
  .catch((err) => {
    console.error("Errore di connessione MongoDB:", err);
    process.exit(1); // Termina l'applicazione con un codice di uscita non-zero
  });

// Definizione delle rotte principali
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes); // Aggiungi le rotte dei corsi

// Applicazione dei middleware per la gestione degli errori
app.use(badRequestHandler);
app.use(unauthorizedHandler);
app.use(notFoundHandler);
app.use(genericErrorHandler);

// Definizione della porta su cui il server ascolterà
const PORT = process.env.PORT || 3000;

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione sulla porta ${PORT}`);

  // Stampa tutte le rotte disponibili in formato tabellare
  console.log("Rotte disponibili:");
  console.table(
    listEndpoints(app).map((route) => ({
      path: route.path,
      methods: route.methods.join(", "),
    }))
  );
});
