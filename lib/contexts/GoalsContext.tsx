"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface UserGoals {
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

interface GoalsContextType {
    userGoals: UserGoals;
    updateUserGoals: (newGoals: Partial<UserGoals>) => void;
}

const GoalsContext = createContext<GoalsContextType | undefined>(undefined);

export const useGoals = () => {
    const context = useContext(GoalsContext);
    if (context === undefined) {
        throw new Error('useGoals must be used within a GoalsProvider');
    }
    return context;
};

interface GoalsProviderProps {
    children: ReactNode;
}

export const GoalsProvider: React.FC<GoalsProviderProps> = ({ children }) => {
    const [userGoals, setUserGoals] = useState<UserGoals>({
        // Metas diárias
        dailyActivities: 3,
        dailyXP: 50,
        dailyXPTarget: 200,
        dailyLessons: 3,
        dailyLessonsTarget: 8,
        dailyChallenges: 1,
        dailyChallengesTarget: 4,
        
        // Metas semanais
        weeklyXP: 300,
        weeklyXPTarget: 1000,
        weeklyLessons: 15,
        weeklyLessonsTarget: 40,
        
        // Progresso geral
        completedActivities: 25,
        totalActivities: 100
    });

    const updateUserGoals = (newGoals: Partial<UserGoals>) => {
        setUserGoals(prev => ({ ...prev, ...newGoals }));
    };

    return (
        <GoalsContext.Provider value={{ userGoals, updateUserGoals }}>
            {children}
        </GoalsContext.Provider>
    );
}; 