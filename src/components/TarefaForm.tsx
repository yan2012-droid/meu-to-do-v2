import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTarefas } from "@/hooks/useTarefas";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const TarefaForm = () => {
  const { createTarefa } = useTarefas();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(
      z.object({
        titulo: z.string().min(1, "Título deve ter pelo menos 1 caractere"),
      })
    ),
  });

  const onSubmit = async (data: { titulo: string }) => {
    await createTarefa(data.titulo);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="titulo">Título</Label>
        <Input
          id="titulo"
          type="text"
          placeholder="Digite o título da tarefa"
          {...register("titulo")}
        />
        {errors.titulo && (
          <p className="text-red-500 text-sm">{errors.titulo.message}</p>
        )}
      </div>
      <Button type="submit" className="w-full">
        {createTarefa.isLoading ? "Adicionando..." : "Adicionar"}
      </Button>
    </form>
  );
};