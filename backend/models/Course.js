// models/Course.js

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  titolo: { type: String, required: true },
  descrizione: { type: String, required: true },
  prezzo: { type: Number, required: true, min: 0 },
  autore: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // riferimento a User
  dataCreazione: { type: Date, default: Date.now },
  categoria: { type: String, required: true },
  immagine: { type: String }, // URL dell'immagine del corso
}, {
  timestamps: true,
  collection: "courses"
});

export default mongoose.model("Course", courseSchema);
