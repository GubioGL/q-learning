import React from 'react';

interface UserProgressProps {
    dayStreak?: number;
    Qtokens?: number;
    energy?: number;
}

const UserProgress: React.FC<UserProgressProps> = ({
    dayStreak = 0,
    Qtokens = 0,
    energy = 0
}) => {
    return (
        <>        
        {/* Indicadores de gamificação - Layout horizontal */}
        <div className="flex justify-between items-center gap-10 p-4 bg-[#1a1a1a] rounded-lg ">
            {/* Streak */}
            <div className="flex items-center gap-2">
                <span className="text-[#ffa500] font-bold text-lg">
                    {dayStreak}
                </span>
                <div className="text-[#ffa500] text-xl">⚡</div>
            </div>

            {/* Tokens */}
            <div className="flex items-center gap-2">
                <span className="text-[#FFD700] font-bold text-lg">
                    {Qtokens}
                </span>
                <div className="text-[#FFD700] text-xl">🪙</div>
            </div>

            {/* Energia */}
            <div className="flex items-center gap-2">
                <span className="text-[#00e676] font-bold text-lg">
                    {energy}
                </span>
                <div className="text-[#00e676] text-xl">🔋</div>
            </div>
        </div>
        </>  
    );
};

export default UserProgress; 