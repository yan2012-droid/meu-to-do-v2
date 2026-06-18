"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  titulo: z.string().min(1, "Título obrigatório"),
});

type FormData = z.infer<typeof schema>;

interface EditarTarefaDialogProps {
  tituloAtual: string;
  id: string;
  onSalvar: (novoTitulo: string) => Promise<void>;
}

export const EditarTarefaDialog: React.FC<EditarTarefaDialogProps> = ({
  tituloAtual,
  id,
  onSalvar,
}) => {
  const [etapa, setEtapa] = React.useState<"editar" | "confirmar">("editar");
  const [pendingTitulo, setPendingTitulo] = React.useState<string>(tituloAtual);
  const [loading, setLoading] = React.useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { titulo: tituloAtual },
  });

  const [open, setOpen] = React.useState(false);

  const iniciarConfirmacao = async (data: FormData) => {
    setPendingTitulo(data.titulo);
    setEtapa("confirmar");
  };

  const confirmarAlteracao = async () => {
    setLoading(true);
    try {
      await onSalvar(pendingTitulo);
      setEtapa("editar");
      setLoading(false);
      setOpen(false);
      reset({ titulo: pendingTitulo });
    } catch {
      setLoading(false);
    }
  };

  const voltarParaEdicao = () => setEtapa("editar");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Editar
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{etapa === "editar" ? "Editar tarefa" : "Confirmar alteração"}</DialogTitle>
        </DialogHeader>

        {etapa === "editar" ? (
          <form
            onSubmit={handleSubmit(iniciarConfirmacao)}
            className="space-y-4"
            onKeyPress={(e) => e.key === "Enter" && e.preventDefault()}
          >
            <div>
              <Input
                {...register("titulo")}
                placeholder="Novo título"
                disabled={loading}
              />
              {errors.titulo && (
                <p className="text-sm text-red-500 mt-1">{errors.titulo.message}</p>
              )}
            </div>

            <DialogFooter className="flex justify-end space-x-2">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)} disabled={loading}>
                Cancelar
              </Button>
              <Button type="submit" className="btn-primary" disabled={loading}>
                {loading ? "Continuar..." : "Avançar"}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className="space-y-4">
            <p className="text-sm">
              Tem certeza que deseja salvar essa alteração no título da tarefa?{" "}
              <strong>{pendingTitulo}</strong>
            </p>
            <DialogFooter className="flex justify-end space-x-2">
              <Button type="button" variant="ghost" onClick={voltarParaEdicao} disabled={loading}>
                Cancelar
              </Button>
              <Button type="button" className="btn-primary" onClick={confirmarAlteracao} disabled={loading}>
                {loading ? "Confirmando..." : "Confirmar"}
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};