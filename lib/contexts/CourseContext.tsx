"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface CourseContextType {
  selectedCourseId: number;
  setSelectedCourseId: (id: number) => void;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

const STORAGE_KEY = 'selectedCourseId';
const DEFAULT_COURSE_ID = 1; // Básico como padrão

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
  const [selectedCourseId, setSelectedCourseId] = useState<number>(DEFAULT_COURSE_ID);

  useEffect(() => {
    const savedCourseId = localStorage.getItem(STORAGE_KEY);
    if (savedCourseId) {
      setSelectedCourseId(parseInt(savedCourseId));
    }
  }, []);

  const handleSetSelectedCourseId = (id: number) => {
    setSelectedCourseId(id);
    localStorage.setItem(STORAGE_KEY, id.toString());
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