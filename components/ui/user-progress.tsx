import React from 'react';

interface UserProgressProps {
    dayStreak: number;
    xp: number;
}

const UserProgress: React.FC<UserProgressProps> = ({ dayStreak, xp }) => (
    <div className="flex justify-between items-center gap-10 p-4 bg-[#1a1a1a] rounded-lg">
        <div className="flex items-center gap-2 text-[#ffa500]" role="img" aria-label={`Sequência de ${dayStreak} dia(s)`} title="Dias seguidos">
            <span className="font-bold text-lg">{dayStreak}</span>
            <span className="text-xl">🔥</span>
        </div>
        <div className="flex items-center gap-2 text-[#00e676]" role="img" aria-label={`${xp} XP no total`} title="XP total">
            <span className="font-bold text-lg">{xp}</span>
            <span className="text-xl">⚡</span>
        </div>
    </div>
);

export default UserProgress;
