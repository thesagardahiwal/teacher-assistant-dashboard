export interface ITeachingDiary extends Document {
  teacher: string;
  batch: string;
  subject: string;
  lectureDate: Date;
  topicsCovered: { moduleId: string; topicId: string; title: string }[];
  notes?: string;
  proofs?: string[]; // PPT, notes, video links
  createdAt: Date;
}