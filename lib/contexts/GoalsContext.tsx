"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { UserGoals } from '@/lib/types';
import { useUser } from '@clerk/nextjs';

interface GoalsContextType {
  userGoals: UserGoals;
  updateUserGoals: (newGoals: Partial<UserGoals>) => Promise<void>;
  isLoadingGoals: boolean;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const useGoals = () => {
  const context = useContext(GoalsContext);
  if (context === undefined) {
    throw new Error('useGoals must be usado dentro de um GoalsProvider');
  }
  return context;
};

interface GoalsProviderProps {
  children: ReactNode;
}

const DEFAULT_GOALS: UserGoals = {
  dailyActivities: 3,
  dailyXP: 0,
  dailyXPTarget: 30,
  dailyLessons: 0,
  dailyLessonsTarget: 3,
  dailyChallenges: 0,
  dailyChallengesTarget: 1,
  weeklyXP: 0,
  weeklyXPTarget: 210,
  weeklyLessons: 0,
  weeklyLessonsTarget: 21,
  completedActivities: 0,
  totalActivities: 0
};

export const GoalsProvider: React.FC<GoalsProviderProps> = ({ children }) => {
  const { user, isLoaded } = useUser();
  const [userGoals, setUserGoals] = useState<UserGoals>(DEFAULT_GOALS);
  const [isLoadingGoals, setIsLoadingGoals] = useState(true);

  // Buscar metas do banco ao carregar ou trocar de usuário
  useEffect(() => {
    const fetchGoals = async () => {
      if (!user?.id) {
        setUserGoals(DEFAULT_GOALS);
        setIsLoadingGoals(false);
        return;
      }
      setIsLoadingGoals(true);
      try {
        const res = await fetch(`/api/user-profile?userId=${user.id}`);
        const data = await res.json();
        if (data.success && data.data) {
          setUserGoals({
            dailyActivities: data.data.dailyActivities ?? 3,
            dailyXP: data.data.dailyXP ?? 0,
            dailyXPTarget: data.data.dailyXPTarget ?? 30,
            dailyLessons: data.data.dailyLessons ?? 0,
            dailyLessonsTarget: data.data.dailyLessonsTarget ?? 3,
            dailyChallenges: data.data.dailyChallenges ?? 0,
            dailyChallengesTarget: data.data.dailyChallengesTarget ?? 1,
            weeklyXP: data.data.weeklyXP ?? 0,
            weeklyXPTarget: data.data.weeklyXPTarget ?? 210,
            weeklyLessons: data.data.weeklyLessons ?? 0,
            weeklyLessonsTarget: data.data.weeklyLessonsTarget ?? 21,
            completedActivities: data.data.completedLessons ?? 0,
            totalActivities: data.data.totalLessons ?? 0,
            streak: data.data.streak ?? 0,
            tokens: data.data.tokens ?? 0,
            energy: data.data.energy ?? 0
          });
        } else {
          // Se não existe, criar perfil
          await fetch('/api/user-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId: user.id, userName: user.fullName || 'User' })
          });
          setUserGoals(DEFAULT_GOALS);
        }
      } catch {
        setUserGoals(DEFAULT_GOALS);
      } finally {
        setIsLoadingGoals(false);
      }
    };
    if (isLoaded) fetchGoals();
  }, [user?.id, isLoaded]);

  // Atualizar metas no banco de dados
  const updateUserGoals = async (newGoals: Partial<UserGoals>) => {
    if (!user?.id) return;
    setUserGoals(prev => ({ ...prev, ...newGoals }));
    // Tenta atualizar, se der erro de não encontrado, cria e depois atualiza
    const res = await fetch('/api/user-profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: user.id,
        userData: {
          dailyActivities: newGoals.dailyActivities,
          dailyXP: newGoals.dailyXP,
          dailyXPTarget: newGoals.dailyXPTarget,
          dailyLessons: newGoals.dailyLessons,
          dailyLessonsTarget: newGoals.dailyLessonsTarget,
          weeklyXP: newGoals.weeklyXP,
          weeklyXPTarget: newGoals.weeklyXPTarget,
          weeklyLessons: newGoals.weeklyLessons,
          weeklyLessonsTarget: newGoals.weeklyLessonsTarget,
          completedLessons: newGoals.completedActivities,
          totalLessons: newGoals.totalActivities
        }
      })
    });
    if (res.status === 400 || res.status === 404) {
      // Cria perfil e tenta atualizar de novo
      await fetch('/api/user-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user.id, userName: user.fullName || 'User' })
      });
      // Tenta atualizar novamente
      await fetch('/api/user-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          userData: {
            dailyActivities: newGoals.dailyActivities,
            dailyXP: newGoals.dailyXP,
            dailyXPTarget: newGoals.dailyXPTarget,
            dailyLessons: newGoals.dailyLessons,
            dailyLessonsTarget: newGoals.dailyLessonsTarget,
            weeklyXP: newGoals.weeklyXP,
            weeklyXPTarget: newGoals.weeklyXPTarget,
            weeklyLessons: newGoals.weeklyLessons,
            weeklyLessonsTarget: newGoals.weeklyLessonsTarget,
            completedLessons: newGoals.completedActivities,
            totalLessons: newGoals.totalActivities
          }
        })
      });
    }
  };

  return (
    <GoalsContext.Provider value={{ userGoals, updateUserGoals, isLoadingGoals }}>
      {children}
    </GoalsContext.Provider>
  );
}; 