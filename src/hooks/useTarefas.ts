import { useQuery, useMutation, QueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const useTarefas = () => {
  const queryClient = new QueryClient();

  // Query for listing tarefas
  const { data: tarefas, isLoading, isError, error } = useQuery({
    queryKey: ["tarefas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("tarefas")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Mutation for creating a tarefa
  const createTarefa = useMutation({
    mutationFn: async (titulo: string) => {
      const { data, error } = await supabase        .from("tarefas")
        .insert({ titulo });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Tarefa criada com sucesso!");
      queryClient.invalidateQueries(["tarefas"]);
    },
    onError: (error) => {
      toast.error(`Erro ao criar tarefa: ${error.message}`);
    },
  });

  // Mutation for updating status
  const updateStatus = useMutation({
    mutationFn: async (id: string, status: string) => {
      const { data, error } = await supabase
        .from("tarefas")
        .update({ status })
        .eq("id", id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success(`Status atualizado para ${status}`);
      queryClient.invalidateQueries(["tarefas"]);
    },
    onError: (error) => {
      toast.error(`Erro ao atualizar status: ${error.message}`);
    },
  });

  // Mutation for deleting a tarefa
  const deleteTarefa = useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await supabase
        .from("tarefas")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      toast.success("Tarefa excluída com sucesso!");
      queryClient.invalidateQueries(["tarefas"]);
    },
    onError: (error) => {
      toast.error(`Erro ao excluir tarefa: ${error.message}`);
    },
  });

  return {
    tarefas,
    isLoading,
    isError,
    error,
    createTarefa,
    updateStatus,
    deleteTarefa,
  };
};