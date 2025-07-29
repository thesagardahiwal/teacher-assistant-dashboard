// src/models/Teacher.ts
import mongoose, { Schema } from 'mongoose';

const teacherSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // hashed
}, { timestamps: true });

export const Teacher = mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);
