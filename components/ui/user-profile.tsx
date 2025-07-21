"use client";

import React, { useState } from 'react';
import { useUser } from '@clerk/nextjs';

interface UserProfileProps {
    userId: string;
    initialUserName?: string;
    onProfileUpdate?: (userData: any) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ 
    userId, 
    initialUserName = 'User',
    onProfileUpdate 
}) => {
    const { user, isLoaded } = useUser();
    const [userName, setUserName] = useState(initialUserName);
    // Removidos: isEditingProfile, setIsEditingProfile, isLoading, setMessage, setMessageType

    // Sincroniza automaticamente o nome do Clerk com o banco
    React.useEffect(() => {
        const syncName = async () => {
            if (user?.username && userId) {
                try {
                    const response = await fetch('/api/user-profile', {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            userId,
                            userData: { user_namer: user.username }
                        })
                    });
                    const data = await response.json();
                    if (data.success) {
                        setUserName(user.username);
                        onProfileUpdate?.(data.data);
                    }
                } catch {}
            }
        };
        if (isLoaded) syncName();
    }, [user?.username, userId, isLoaded]);

    // Não exibe campo de edição, só mostra o nome do Clerk
    return (
        <div className="text-white">
            <p><strong>Nome:</strong> {user?.username || userName}</p>
        </div>
    );
};

export default UserProfile; 