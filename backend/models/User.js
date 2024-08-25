import mongoose from "mongoose";
import bcrypt from  "bcrypt" ;

const userSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  cognome: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dataDiNascita: { type: String, required: true },
  avatar: { type: String }, 
  password: { type: String, required: true }, // NEW! Campo per la password (sarà hashata)
}, {
}, {
  timestamps: true,
  collection: "users"
});

// NEW! Metodo per confrontare le password
// Questo metodo viene aggiunto a ogni documento 'author'
userSchema.methods.comparePassword = function(candidatePassword) {
  // Usa bcrypt per confrontare la password fornita con quella hashata nel database
  return bcrypt.compare(candidatePassword, this.password);
};

// NEW! Middleware per l'hashing delle password prima del salvataggio
userSchema.pre('save', async function(next) {
  // Esegui l'hashing solo se la password è stata modificata (o è nuova)
  // Questo previene l'hashing multiplo della stessa password
  if (!this.isModified('password')) return next();

  try {
    // Genera un salt (un valore casuale per rendere l'hash più sicuro)
    const salt = await bcrypt.genSalt(10);
    // Crea l'hash della password usando il salt
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error); // Passa eventuali errori al middleware successivo
  }
});

export default mongoose.model("User", userSchema);