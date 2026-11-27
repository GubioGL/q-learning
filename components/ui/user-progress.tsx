"use client";

import React from 'react';
import { useT } from '@/lib/i18n/context';

interface UserProgressProps {
    dayStreak: number;
    xp: number;
}

const UserProgress: React.FC<UserProgressProps> = ({ dayStreak, xp }) => {
    const { panel } = useT();
    return (
    <div className="flex justify-between items-center gap-4 p-2 lg:gap-10 lg:p-4 bg-(--ql-bg) rounded-lg">
        <div className="flex items-center gap-2 text-(--ql-streak)" role="img" aria-label={panel.streak(dayStreak)} title={panel.streak(dayStreak)}>
            <span className="font-bold text-lg">{dayStreak}</span>
            <span className="text-xl">🔥</span>
        </div>
        <div className="flex items-center gap-2 text-(--ql-xp)" role="img" aria-label={panel.xp(xp)} title={panel.xp(xp)}>
            <span className="font-bold text-lg">{xp}</span>
            <span className="text-xl">⚡</span>
        </div>
    </div>
    );
};

export default UserProgress;
