import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { sql } from 'drizzle-orm';
import { config } from 'dotenv';
import { resolve } from 'path';

// Carregar variáveis de ambiente do arquivo .env na raiz do projeto
config({ path: resolve(process.cwd(), '.env') });

async function fixUserColumn() {
  try {
    console.log('🔧 Corrigindo nome da coluna no banco de dados...');
    
    // Verificar se DATABASE_URL está configurado
    if (!process.env.DATABASE_URL) {
      console.error('❌ DATABASE_URL não está configurado!');
      console.log('📝 Verifique se o arquivo .env existe na raiz do projeto com:');
      console.log('DATABASE_URL=postgresql://seu_usuario:sua_senha@seu_host:5432/seu_banco');
      console.log('');
      console.log('💡 Exemplos:');
      console.log('- Neon: postgresql://[user]:[password]@[host]/[database]?sslmode=require');
      console.log('- Supabase: postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres');
      console.log('- Local: postgresql://postgres:password@localhost:5432/qlearning');
      process.exit(1);
    }
    
    console.log('✅ DATABASE_URL configurado');
    console.log('🔗 Conectando ao banco de dados...');
    
    const sqlClient = neon(process.env.DATABASE_URL);
    const db = drizzle(sqlClient);
    
    // Testar conexão primeiro
    try {
      await db.execute(sql`SELECT 1`);
      console.log('✅ Conexão com banco de dados estabelecida');
    } catch (error) {
      console.error('❌ Erro ao conectar com banco de dados:', error);
      process.exit(1);
    }
    
    // Verificar se a tabela user_progress existe
    const checkTable = await db.execute(sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_name = 'user_progress'
    `);
    
    if (checkTable.rows.length === 0) {
      console.log('❌ Tabela user_progress não existe!');
      console.log('📝 Execute primeiro: npm run db:push');
      process.exit(1);
    }
    
    console.log('✅ Tabela user_progress existe');
    
    // Verificar se a coluna user_namer existe
    const checkColumn = await db.execute(sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'user_progress' 
      AND column_name = 'user_namer'
    `);
    
    if (checkColumn.rows.length === 0) {
      console.log('❌ Coluna user_namer não existe. Criando...');
      
      // Adicionar a coluna user_namer
      await db.execute(sql`
        ALTER TABLE user_progress 
        ADD COLUMN user_namer TEXT NOT NULL DEFAULT 'User'
      `);
      
      console.log('✅ Coluna user_namer criada com sucesso!');
    } else {
      console.log('✅ Coluna user_namer já existe.');
    }
    
    // Verificar se a coluna user_name existe e removê-la se necessário
    const checkOldColumn = await db.execute(sql`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'user_progress' 
      AND column_name = 'user_name'
    `);
    
    if (checkOldColumn.rows.length > 0) {
      console.log('🔄 Removendo coluna user_name antiga...');
      
      // Remover a coluna user_name
      await db.execute(sql`
        ALTER TABLE user_progress 
        DROP COLUMN user_name
      `);
      
      console.log('✅ Coluna user_name removida com sucesso!');
    }
    
    console.log('✅ Correção concluída!');
    console.log('🎉 Agora você pode usar a funcionalidade de perfil do usuário!');
    
  } catch (error) {
    console.error('❌ Erro ao corrigir coluna:', error);
    console.log('');
    console.log('🔍 Possíveis soluções:');
    console.log('1. Verifique se o DATABASE_URL está correto no arquivo .env');
    console.log('2. Verifique se o banco PostgreSQL está acessível');
    console.log('3. Verifique se as credenciais estão corretas');
    console.log('4. Execute primeiro: npm run db:push');
    process.exit(1);
  }
}

fixUserColumn(); 