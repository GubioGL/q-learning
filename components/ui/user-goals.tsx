import React from 'react';

interface UserGoalsProps {
  dailyActivities?: number;
  dailyXP?: number;
  dailyXPTarget?: number;
  dailyLessons?: number;
  dailyLessonsTarget?: number;
  weeklyXP?: number;
  weeklyXPTarget?: number;
  weeklyLessons?: number;
  weeklyLessonsTarget?: number;
  showGeneralProgress?: boolean;
  totalActivities?: number;
  completedActivities?: number;
}

const ProgressBar: React.FC<{ percentage: number; color: string }> = ({ percentage, color }) => (
  <div className="w-full bg-gray-600 rounded-full h-2">
    <div 
      className={`${color} h-2 rounded-full transition-all duration-300`}
      style={{ width: `${Math.min(percentage, 100)}%` }}
    />
  </div>
);

const GoalSection: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => (
  <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-white font-semibold text-lg">{title}</h3>
      <button className="text-blue-500 text-sm hover:underline">Ver</button>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
);

const GoalItem: React.FC<{
  label: string;
  current: number;
  target: number;
  percentage: number;
  color: string;
}> = ({ label, current, target, percentage, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center">
      <span className="text-white text-sm">{label}</span>
      <span className="text-white text-sm">{current}/{target}</span>
    </div>
    <ProgressBar percentage={percentage} color={color} />
  </div>
);

const UserGoals: React.FC<UserGoalsProps> = ({
  dailyActivities = 3,
  dailyXP = 0,
  dailyXPTarget = 30,
  dailyLessons = 0,
  dailyLessonsTarget = 3,
  weeklyXP = 0,
  weeklyXPTarget = 210,
  weeklyLessons = 0,
  weeklyLessonsTarget = 21,
  showGeneralProgress = false,
  totalActivities = 100,
  completedActivities = 10
}) => {
  const dailyXPPercentage = (dailyXP / dailyXPTarget) * 100;
  const dailyLessonsPercentage = (dailyLessons / dailyLessonsTarget) * 100;
  const weeklyXPPercentage = (weeklyXP / weeklyXPTarget) * 100;
  const weeklyLessonsPercentage = (weeklyLessons / weeklyLessonsTarget) * 100;
  const courseProgressPercentage = (completedActivities / totalActivities) * 100;

  return (
    <div className="flex flex-col gap-4 p-4">
      <GoalSection title="Metas Diárias">
        <GoalItem
          label={`${dailyActivities} atividades por dia`}
          current={dailyLessons}
          target={dailyLessonsTarget}
          percentage={dailyLessonsPercentage}
          color="bg-[#00e676]"
        />
        <GoalItem
          label={`Ganhar ${dailyXPTarget} XP`}
          current={dailyXP}
          target={dailyXPTarget}
          percentage={dailyXPPercentage}
          color="bg-[#00e676]"
        />
      </GoalSection>

      <GoalSection title="Metas Semanais">
        <GoalItem
          label={`Ganhar ${weeklyXPTarget} XP`}
          current={weeklyXP}
          target={weeklyXPTarget}
          percentage={weeklyXPPercentage}
          color="bg-[#FFD700]"
        />
        <GoalItem
          label={`Completar ${weeklyLessonsTarget} lições`}
          current={weeklyLessons}
          target={weeklyLessonsTarget}
          percentage={weeklyLessonsPercentage}
          color="bg-[#FFD700]"
        />
      </GoalSection>

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
                style={{ width: `${Math.min(courseProgressPercentage, 100)}%` }}
              />
            </div>
            <div className="text-center">
              <span className="text-[#7c3aed] font-bold text-lg">
                {Math.round(courseProgressPercentage)}%
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGoals; 