# AI Rules

> Lido automaticamente pelo Dyad a cada prompt. Mantenha este arquivo **curto e direto** — regras longas diluem as importantes.
> Detalhes de arquitetura estão em `docs/frontend.md`, `docs/backend.md` e nos `README.md` de cada contexto em `src/contexts/`.

---

## Projeto

- React + TypeScript + Vite + Supabase. Stack completa em `docs/frontend.md`.
- Página principal: `src/pages/Index.tsx` — **sempre atualizar** ao adicionar componentes visíveis.
- Rotas: todas em `src/App.tsx`, nunca em outros arquivos.
- Código-fonte: somente dentro de `src/`.

---

## Consulta aos Guias de Boas Práticas

Ao receber qualquer tarefa, a IA DEVE seguir esta ordem recomendada de leitura:

### Ordem recomendada de leitura:
1. **AI_RULES.md** (este arquivo)
2. **src/contexts/<nome>/README.md** do contexto afetado (se existir)
3. **docs/frontend.md** → seções relevantes de front-end
4. **docs/backend.md** → seções relevantes de back-end

### Guia de Práticas Front-end (`docs/frontend.md`)
- React + TypeScript + Vite + Tailwind CSS
- Componentes shadcn/ui (não editar `src/components/ui/`)
- TanStack Query para dados
- React Hook Form + Zod para formulários
- Supabase Auth
- Ícones: lucide-react
- Notificações: sonner
- Roteamento: React Router

### Guia de Práticas Back-end (`docs/backend.md`)
- PostgreSQL com Supabase
- RLS (Row Level Security)
- RPC (Remote Procedure Calls)
- Views, triggers e migrations
- Segurança de dados

### Procedimento para qualquer tarefa:
1. Leia este `AI_RULES.md` primeiro
2. Identifique o contexto funcional em `src/contexts/<nome>/`
3. Se o contexto não existir, crie a estrutura inicial completa com `README.md`
4. Leia o `README.md` do contexto relevante
5. Consulte o **Índice Operacional para IA** em `docs/frontend.md` ou `docs/backend.md`
6. Leia APENAS a seção relevante necessária para a tarefa
7. **NUNCA** altere `docs/frontend.md` ou `docs/backend.md` — apenas referencie

---

## Regras de Código

- TypeScript estrito — sem `any`. Sem `object` em props. Use tipos específicos.
- Componentes: máx. **150 linhas**. Acima disso, extrair hook → subcomponente → types.
- Pages: máx. **120 linhas**, apenas composição — sem lógica.
- Hooks: máx. **120 linhas**.
- JSDoc obrigatório em todo componente, hook e função utilitária.
- Comentários explicam o *porquê*, nunca o óbvio.
- Named exports para componentes de feature. Default export só em pages.
- Imports absolutos com alias `@/`.
- Sem `console.log`. Sem código comentado morto.

---

## Contextos — Arquitetura do Projeto

O projeto é dividido em contextos funcionais em `src/contexts/<nome>/`. Cada contexto tem:
- `README.md` — arquitetura, tabelas usadas, decisões técnicas. **Sempre atualizar após mudanças.**
- `components/`, `hooks/`, `services/`, `<nome>.types.ts`

**Regra obrigatória:** ao criar um novo contexto em `src/contexts/<nome>/`, criar também o `README.md` desse contexto no mesmo commit.

---

## Segurança & Git

- `.env` **nunca commitado**. Está no `.gitignore`. Versionar apenas `.env.example`.
- Nunca expor `service_role` key no front-end. Apenas `anon` key.
- Supabase client: somente `src/integrations/supabase/client.ts`.
- Nunca commitar direto na `main`. Branches: `feature/*`, `fix/*`, `release/*`.

---

## Versionamento

- O Dyad versiona automaticamente cada edição via git. Use o painel de versões para reverter.
- Releases públicos: SemVer em `package.json` + tag git + entrada no `CHANGELOG.md`.

---

## Arquivos Protegidos — Não modificar sem confirmação

- `src/components/ui/*` — componentes shadcn/ui
- `src/integrations/supabase/client.ts` — cliente Supabase
- `supabase/migrations/*` — nunca alterar migrations existentes, apenas criar novas
- `.env` — nunca tocar