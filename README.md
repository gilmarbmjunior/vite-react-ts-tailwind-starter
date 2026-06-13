# Landing Tailwind

Projeto de landing page com **React 19 + TypeScript + Vite 8 + Tailwind CSS 4**.

## Tecnologias

- React 19
- TypeScript
- Vite
- Tailwind CSS (plugin oficial para Vite)
- ESLint + Prettier

## Requisitos

- Node.js 20+ (recomendado)
- npm 10+ (ou equivalente)

## Como rodar localmente

```bash
npm install
npm run dev
```

A aplicação ficará disponível em:

- http://localhost:5173/

## Scripts disponíveis

- `npm run dev` : inicia o servidor de desenvolvimento com Vite.
- `npm run build` : gera o build de produção (`tsc -b && vite build`).
- `npm run preview` : sobe uma prévia local do build de produção.
- `npm run lint` : executa o lint do projeto.
- `npm run lint:fix` : executa o lint com correções automáticas.

## Estrutura do projeto

```text
src/
  App.tsx
  main.tsx
  index.css
  assets/
  components/
  hooks/
  pages/
  routes/
  services/
  styles/
  types/
  util/
    cn.ts
```

## Build de produção

```bash
npm run build
npm run preview
```

## Observações

- O plugin `@tailwindcss/vite` já está configurado em `vite.config.ts`.
- O projeto inicia com um exemplo simples em `src/App.tsx`.
- A função utilitária `cn` em `src/util/cn.ts` ajuda na composição de classes CSS.

## Próximos passos sugeridos

- Criar componentes e seções reais da landing em `src/components` e `src/pages`.
- Configurar roteamento em `src/routes` (se necessário).
- Integrar APIs em `src/services`.
