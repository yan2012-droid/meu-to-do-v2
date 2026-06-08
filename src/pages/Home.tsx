"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext/AuthContext";

const Home = () => {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Meu To Do
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Bem-vindo de volta!
          </p>
          
          {user && (
            <div className="inline-flex items-center space-x-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg px-6 py-3 border border-gray-200 dark:border-gray-700">
              <span className="text-gray-700 dark:text-gray-300">
                Email: <span className="font-medium">{user.email}</span>
              </span>
              <Button 
                onClick={handleLogout} 
                variant="outline"
                className="h-8"
              >
                Sair
              </Button>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Tarefas</CardTitle>
              <CardDescription>
                Gerencie suas tarefas diárias
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg mb-4"></div>
              <Button className="w-full">Ver Tarefas</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Projetos</CardTitle>
              <CardDescription>
                Organize seus projetos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-r from-green-500 to-teal-600 rounded-lg mb-4"></div>
              <Button className="w-full">Ver Projetos</Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg">Configurações</CardTitle>
              <CardDescription>
                Personalize sua experiência
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-r from-orange-500 to-red-600 rounded-lg mb-4"></div>
              <Button className="w-full">Acessar Configurações</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;