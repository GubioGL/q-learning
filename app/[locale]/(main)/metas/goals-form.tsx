"use client";

import React, { useState } from 'react';
import { useT } from '@/lib/i18n/context';
import { DAYS_PER_WEEK, MAX_DAILY_GOAL, XP_PER_ACTIVITY, parseDailyGoal } from '@/lib/stats';
import { saveGoal, useProgress } from '@/lib/use-progress';

const HEALTHY_LIMIT = 10;

/**
 * Configuração da meta diária de atividades; as metas de XP e da semana derivam dela.
 */
const GoalsForm = () => {
    const { goals: t } = useT();
    const { progress } = useProgress();
    const [draft, setDraft] = useState<number | null>(null); // null: not edited, show the saved goal
    const dailyActivities = draft ?? progress.goal;
    const [message, setMessage] = useState<{ ok: boolean; text: string } | null>(null);

    // Modos de recomendação
    const recommendationModes = [
        { name: t.easy, activities: 3 },
        { name: t.medium, activities: 6 },
        { name: t.focused, activities: 10 },
        { name: t.super, activities: 15 },
    ];

    const handleSaveGoals = () => {
        if (parseDailyGoal(dailyActivities) === null) {
            setMessage({ ok: false, text: t.invalid(MAX_DAILY_GOAL) });
            return;
        }
        const saved = saveGoal(dailyActivities);
        if (saved) setDraft(null);
        setMessage({ ok: saved, text: saved ? t.saved : t.saveError });
    };

    return (
        <div className="space-y-8">
 
            <div>
                <h1 className="text-2xl font-bold mb-4 text-gray-50">{t.title}</h1>
                <p className="text-gray-400 mb-6">
                    {t.intro(XP_PER_ACTIVITY)}
                </p>
            </div>

            {/* Mensagem de feedback */}
            {message && (
                <div role={message.ok ? 'status' : 'alert'} className={`p-4 rounded-lg border ${
                    message.ok
                        ? 'bg-green-500/20 border-green-500/50 text-green-300'
                        : 'bg-red-500/20 border-red-500/50 text-red-300'
                }`}>
                    {message.text}
                </div>
            )}

            {/* Recomendações de Modo */}
            <div className="bg-(--ql-bg) rounded-lg p-6 border border-(--ql-line)">
                <h2 className="text-gray-50 font-semibold text-xl mb-6">{t.modes}</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recommendationModes.map((mode) => (
                        <button
                            key={mode.activities}
                            aria-pressed={dailyActivities === mode.activities}
                            onClick={() => setDraft(mode.activities)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                                dailyActivities === mode.activities
                                    ? 'border-[#7c3aed] bg-[#7c3aed]/10'
                                    : 'border-(--ql-line) bg-(--ql-bg2) hover:border-(--ql-line2)'
                            }`}
                        >
                            <div className="text-gray-50 font-semibold text-lg">{mode.name}</div>
                            <div className="text-gray-400 text-sm mt-1">{t.perDay(mode.activities)}</div>
                            <div className="text-purple-400 text-sm mt-2 font-medium">
                                {t.xpPerDay(mode.activities * XP_PER_ACTIVITY)}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* {t.manual} */}
            <div className="bg-(--ql-bg) rounded-lg p-6 border border-(--ql-line)">
                <h2 className="text-gray-50 font-semibold text-xl mb-6">{t.manual}</h2>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="daily-activities" className="text-gray-50 text-sm font-medium block mb-2">
                            {t.question}
                        </label>
                        <input
                            type="number"
                            min="1"
                            max={MAX_DAILY_GOAL}
                            id="daily-activities"
                            value={dailyActivities}
                            onChange={(e) => setDraft(Number(e.target.value))}
                            className="w-full bg-(--ql-bg2) border border-(--ql-line2) rounded px-3 py-2 text-gray-50 text-sm"
                        />
                    </div>

                    {dailyActivities > HEALTHY_LIMIT && (
                        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
                            <div className="text-yellow-400 font-medium mb-2">⚠️ {t.warningTitle}</div>
                            <div className="text-yellow-300 text-sm">
                                {t.warning}
                            </div>
                        </div>
                    )}

                    <div className="bg-(--ql-bg2) rounded-lg p-4">
                        <div className="text-gray-50 font-medium mb-2">{t.summary}</div>
                            <div className="space-y-2 text-sm text-gray-400">
                                <div>• {t.dailyXp(dailyActivities * XP_PER_ACTIVITY)}</div>
                                <div>• {t.dailyActivities(dailyActivities)}</div>
                                <div>• {t.weeklyXp(dailyActivities * XP_PER_ACTIVITY * DAYS_PER_WEEK)}</div>
                                <div>• {t.weeklyActivities(dailyActivities * DAYS_PER_WEEK)}</div>
                        </div>
                    </div>
                </div>
            </div>
            

            {/* Botão Salvar */}
            <div className="flex justify-end">
                <button
                    className="font-medium py-3 px-6 rounded-lg transition-colors bg-[#7c3aed] hover:bg-[#6d28d9] text-white"
                    onClick={handleSaveGoals}
                >
                    {t.save}
                </button>
            </div>

            
        </div>
    );
};

export default GoalsForm;
