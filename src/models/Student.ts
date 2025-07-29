// src/models/Student.ts
import mongoose, { Schema } from 'mongoose';

const studentSchema = new Schema({
  name: String,
  rollNumber: String,
  email: String,
  classroomId: { type: Schema.Types.ObjectId, ref: 'Classroom' },
}, { timestamps: true });

export const Student = mongoose.models.Student || mongoose.model("Student", studentSchema);
