import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTarefas } from "@/hooks/useTarefas";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const tarefaSchema = z.object({
  titulo: z.string().min(1, "Título deve ter pelo menos 1 caractere"),
});

type TarefaFormData = z.infer<typeof tarefaSchema>;

/** Formulário de criação de tarefa: campo título + botão Adicionar. */
export const TarefaForm = () => {
  const { createTarefa } = useTarefas();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TarefaFormData>({
    resolver: zodResolver(tarefaSchema),
    defaultValues: { titulo: "" },
  });

  const onSubmit = async (data: TarefaFormData) => {
    await createTarefa(data.titulo);
    reset(); // limpa o campo após adicionar
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 flex-shrink-0 w-full max-w-md">
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
      <Button type="submit" className="w-full btn-primary" disabled={isSubmitting}>
        {isSubmitting ? "Adicionando..." : "Adicionar"}
      </Button>
    </form>
  );
};