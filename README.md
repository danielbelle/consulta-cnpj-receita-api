# Consulta CNPJ - Receita Federal

## 📖 Resumo

Este projeto é uma aplicação fullstack desenvolvida em **Next.js** que permite
consultar informações de CNPJ diretamente da Receita Federal, com validação
robusta, proteção contra abusos e interface responsiva. O sistema utiliza cache
em Redis para otimizar consultas e integrações modernas para segurança e
experiência do usuário.

---

## 🚀 Demonstração

Acesse a versão online:  
[https://consulta-cnpj-receita-api.vercel.app/](https://consulta-cnpj-receita-api.vercel.app/)

---

## 📝 Funcionalidades

- Consulta de CNPJ com máscara e validação em tempo real
- Validação de CNPJ no frontend e backend usando **Yup**
- Integração com a API da Receita Federal via SDK
- Cache de resultados em **Redis** (Upstash)
- Proteção contra abuso: **Rate limiting** e **Google reCAPTCHA**
- Interface responsiva com **Tailwind CSS** e suporte a tema claro/escuro
- Headers de segurança HTTP configurados
- Código organizado e pronto para produção

---

## 🛠 Tecnologias Utilizadas

- **Frontend:** Next.js, React, Tailwind CSS, React Hook Form, next-themes
- **Backend:** Next.js API Routes, Node.js
- **Validação:** Yup
- **Cache:** Redis (Upstash)
- **Segurança:** Google reCAPTCHA, CORS, Rate Limiting, HTTP Security Headers
- **Outros:** @cnpja/sdk, SWR, Axios, Cheerio

---

## 📦 Como Clonar e Rodar Localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/consulta-receita.git
cd consulta-receita
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo (ajuste os
valores conforme necessário):

```env
NODE_ENV="development"
REDIS_URL="sua_url_do_redis"
CNPJA_API_TOKEN="sua_api_key_cnpja"
SITE_KEY="sua_site_key_recaptcha"
NEXT_PUBLIC_RECAPTCHA_SITE_KEY="sua_site_key_recaptcha"
RECAPTCHA_SECRET="seu_secret_recaptcha"
```

> **Dica:** Para testes locais, você pode usar o Redis gratuito do Upstash e
> criar uma conta no Google reCAPTCHA.

### 4. Rode o projeto em modo desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

---

## 📂 Estrutura de Pastas

```
src/
  app/
    forms/           # Formulários e validação
    landing/         # Texto e landing page
    results/         # Exibição dos resultados
    types/           # Validação de CNPJ
    globals.css      # Estilos globais
    layout.js        # Layout principal
    page.jsx         # Página principal
  components/        # Componentes reutilizáveis (UI, máscara, tema)
  lib/               # Utilitários e integração com Redis
  pages/
    api/
      consultarCNPJ.js # Endpoint de consulta de CNPJ
  _middleware.js     # Middleware de CORS
```

---

## 📚 Principais Bibliotecas

- **[Next.js](https://nextjs.org/):** Framework React para SSR/SSG
- **[React Hook Form](https://react-hook-form.com/):** Gerenciamento de
  formulários
- **[Yup](https://github.com/jquense/yup):** Validação de schemas
- **[@cnpja/sdk](https://www.npmjs.com/package/@cnpja/sdk):** Consulta de CNPJ
- **[Redis (ioredis)](https://github.com/luin/ioredis):** Cache de resultados
- **[Tailwind CSS](https://tailwindcss.com/):** Estilização utilitária
- **[next-themes](https://github.com/pacocoursey/next-themes):** Suporte a tema
  escuro/claro
- **[Google reCAPTCHA](https://www.google.com/recaptcha/about/):** Proteção
  contra bots
- **[CORS](https://www.npmjs.com/package/cors):** Segurança de origem
- **[SWR](https://swr.vercel.app/):** Fetching e cache de dados (opcional)

---

## 🔒 Segurança

- **Validação de entrada** no frontend e backend
- **Rate limiting** por IP usando Redis
- **Proteção contra bots** com Google reCAPTCHA
- **Headers de segurança** configurados via Next.js
- **CORS restrito** para domínios confiáveis
- **Timeout** em consultas externas para evitar travamentos

---

## 🧑‍💻 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch: `git checkout -b minha-feature`
3. Commit suas alterações: `git commit -m 'feat: minha nova feature'`
4. Push para o seu fork: `git push origin minha-feature`
5. Abra um Pull Request

---

## 📌 Observações Importantes

- **Legalidade:** Consulte os termos de uso da Receita Federal e planos da cnpja
  antes de uso em produção.
- **LGPD:** Não armazene dados sensíveis sem consentimento.
- **Limite de uso:** O sistema possui proteção contra abuso, mas monitore sempre
  o uso em produção, limite de 5 consultas por minuto.

---

## 📄 Licença

Este projeto está sob a licença MIT. Consulte o arquivo LICENSE para mais
detalhes.

---

## ✉️ Contato

Dúvidas, sugestões ou feedback?  
Abra uma issue ou envie um e-mail para henrique.danielb@gmail.com
