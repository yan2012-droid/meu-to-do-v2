# AuthContext

Este contexto gerencia a autenticação de usuários com Supabase.

## Funcionalidades

- Gerenciamento de estado de autenticação (usuário logado, estado de loading)
- Verificação de sessão atual ao iniciar o app
- Escuta de mudanças de sessão em tempo real
- Funções de logout e acesso ao usuário atual

## Estrutura

- `types.ts`: Tipos relacionados à autenticação
- `hooks/useAuth.ts`: Hook para acessar o contexto de autenticação
- `AuthContext.tsx`: Provedor de contexto de autenticação

## Dependências

- Supabase client já configurado em `src/integrations/supabase/client.ts`
- React Router para navegação