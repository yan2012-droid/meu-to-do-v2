import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTarefas } from "@/hooks/useTarefas";

/** Badge colorido do status da tarefa. */
const StatusBadge = ({ status }: { status: string }) => {
  const config: Record<string, { label: string; classes: string }> = {
    pendente: { label: "Pendente", classes: "bg-gray-200 text-gray-800" },
    em_andamento: { label: "Em Andamento", classes: "bg-yellow-200 text-yellow-800" },
    concluida: { label: "Concluída", classes: "bg-green-200 text-green-800" },
  };

  const { label, classes } = config[status] ?? {
    label: status,
    classes: "bg-gray-200 text-gray-800",
  };

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

interface Tarefa {
  id: string;
  titulo: string;
  status: string;
  created_at: string;
}

/** Um item da lista de tarefas: título, status, seletor de status e excluir. */
export const TarefaItem = ({ tarefa }: { tarefa: Tarefa }) => {
  const { updateStatus, deleteTarefa } = useTarefas();

  return (
    <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center">
        <div className="flex-1">
          <h3 className="font-medium text-lg">{tarefa.titulo}</h3>
          <StatusBadge status={tarefa.status} />
          <p className="text-gray-500 text-sm mt-1">
            {new Date(tarefa.created_at).toLocaleDateString("pt-BR")}
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <Select
            value={tarefa.status}
            onValueChange={(novoStatus) => updateStatus(tarefa.id, novoStatus)}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pendente">Pendente</SelectItem>
              <SelectItem value="em_andamento">Em andamento</SelectItem>
              <SelectItem value="concluida">Concluída</SelectItem>
            </SelectContent>
          </Select>
          <Button
            onClick={() => deleteTarefa(tarefa.id)}
            variant="destructive"
            className="h-8 text-sm"
          >
            Excluir
          </Button>
        </div>
      </div>
    </div>
  );
};