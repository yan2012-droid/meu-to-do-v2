import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTarefas } from "@/hooks/useTarefas";
import { cn } from "@/lib/utils";
import { Button, Label, Input } from "@/components/ui";

const TarefaForm = () => {
  const { createTarefa } = useTarefas();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(z.object({
      titulo: z.string().min(1, "Título deve ter pelo menos 1 caractere"),
    })),
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
          value={undefined}
          onChange={(e) => {
            // controlled by register, no local state needed
          }}
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

export default TarefaForm;