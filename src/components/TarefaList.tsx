import { useTarefas } from "@/hooks/useTarefas";
import { cn } from "@/lib/utils";

const TarefaList = () => {
  const { tarefas, isLoading, isError, error } = useTarefas();

  if (isLoading) return <div className="flex items-center justify-center h-16">Carregando...</div>;
  if (isError) return <div className="text-center text-red-500">Erro: {error.message}</div>;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {tarefas.length === 0 ? (
        <div className="text-center text-gray-600 mb-8">
          Nenhuma tarefa ainda. Crie a primeira!
        </div>
      ) : (
        tarefas.map((tarefa) => (
          <TarefaItem key={tarefa.id} tarefa={tarefa} />
        ))
      )}
    </div>
  );
};

export default TarefaList;