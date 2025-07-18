import React from 'react';

interface UserGoalsProps {
    // Metas baseadas em atividades diárias
    dailyActivities?: number;
    dailyXP?: number;
    dailyXPTarget?: number;
    dailyLessons?: number;
    dailyLessonsTarget?: number;
    
    // Metas semanais (calculadas automaticamente)
    weeklyXP?: number;
    weeklyXPTarget?: number;
    weeklyLessons?: number;
    weeklyLessonsTarget?: number;
    
    // Progresso geral do curso (opcional)
    showGeneralProgress?: boolean;
    totalActivities?: number;
    completedActivities?: number;
}

const UserGoals: React.FC<UserGoalsProps> = ({
    // Metas baseadas em atividades diárias
    dailyActivities = 3,
    dailyXP = 0,
    dailyXPTarget = 30,
    dailyLessons = 0,
    dailyLessonsTarget = 3,
    
    // Metas semanais
    weeklyXP = 0,
    weeklyXPTarget = 210,
    weeklyLessons = 0,
    weeklyLessonsTarget = 21,
    
    // Progresso geral (opcional)
    showGeneralProgress = false,
    totalActivities = 100,
    completedActivities = 10
}) => {
    // Calcular porcentagens
    const dailyXPPercentage = Math.min((dailyXP / dailyXPTarget) * 100, 100);
    const dailyLessonsPercentage = Math.min((dailyLessons / dailyLessonsTarget) * 100, 100);
    const weeklyXPPercentage = Math.min((weeklyXP / weeklyXPTarget) * 100, 100);
    const weeklyLessonsPercentage = Math.min((weeklyLessons / weeklyLessonsTarget) * 100, 100);
    const courseProgressPercentage = Math.min((completedActivities / totalActivities) * 100, 100);

    return (
        <div className="flex flex-col gap-4 p-4">
            {/* Metas Diárias */}
            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-semibold text-lg">Metas Diárias</h3>
                    <button className="text-blue-500 text-sm hover:underline">Ver</button>
                </div>
                
                <div className="space-y-4">
                    {/* Atividades Diárias */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-white text-sm">{dailyActivities} atividades por dia</span>
                            <span className="text-white text-sm">{dailyLessons}/{dailyLessonsTarget}</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                            <div 
                                className="bg-[#00e676] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${dailyLessonsPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* XP Diário */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-white text-sm">Ganhar {dailyXPTarget} XP</span>
                            <span className="text-white text-sm">{dailyXP}/{dailyXPTarget}</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                            <div 
                                className="bg-[#00e676] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${dailyXPPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Metas Semanais */}
            <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-white font-semibold text-lg">Metas Semanais</h3>
                    <button className="text-blue-500 text-sm hover:underline">Ver</button>
                </div>
                
                <div className="space-y-4">
                    {/* XP Semanal */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-white text-sm">Ganhar {weeklyXPTarget} XP</span>
                            <span className="text-white text-sm">{weeklyXP}/{weeklyXPTarget}</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                            <div 
                                className="bg-[#FFD700] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${weeklyXPPercentage}%` }}
                            ></div>
                        </div>
                    </div>

                    {/* Lições Semanais */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-white text-sm">Completar {weeklyLessonsTarget} lições</span>
                            <span className="text-white text-sm">{weeklyLessons}/{weeklyLessonsTarget}</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-2">
                            <div 
                                className="bg-[#FFD700] h-2 rounded-full transition-all duration-300"
                                style={{ width: `${weeklyLessonsPercentage}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progresso Geral do Curso (condicional) */}
            {showGeneralProgress && (
                <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
                    <h3 className="text-white font-semibold text-lg mb-4">Progresso do Curso</h3>
                    
                    <div className="space-y-2">
                        <div className="flex justify-between items-center">
                            <span className="text-white text-sm">Atividades Completadas</span>
                            <span className="text-white text-sm">{completedActivities}/{totalActivities}</span>
                        </div>
                        <div className="w-full bg-gray-600 rounded-full h-3">
                            <div 
                                className="bg-[#7c3aed] h-3 rounded-full transition-all duration-300"
                                style={{ width: `${courseProgressPercentage}%` }}
                            ></div>
                        </div>
                        <div className="text-center">
                            <span className="text-[#7c3aed] font-bold text-lg">{Math.round(courseProgressPercentage)}%</span>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserGoals; 