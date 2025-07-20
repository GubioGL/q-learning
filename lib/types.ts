// Tipos essenciais para o projeto Quantum Learning

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Course {
  id: number;
  title: string;
  imageSrc: string;
  resumo: string;
  topicos: string;
}

export interface UserProgress {
  userId: string;
  currentLesson: number;
  completedLessons: number[];
  points: number;
  streak: number;
  totalLessons: number;
  lastCompletedAt?: Date;
}

export interface UserGoals {
  // Metas diárias
  dailyActivities: number;
  dailyXP: number;
  dailyXPTarget: number;
  dailyLessons: number;
  dailyLessonsTarget: number;
  dailyChallenges: number;
  dailyChallengesTarget: number;
  
  // Metas semanais
  weeklyXP: number;
  weeklyXPTarget: number;
  weeklyLessons: number;
  weeklyLessonsTarget: number;
  
  // Progresso geral
  completedActivities: number;
  totalActivities: number;
}

// Tipos para API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 