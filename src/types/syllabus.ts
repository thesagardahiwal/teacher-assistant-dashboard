export interface ITopic {
  title: string;
  description?: string;
  isCompleted: boolean;
  completedAt?: Date;
  proofs: string[]; // URLs of PPTs, notes, videos
  completedBy?: string; // Teacher reference
}

export interface IModule {
  title: string;
  topics: ITopic[];
}

export interface ISyllabus {
  subject: string; // Subject ID
  batch: string;   // Batch ID
  modules: IModule[];
  createdAt: Date;
  updatedAt: Date;
  getProgress: () => {
    totalTopics: number;
    completedTopics: number;
    completionRate: number;
  };
}