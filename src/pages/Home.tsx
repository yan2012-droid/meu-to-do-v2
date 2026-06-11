"use client";

import { useAuth } from "@/contexts/AuthContext/AuthContext";
import { useTarefas } from "@/hooks/useTarefas";
import { Layout } from "@/components/Layout";
import { MadeWithDyad } from "@/components/made-with-dyad";
import { Button } from "@/components/ui/button";
import { TarefaForm } from "@/components/TarefaForm";
import { TarefaList } from "@/components/TarefaList";

const Home = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Meu To Do
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Bem-vindo de volta!
          </p>
        </div>
        <div className="flex flex-col md:flex-row">
          <TarefaForm />
          <TarefaList />
        </div>
        <div className="mt-8">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="h-8 text-sm"
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