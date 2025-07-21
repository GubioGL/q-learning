import { NextRequest, NextResponse } from 'next/server';
import { getUserProfile, updateUserProfile, createUserProfile } from '@/db/server-query';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { error: 'ID do usuário é obrigatório' },
        { status: 400 }
      );
    }

    const userProfile = await getUserProfile(userId);
    
    if (!userProfile) {
      return NextResponse.json(
        { error: 'Perfil do usuário não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: userProfile });
  } catch (error) {
    console.error('Erro ao buscar perfil do usuário:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userName } = body;

    console.log('📝 Tentando criar perfil:', { userId, userName });

    if (!userId || !userName) {
      return NextResponse.json(
        { error: 'ID do usuário e nome são obrigatórios' },
        { status: 400 }
      );
    }

    const newUserProfile = await createUserProfile(userId, userName);
    
    return NextResponse.json({ 
      success: true, 
      data: newUserProfile,
      message: 'Perfil do usuário criado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao criar perfil do usuário:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, userData } = body;

    console.log('📝 Tentando atualizar perfil:', { userId, userData });

    if (!userId) {
      return NextResponse.json(
        { error: 'ID do usuário é obrigatório' },
        { status: 400 }
      );
    }

    // Converter user_name para user_namer se necessário
    if (userData.user_name) {
      userData.user_namer = userData.user_name;
      delete userData.user_name;
    }

    const updatedUserProfile = await updateUserProfile(userId, userData);
    
    return NextResponse.json({ 
      success: true, 
      data: updatedUserProfile,
      message: 'Perfil do usuário atualizado com sucesso'
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil do usuário:', error);
    return NextResponse.json(
      { 
        error: 'Erro interno do servidor',
        details: error instanceof Error ? error.message : 'Erro desconhecido'
      },
      { status: 500 }
    );
  }
} 