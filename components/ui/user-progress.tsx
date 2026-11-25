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
    <div className="flex justify-between items-center gap-10 p-4 bg-[#1a1a1a] rounded-lg">
        <div className="flex items-center gap-2 text-[#ffa500]" role="img" aria-label={panel.streak(dayStreak)} title={panel.streak(dayStreak)}>
            <span className="font-bold text-lg">{dayStreak}</span>
            <span className="text-xl">🔥</span>
        </div>
        <div className="flex items-center gap-2 text-[#00e676]" role="img" aria-label={panel.xp(xp)} title={panel.xp(xp)}>
            <span className="font-bold text-lg">{xp}</span>
            <span className="text-xl">⚡</span>
        </div>
    </div>
    );
};

export default UserProgress;
