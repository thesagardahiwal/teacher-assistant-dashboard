// src/models/Attendance.ts
import mongoose, { Schema } from 'mongoose';

const attendanceSchema = new Schema({
  classroomId: { type: Schema.Types.ObjectId, ref: 'Classroom' },
  date: Date,
  records: [{
    studentId: { type: Schema.Types.ObjectId, ref: 'Student' },
    present: Boolean
  }]
}, { timestamps: true });

export const Attendance = mongoose.models.Attendance || mongoose.model("Attendance", attendanceSchema);
