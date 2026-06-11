import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";
import { Option } from "@/components/ui/select";
import { toast } from "sonner";
import { useTarefas } from "@/hooks/useTarefas";

const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    pendente: { label: "Pendente", classes: "bg-gray-200 text-gray-800" },
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
  const { updateStatus, deleteTarefa } = useTarefas();

  const handleStatusChange = async (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    await updateStatus(tarefa.id, event.target.value);
  };

  const handleDelete = async () => {
    await deleteTarefa(tarefa.id);
  };

  return (
    <div className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-center">
        <div className="flex-1">
          <h3 className="font-medium text-lg">{tarefa.titulo}</h3>
          <StatusBadge status={tarefa.status} />
          <p className="text-gray-500">{tarefa.created_at}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select
            value={tarefa.status}
            onChange={handleStatusChange}
            className="h-10 px-3 py-1 rounded-md"
          >
            <Option value="pendente">Pendente</Option>
            <Option value="em_andamento">Em Andamento</Option>
            <Option value="concluida">Concluída</Option>
          </Select>
          <Button
            onClick={handleDelete}
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