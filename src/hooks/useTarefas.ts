import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Tarefa {
  id: string;
  user_id: string;
  titulo: string;
  status: string;
  created_at: string;
  excluida_em: string | null;
}

/**
 * Centraliza a lógica de tarefas: listagem, criação,
 * atualização de status, edição de título, soft‑delete, restauração
 * e consulta de itens excluídos.
 * O RLS do Supabase garante que cada usuário só acessa as próprias tarefas.
 */
export const useTarefas = () => {
  const queryClient = useQueryClient();

  /* ===================== LISTA ATIVA ===================== */
  const {
    data: tarefas = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["tarefas"],
    queryFn: async (): Promise<Tarefa[]> => {
      const { data, error } = await supabase
        .from("tarefas")
        .select("*")
        .is("excluida_em", null)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data ?? [];
    },
  });

  /* ===================== LISTA EXCLUÍDA ===================== */
  const {
    data: tarefasExcluidas = [],
    isLoading: isLoadingExcluidas,
    isError: isErrorExcluidas,
    error: errorExcluidas,
  } = useQuery({
    queryKey: ["tarefas-excluidas"],
    queryFn: async (): Promise<Tarefa[]> => {
      const { data, error } = await supabase
        .from("tarefas")
        .select("*")
        .not("excluida_em", "is", null)
        .order("created_at", { ascending: false });
      if (error) throw new Error(error.message);
      return data ?? [];
    },
  });

  /* ===================== CRIAÇÃO ===================== */
  const createMutation = useMutation({
    mutationFn: async (titulo: string) => {
      const { error } = await supabase.from("tarefas").insert({ titulo });
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      toast.success("Tarefa criada com sucesso!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao criar tarefa: ${error.message}`);
    },
  });

  /* ===================== STATUS ===================== */
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase
        .from("tarefas")
        .update({ status })
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      toast.success("Status atualizado!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar status: ${error.message}`);
    },
  });

  /* ===================== EDITAR TITULO ===================== */
  const updateTituloMutation = useMutation({
    mutationFn: async ({ id, titulo }: { id: string; titulo: string }) => {
      const { error } = await supabase
        .from("tarefas")
        .update({ titulo })
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      toast.success("Título atualizado!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao atualizar título: ${error.message}`);
    },
  });

  /* ===================== SOFT DELETE ===================== */
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("tarefas")
        .update({ excluida_em: new Date().toISOString() })
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      queryClient.invalidateQueries({ queryKey: ["tarefas-excluidas"] });
      toast.success("Tarefa excluída!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao excluir tarefa: ${error.message}`);
    },
  });

  /* ===================== RESTAURAR ===================== */
  const restoreMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("tarefas")
        .update({ excluida_em: null })
        .eq("id", id);
      if (error) throw new Error(error.message);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tarefas"] });
      queryClient.invalidateQueries({ queryKey: ["tarefas-excluidas"] });
      toast.success("Tarefa restaurada!");
    },
    onError: (error: Error) => {
      toast.error(`Erro ao restaurar tarefa: ${error.message}`);
    },
  });

  return {
    tarefas,
    tarefasExcluidas,
    isLoading,
    isError,
    error,
    isLoadingExcluidas,
    isErrorExcluidas,
    errorExcluidas,
    createTarefa: (titulo: string) => createMutation.mutateAsync(titulo),
    updateStatus: (id: string, status: string) =>
      updateStatusMutation.mutateAsync({ id, status }),
    updateTitulo: (id: string, titulo: string) =>
      updateTituloMutation.mutateAsync({ id, titulo }),
    deleteTarefa: (id: string) => deleteMutation.mutateAsync(id),
    restaurarTarefa: (id: string) => restoreMutation.mutateAsync(id),
  };
};