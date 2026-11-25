"use client";

import React from 'react';
import Link from 'next/link';
import { useLocale, useT } from '@/lib/i18n/context';
import type { SiteStats } from '@/lib/site-stats';
import { DAYS_PER_WEEK, XP_PER_ACTIVITY } from '@/lib/stats';

interface UserGoalsProps {
  stats: SiteStats;
  dailyGoal: number;
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
}> = ({ title, children }) => {
  const locale = useLocale();
  const { panel } = useT();
  return (
  <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-white font-semibold text-lg">{title}</h2>
      <Link href={`/${locale}/metas`} aria-label={`${panel.view}: ${title}`} className="text-blue-400 text-sm hover:underline">{panel.view}</Link>
    </div>
    <div className="space-y-4">
      {children}
    </div>
  </div>
  );
};

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

const pct = (value: number, target: number) => (target > 0 ? (value / target) * 100 : 0);

const UserGoals: React.FC<UserGoalsProps> = ({ stats, dailyGoal }) => {
  const { panel } = useT();
  const { today, week, completed, total } = stats;
  const dailyXPTarget = dailyGoal * XP_PER_ACTIVITY;
  const weeklyTarget = dailyGoal * DAYS_PER_WEEK;
  const weeklyXPTarget = dailyXPTarget * DAYS_PER_WEEK;
  const totalPercentage = pct(completed, total);

  return (
    <div className="flex flex-col gap-4 p-4">
      <GoalSection title={panel.daily}>
        <GoalItem
          label={panel.perDay(dailyGoal)}
          current={today.activities}
          target={dailyGoal}
          percentage={pct(today.activities, dailyGoal)}
          color="bg-[#00e676]"
        />
        <GoalItem
          label={panel.earn(dailyXPTarget)}
          current={today.xp}
          target={dailyXPTarget}
          percentage={pct(today.xp, dailyXPTarget)}
          color="bg-[#00e676]"
        />
      </GoalSection>

      <GoalSection title={panel.weekly}>
        <GoalItem
          label={panel.earn(weeklyXPTarget)}
          current={week.xp}
          target={weeklyXPTarget}
          percentage={pct(week.xp, weeklyXPTarget)}
          color="bg-[#FFD700]"
        />
        <GoalItem
          label={panel.doActivities(weeklyTarget)}
          current={week.activities}
          target={weeklyTarget}
          percentage={pct(week.activities, weeklyTarget)}
          color="bg-[#FFD700]"
        />
      </GoalSection>

        <div className="bg-[#1a1a1a] rounded-lg p-4 border border-[#333]">
          <h2 className="text-white font-semibold text-lg mb-4">{panel.overall}</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-white text-sm">{panel.completed}</span>
              <span className="text-white text-sm">{completed}/{total}</span>
            </div>
            <div className="w-full bg-gray-600 rounded-full h-3">
              <div 
                className="bg-[#7c3aed] h-3 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(totalPercentage, 100)}%` }}
              />
            </div>
            <div className="text-center">
              <span className="text-[#a78bfa] font-bold text-lg">
                {Math.round(totalPercentage)}%
              </span>
            </div>
          </div>
        </div>
    </div>
  );
};

export default UserGoals; 