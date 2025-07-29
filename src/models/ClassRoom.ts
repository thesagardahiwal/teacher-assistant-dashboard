// src/models/Classroom.ts
import mongoose, { Schema } from 'mongoose';

const classroomSchema = new Schema({
  name: String,
  subject: String,
  teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher' },
}, { timestamps: true });

export const Classroom = mongoose.models.Classroom || mongoose.model("Classroom", classroomSchema);
