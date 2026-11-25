"use client";

import React, { useState } from 'react';
import { updateDailyGoal } from '@/app/actions/progress';
import { DAYS_PER_WEEK, MAX_DAILY_GOAL, XP_PER_ACTIVITY, parseDailyGoal } from '@/lib/stats';

const HEALTHY_LIMIT = 10;

/**
 * Configuração da meta diária de atividades; as metas de XP e da semana derivam dela.
 */
const GoalsForm = ({ dailyGoal }: { dailyGoal: number }) => {
    const [dailyActivities, setDailyActivities] = useState(dailyGoal);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [saveMessageType, setSaveMessageType] = useState<'success' | 'error'>('success');

    // Modos de recomendação
    const recommendationModes = [
        { id: 'facil', name: 'Fácil', activities: 3, description: '3 atividades por dia' },
        { id: 'medio', name: 'Médio', activities: 6, description: '6 atividades por dia' },
        { id: 'focado', name: 'Focado', activities: 10, description: '10 atividades por dia' },
        { id: 'super', name: 'Super Empolgado', activities: 15, description: '15 atividades por dia' }
    ];


    const handleSaveGoals = async () => {
        if (parseDailyGoal(dailyActivities) === null) {
            setSaveMessage(`Digite um número inteiro de 1 a ${MAX_DAILY_GOAL}.`);
            setSaveMessageType('error');
            return;
        }
        setIsSaving(true);
        setSaveMessage('');
        try {
            await updateDailyGoal(dailyActivities);
            setSaveMessage('Metas salvas com sucesso! As alterações foram aplicadas.');
            setSaveMessageType('success');
        } catch {
            setSaveMessage('Erro ao salvar metas. Tente novamente.');
            setSaveMessageType('error');
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8">
 
            <div>
                <h1 className="text-2xl font-bold mb-4 text-white">Configurar Metas</h1>
                <p className="text-[#6a7282] mb-6">
                    Defina quantas atividades diárias você quer fazer. Cada atividade vale {XP_PER_ACTIVITY} XP.
                </p>
            </div>

            {/* Mensagem de feedback */}
            {saveMessage && (
                <div role={saveMessageType === 'error' ? 'alert' : 'status'} className={`p-4 rounded-lg border ${
                    saveMessageType === 'success'
                        ? 'bg-green-500/20 border-green-500/50 text-green-300'
                        : 'bg-red-500/20 border-red-500/50 text-red-300'
                }`}>
                    {saveMessage}
                </div>
            )}

            {/* Recomendações de Modo */}
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
                <h2 className="text-white font-semibold text-xl mb-6">Modos Recomendados</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recommendationModes.map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => setDailyActivities(mode.activities)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                                dailyActivities === mode.activities
                                    ? 'border-[#7c3aed] bg-[#7c3aed]/10'
                                    : 'border-[#333] bg-[#2a2a2a] hover:border-[#444]'
                            }`}
                        >
                            <div className="text-white font-semibold text-lg">{mode.name}</div>
                            <div className="text-[#6a7282] text-sm mt-1">{mode.description}</div>
                            <div className="text-[#7c3aed] text-sm mt-2 font-medium">
                                {mode.activities * XP_PER_ACTIVITY} XP/dia
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Configuração Manual */}
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
                <h2 className="text-white font-semibold text-xl mb-6">Configuração Manual</h2>
                
                <div className="space-y-4">
                    <div>
                        <label htmlFor="daily-activities" className="text-white text-sm font-medium block mb-2">
                            Quantas atividades diárias você quer fazer?
                        </label>
                        <input
                            type="number"
                            min="1"
                            max={MAX_DAILY_GOAL}
                            id="daily-activities"
                            value={dailyActivities}
                            onChange={(e) => setDailyActivities(Number(e.target.value))}
                            className="w-full bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-white text-sm"
                            placeholder="Digite um número entre 1 e 20"
                        />
                    </div>

                    {dailyActivities > HEALTHY_LIMIT && (
                        <div className="bg-yellow-500/20 border border-yellow-500/50 rounded-lg p-4">
                            <div className="text-yellow-400 font-medium mb-2">⚠️ Aviso Importante</div>
                            <div className="text-yellow-300 text-sm">
                                Para o processo de aprendizado, não recomendamos mais de 10 atividades por dia. 
                                É melhor ir com calma e fazer um passo por vez. A consistência é mais importante 
                                que a quantidade!
                            </div>
                        </div>
                    )}

                    <div className="bg-[#2a2a2a] rounded-lg p-4">
                        <div className="text-white font-medium mb-2">Resumo das suas metas alvo:</div>
                            <div className="space-y-2 text-sm text-[#6a7282]">
                                <div>• XP diário alvo: {dailyActivities * XP_PER_ACTIVITY} XP</div>
                                <div>• Atividades diárias alvo: {dailyActivities}</div>
                                <div>• XP semanal alvo: {dailyActivities * XP_PER_ACTIVITY * DAYS_PER_WEEK} XP</div>
                                <div>• Atividades semanais alvo: {dailyActivities * DAYS_PER_WEEK}</div>
                        </div>
                    </div>
                </div>
            </div>
            

            {/* Botão Salvar */}
            <div className="flex justify-end">
                <button 
                    className={
                        'font-medium py-3 px-6 rounded-lg transition-colors ' +
                        (isSaving
                            ? 'bg-[#4c1d95] text-[#9ca3af] cursor-not-allowed'
                            : 'bg-[#7c3aed] hover:bg-[#6d28d9] text-white')
                    }
                    onClick={handleSaveGoals}
                    disabled={isSaving}
                >
                    {isSaving ? 'Salvando...' : 'Salvar Configurações'}
                </button>
            </div>

            
        </div>
    );
};

export default GoalsForm;
