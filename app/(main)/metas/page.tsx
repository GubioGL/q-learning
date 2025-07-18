"use client";

import React, { useState } from 'react';
import { useGoals } from '@/lib/contexts/GoalsContext';

/**
 * Página de configuração de metas do usuário.
 * Aqui o usuário pode definir suas metas diárias baseadas em atividades.
 */
const MetasPage = () => {
    const { userGoals, updateUserGoals } = useGoals();
    
    // Estado local para formulário
    const [dailyActivities, setDailyActivities] = useState(userGoals.dailyActivities || 3);
    const [showWarning, setShowWarning] = useState(false);
    const [selectedMode, setSelectedMode] = useState('');

    // Modos de recomendação
    const recommendationModes = [
        { id: 'facil', name: 'Fácil', activities: 3, description: '3 atividades por dia' },
        { id: 'medio', name: 'Médio', activities: 6, description: '6 atividades por dia' },
        { id: 'focado', name: 'Focado', activities: 10, description: '10 atividades por dia' },
        { id: 'super', name: 'Super Empolgado', activities: 15, description: 'Mais de 10 atividades por dia' }
    ];

    // Calcular XP baseado nas atividades (cada atividade = 10 XP)
    const dailyXP = dailyActivities * 10;
    const weeklyXP = dailyXP * 7; // Semana = 7 dias

    const handleActivityChange = (value: number) => {
        setDailyActivities(value);
        
        if (value > 10) {
            setShowWarning(true);
        } else {
            setShowWarning(false);
        }
    };

    const handleModeSelect = (mode: { id: string; name: string; activities: number; description: string }) => {
        setSelectedMode(mode.id);
        setDailyActivities(mode.activities);
        setShowWarning(false);
    };

    const handleSave = () => {
        const updatedGoals = {
            ...userGoals,
            dailyActivities,
            dailyXP: 0, // Será calculado automaticamente
            dailyXPTarget: dailyXP,
            dailyLessons: 0,
            dailyLessonsTarget: dailyActivities, // Uma lição por atividade
            weeklyXP: 0,
            weeklyXPTarget: weeklyXP,
            weeklyLessons: 0,
            weeklyLessonsTarget: dailyActivities * 7,
            completedActivities: 0,
            totalActivities: 0
        };
        
        updateUserGoals(updatedGoals);
        console.log('Metas salvas:', updatedGoals);
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-2xl font-bold mb-4 text-white">Configurar Metas</h1>
                <p className="text-[#6a7282] mb-6">
                    Defina quantas atividades diárias você quer fazer. Cada atividade vale 10 XP.
                </p>
            </div>

            {/* Recomendações de Modo */}
            <div className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333]">
                <h2 className="text-white font-semibold text-xl mb-6">Modos Recomendados</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {recommendationModes.map((mode) => (
                        <button
                            key={mode.id}
                            onClick={() => handleModeSelect(mode)}
                            className={`p-4 rounded-lg border-2 transition-all ${
                                selectedMode === mode.id
                                    ? 'border-[#7c3aed] bg-[#7c3aed]/10'
                                    : 'border-[#333] bg-[#2a2a2a] hover:border-[#444]'
                            }`}
                        >
                            <div className="text-white font-semibold text-lg">{mode.name}</div>
                            <div className="text-[#6a7282] text-sm mt-1">{mode.description}</div>
                            <div className="text-[#7c3aed] text-sm mt-2 font-medium">
                                {mode.activities * 10} XP/dia
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
                        <label className="text-white text-sm font-medium block mb-2">
                            Quantas atividades diárias você quer fazer?
                        </label>
                        <input
                            type="number"
                            min="1"
                            max="20"
                            value={dailyActivities}
                            onChange={(e) => handleActivityChange(Number(e.target.value))}
                            className="w-full bg-[#2a2a2a] border border-[#444] rounded px-3 py-2 text-white text-sm"
                            placeholder="Digite um número entre 1 e 10"
                        />
                    </div>

                    {showWarning && (
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
                        <div className="text-white font-medium mb-2">Resumo das suas metas:</div>
                        <div className="space-y-2 text-sm text-[#6a7282]">
                            <div>• Atividades diárias: {dailyActivities}</div>
                            <div>• XP diário: {dailyXP} XP</div>
                            <div>• XP semanal: {weeklyXP} XP</div>
                            <div>• Lições diárias: {dailyActivities}</div>
                            <div>• Lições semanais: {dailyActivities * 7}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Botão Salvar */}
            <div className="flex justify-end">
                <button 
                    className="bg-[#7c3aed] hover:bg-[#6d28d9] text-white font-medium py-3 px-6 rounded-lg transition-colors"
                    onClick={handleSave}
                >
                    Salvar Configurações
                </button>
            </div>
        </div>
    );
};

export default MetasPage;