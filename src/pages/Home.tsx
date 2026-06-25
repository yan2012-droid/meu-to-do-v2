"use client";

import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useTarefas } from "@/hooks/useTarefas";
import { Layout } from "@/components/Layout";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { TarefaForm } from "@/components/TarefaForm";
import { TarefaList } from "@/components/TarefaList";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { ConfirmarRestauracaoDialog } from "@/components/ConfirmarRestauracaoDialog";

const Home = () => {
  const { logout } = useAuth();
  const { tarefasExcluidas, restaurarTarefa } = useTarefas();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="tarefas" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger
              value="tarefas"
              className="border-b-2 border-transparent data-[state=active]:border-green-600"
            >
              Tarefas
            </TabsTrigger>
            <TabsTrigger
              value="lixeira"
              className="border-b-2 border-transparent data-[state=active]:border-green-600"
            >
              Lixeira
            </TabsTrigger>
          </TabsList>

          <TabsContent value="tarefas">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-6xl font-bold text-blue-900 mb-4">
                Meu To Do
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Bem-vindo de volta!
              </p>
            </div>
            <div className="flex flex-col items-center w-full gap-6 max-w-2xl mx-auto">
              <TarefaForm />
              <TarefaList />
            </div>
          </TabsContent>

          <TabsContent value="lixeira">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-green-700 dark:text-green-200 mb-4">
                Lixeira
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {tarefasExcluidas.map((tarefa) => (
                <div key={tarefa.id} className="bg-white shadow rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <h3 className="font-medium text-lg">{tarefa.titulo}</h3>
                  <p className="text-gray-500 text-sm mt-1">
                    Excluída em {new Date(tarefa.excluida_em!).toLocaleString("pt-BR")}
                  </p>

                  <ConfirmarRestauracaoDialog
                    titulo={tarefa.titulo}
                    onConfirm={() => restaurarTarefa(tarefa.id)}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="mt-8">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="h-8 text-sm border-green-600 hover:border-green-700 hover:text-green-700"
          >
            Sair
          </Button>
        </div>
        <MadeWithDyad />
      </div>
    </Layout>
  );
};

export default Home;