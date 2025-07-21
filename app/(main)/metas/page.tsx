"use client";

import React, { useState, useEffect } from 'react';
import { useGoals } from '@/lib/contexts/GoalsContext';
import UserProfile from '@/components/ui/user-profile';
import { useUser } from '@clerk/nextjs';

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
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState('');
    const [saveMessageType, setSaveMessageType] = useState<'success' | 'error'>('success');

    // Sincronizar estado local com contexto quando userGoals mudar
    useEffect(() => {
        setDailyActivities(userGoals.dailyActivities || 3);
    }, [userGoals.dailyActivities]);

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

    // Simular um ID de usuário (em produção, isso viria de autenticação)
    // Obtendo o user_id do usuário autenticado via Clerk
    const { user } = useUser();
    const userId = user?.id;

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

    const handleSaveGoals = async () => {
        setIsSaving(true);
        setSaveMessage('');
        
        try {
            const updatedGoals = {
                dailyXPTarget: dailyActivities * 10,
                dailyLessonsTarget: dailyActivities,
                weeklyXPTarget: dailyActivities * 10 * 7,
                weeklyLessonsTarget: dailyActivities * 7,
            };

            updateUserGoals(updatedGoals);
            
            setSaveMessage('Metas salvas com sucesso! As alterações foram aplicadas.');
            setSaveMessageType('success');
            
            console.log('Metas salvas:', updatedGoals);
            
            // Limpar mensagem após 3 segundos
            setTimeout(() => {
                setSaveMessage('');
            }, 3000);
            
        } catch (error) {
            setSaveMessage('Erro ao salvar metas. Tente novamente.');
            setSaveMessageType('error');
            console.error('Erro ao salvar metas:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-8">
 
            <div>
                <h1 className="text-2xl font-bold mb-4 text-white">Configurar Metas</h1>
                {/* Seção de Perfil do Usuário */}
                <UserProfile 
                        userId={userId}
                        initialUserName="User"
                        onProfileUpdate={(userData) => {
                            console.log('Perfil atualizado:', userData);
                        }}
                    />

                <p className="text-[#6a7282] mb-6">
                    Defina quantas atividades diárias você quer fazer. Cada atividade vale 10 XP.
                </p>
            </div>

            {/* Mensagem de feedback */}
            {saveMessage && (
                <div className={`p-4 rounded-lg border ${
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
                        <div className="text-white font-medium mb-2">Resumo das suas metas alvo:</div>
                            <div className="space-y-2 text-sm text-[#6a7282]">
                                <div>• XP diário alvo: {userGoals.dailyXPTarget} XP</div>
                                <div>• Lições diárias alvo: {userGoals.dailyLessonsTarget}</div>
                                <div>• XP semanal alvo: {userGoals.weeklyXPTarget} XP</div>
                                <div>• Lições semanais alvo: {userGoals.weeklyLessonsTarget}</div>
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

export default MetasPage;