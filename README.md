# Documentação do Projeto - Consulta de CNPJ na Receita Federal

## 📋 Visão Geral

API para consulta de CNPJs com integração aos dados da Receita Federal,
desenvolvida em Next.js, Node.js e Tailwind CSS, com deploy gratuito.

## 🛠 Tecnologias Utilizadas

- **Frontend**: Next.js, Tailwind CSS, React Query
- **Backend**: Next.js API Routes, Node.js
- **Banco de Dados**: (Definir)
- **Cache**: Redis (Upstash)
- **Validação**: Zod
- **Deploy**: Vercel (frontend e API), Backend (Definir)

## 🚀 Passo a Passo para Implementação

### 1. Configuração Inicial do Projeto

```bash
# Criar projeto Next.js
npx create-next-app@latest cnpj-consulta

# Instalar dependências principais
cd cnpj-consulta
npm install axios cheerio @upstash/redis swr zod
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

### 2. Estrutura de Arquivos

```
/src
├── /components
│   ├── /ui (componentes reutilizáveis)
│   ├── ConsultaForm.tsx
│   └── ResultadoView.tsx
├── /pages
│   ├── /api
│   │   ├── consulta.ts
│   │   └── historico.ts
│   ├── index.tsx (página principal)
│   └── _app.tsx
├── /lib
│   ├── receita-service.ts
│   └── redis-client.ts
├── /styles
│   └── globals.css
└── /types
    └── cnpj.d.ts
```

### 3. Implementação do Backend

#### 3.1. Configurar cliente Redis

#### 3.2. Criar endpoint de consulta

### 4. Implementação do Frontend

#### 4.1. Página principal

### 5. Configuração para Deploy

#### 5.1. Variáveis de ambiente

```env
# .env
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
RECEITA_FEDERAL_API_KEY=
```

#### 5.2. Configuração do Vercel

1. Criar conta na Vercel
2. Conectar repositório Git
3. Adicionar variáveis de ambiente no painel
4. Configurar como projeto Next.js

### 6. Funcionalidades Adicionais (Roadmap)

| Prioridade | Feature                | Descrição                          |
| ---------- | ---------------------- | ---------------------------------- |
| P1         | Histórico de consultas | Salvar consultas recentes          |
| P1         | Validação de CNPJ      | Validar formato antes de consultar |
| P2         | Autenticação           | Salvar histórico por usuário       |
| P2         | Exportar PDF           | Gerar relatório em PDF             |
| P3         | API pública            | Oferecer endpoint para devs        |

## 📌 Considerações Importantes

1. **Legalidade**: Verificar os termos de serviço da Receita Federal
2. **Rate Limiting**: Implementar limite de consultas por usuário
3. **Cache**: Utilizar Redis para reduzir requisições à fonte
4. **LGPD**: Não armazenar dados sensíveis sem necessidade

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais
detalhes.
