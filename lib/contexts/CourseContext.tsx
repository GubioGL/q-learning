"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CourseContextType {
    selectedCourseId: number;
    setSelectedCourseId: (id: number) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export const useCourseContext = () => {
    const context = useContext(CourseContext);
    if (context === undefined) {
        throw new Error('useCourseContext must be used within a CourseProvider');
    }
    return context;
};

interface CourseProviderProps {
    children: React.ReactNode;
}

export const CourseProvider: React.FC<CourseProviderProps> = ({ children }) => {
    const [selectedCourseId, setSelectedCourseId] = useState<number>(1); // Básico como padrão

    // Carregar estado salvo do localStorage
    useEffect(() => {
        const savedCourseId = localStorage.getItem('selectedCourseId');
        if (savedCourseId) {
            setSelectedCourseId(parseInt(savedCourseId));
        }
    }, []);

    // Salvar estado no localStorage quando mudar
    const handleSetSelectedCourseId = (id: number) => {
        setSelectedCourseId(id);
        localStorage.setItem('selectedCourseId', id.toString());
    };

    return (
        <CourseContext.Provider value={{
            selectedCourseId,
            setSelectedCourseId: handleSetSelectedCourseId
        }}>
            {children}
        </CourseContext.Provider>
    );
}; 