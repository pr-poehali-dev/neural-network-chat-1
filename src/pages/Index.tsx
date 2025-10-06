import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import ChatSection from "@/components/ChatSection";
import TrainingSection from "@/components/TrainingSection";
import HistorySection from "@/components/HistorySection";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Icon name="Brain" size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">AI Learning Platform</h1>
                <p className="text-xs text-muted-foreground">Обучи AI — создавай будущее</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Icon name="User" size={16} />
              Профиль
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="chat" className="gap-2">
              <Icon name="MessageSquare" size={16} />
              Чат
            </TabsTrigger>
            <TabsTrigger value="training" className="gap-2">
              <Icon name="Upload" size={16} />
              Обучение
            </TabsTrigger>
            <TabsTrigger value="history" className="gap-2">
              <Icon name="History" size={16} />
              История
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="animate-fade-in">
            <ChatSection />
          </TabsContent>

          <TabsContent value="training" className="animate-fade-in">
            <TrainingSection />
          </TabsContent>

          <TabsContent value="history" className="animate-fade-in">
            <HistorySection />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Index;
