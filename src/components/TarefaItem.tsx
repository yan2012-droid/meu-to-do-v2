import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTarefas } from "@/hooks/useTarefas";
import { EditarTarefaDialog } from "./EditarTarefaDialog";
import { ExcluirTarefaDialog } from "./ExcluirTarefaDialog";

const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    pendente: {
      label: "Pendente",
      classes: "bg-gray-200 text-gray-800",
    },
    em_andamento: {
      label: "Em Andamento",
      classes: "bg-yellow-200 text-yellow-800",
    },
    concluida: { label: "Concluída", classes: "bg-green-200 text-green-800" },
  };
  const { label, classes } = config[status] || {};
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
        classes
      )}
    >
      {label}
    </span>
  );
};

export const TarefaItem = ({ tarefa }: { tarefa: any }) => {
  const { updateStatus, deleteTarefa, updateTitulo } = useTarefas();

  const handleStatusChange = async (novoStatus: string) => {
    await updateStatus(tarefa.id, novoStatus);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow border-l-4 border-green-200">
      <div className="flex items-center">
        <div className="flex-1">
          <h3 className="font-medium text-lg">{tarefa.titulo}</h3>
          <StatusBadge status={tarefa.status} />
          <p className="text-gray-500 text-sm mt-1">
            {new Date(tarefa.created_at).toLocaleDateString("pt-BR")}
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={tarefa.status} onValueChange={handleStatusChange}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="em_andamento">Em andamento</SelectItem>
              <SelectItem value="concluida">Concluída</SelectItem>
            </SelectContent>
          </Select>
          <EditarTarefaDialog
            tituloAtual={tarefa.titulo}
            id={tarefa.id}
            onSalvar={(novo: string) => updateTitulo(tarefa.id, novo)}
          />
          <ExcluirTarefaDialog titulo={tarefa.titulo} onConfirm={() => deleteTarefa(tarefa.id)} />
        </div>
      </div>
    </div>
  );
};