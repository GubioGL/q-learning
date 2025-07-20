# Configuração do Banco de Dados

## 📋 Pré-requisitos

1. **Banco PostgreSQL** (recomendado Neon Database)
2. **Variável de ambiente** `DATABASE_URL`

## 🔧 Configuração

### 1. Criar arquivo `.env`

Crie um arquivo `.env` na raiz do projeto com:

```env
DATABASE_URL="postgresql://username:password@host:port/database"
```

### 2. Configurar banco de dados

#### Opção A: Neon Database (Recomendado)
1. Acesse [neon.tech](https://neon.tech)
2. Crie uma conta gratuita
3. Crie um novo projeto
4. Copie a connection string
5. Cole no arquivo `.env`

#### Opção B: PostgreSQL Local
1. Instale PostgreSQL
2. Crie um banco de dados
3. Configure a connection string

### 3. Executar migrações

```bash
# Gerar migrações
npm run db:generate

# Aplicar migrações
npm run db:push

# Popular banco com dados
npm run db:seed
```

### 4. Verificar dados

```bash
# Abrir Drizzle Studio
npm run db:studio
```

## 🚀 Funcionalidades Implementadas

### ✅ Arquivos Criados:

1. **`db/query.ts`** - Queries com cache do React
2. **`db/seed.ts`** - Script para popular banco
3. **`db/schema.ts`** - Schema atualizado com todos os campos

### ✅ Funcionalidades:

- **Cache automático** com `cache()` do React
- **Fallback para dados mock** quando banco não está disponível
- **Debug visual** na página `/cursos`
- **Tratamento de erros** robusto

### ✅ Estrutura do Banco:

```sql
CREATE TABLE cursos (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    image_src TEXT NOT NULL,
    resumo TEXT NOT NULL,
    topicos TEXT NOT NULL
);
```

## 🔍 Debug

A página `/cursos` mostra:
- **Dados do banco** em formato JSON
- **Status de conexão**
- **Dados mock** se banco não estiver disponível

## 📝 Próximos Passos

1. Configure a `DATABASE_URL` no `.env`
2. Execute `npm run db:seed`
3. Verifique os dados em `/cursos`
4. Remova o debug quando estiver funcionando

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
npm run dev

# Banco de dados
npm run db:generate  # Gerar migrações
npm run db:push      # Aplicar migrações
npm run db:seed      # Popular dados
npm run db:studio    # Visualizar dados

# Build
npm run build
npm run start
``` 