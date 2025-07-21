import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import { migrate } from 'drizzle-orm/neon-http/migrator';

async function runMigrations() {
  try {
    console.log('🔄 Iniciando migrações do banco de dados...');
    
    const sql = neon(process.env.DATABASE_URL!);
    const db = drizzle(sql);
    
    await migrate(db, { migrationsFolder: './drizzle' });
    
    console.log('✅ Migrações executadas com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar migrações:', error);
    process.exit(1);
  }
}

runMigrations(); 