// Tipos globais para o projeto Quantum Learning

export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
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

export interface Lesson {
  id: string;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // em minutos
  isCompleted: boolean;
  isLocked: boolean;
  pointsReward: number;
  order: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  language: 'en' | 'es';
  lessons: Lesson[];
  totalLessons: number;
  completedLessons: number;
  progress: number; // 0-100
}

export interface Challenge {
  id: string;
  type: 'multiple-choice' | 'fill-blank' | 'translation' | 'enging';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  points: number;
}

export interface UserStats {
  totalPoints: number;
  currentStreak: number;
  longestStreak: number;
  lessonsCompleted: number;
  timeSpent: number; // em minutos
  accuracy: number; // 0-100
}

export interface Notification {
  id: string;
  type: 'success' | 'warning' | 'error' | 'info';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: Date;
}

// Tipos para gamificação
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  unlockedAt?: Date;
  requirements: {
    type: 'streak' | 'lessons' | 'points' | 'accuracy';
    value: number;
  }[];
}

export interface LeaderboardEntry {
  userId: string;
  username: string;
  avatar?: string;
  points: number;
  rank: number;
  streak: number;
}

// Tipos para configurações
export interface AppSettings {
  theme: 'light' | 'dark' | 'auto';
  language: 'pt-BR' | 'en-US' | 'es-ES';
  notifications: boolean;
  sound: boolean;
  accessibility: {
    highContrast: boolean;
    fontSize: 'small' | 'medium' | 'large';
    reducedMotion: boolean;
  };
}

// Tipos para API responses
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Tipos para validação
export interface ValidationError {
  field: string;
  message: string;
}

// Tipos para eventos de analytics
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, unknown>;
  timestamp: Date;
  userId?: string;
} 