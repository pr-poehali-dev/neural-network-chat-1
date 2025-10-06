import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

const TrainingSection = () => {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleYoutubeUpload = () => {
    if (!youtubeUrl.trim()) return;

    setIsProcessing(true);
    setTimeout(() => {
      toast({
        title: "Видео добавлено на обучение",
        description: "AI начал изучать материал из видео",
      });
      setYoutubeUrl("");
      setIsProcessing(false);
    }, 2000);
  };

  const handleFileUpload = (type: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      toast({
        title: `${type} загружен`,
        description: "AI начал анализ и обучение",
      });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-secondary to-primary p-6">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Icon name="Upload" size={24} />
            Обучение AI
          </h2>
          <p className="text-white/80 text-sm mt-1">
            Загружай материалы для обучения нейросети
          </p>
        </div>

        <div className="p-6">
          <Tabs defaultValue="youtube" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="youtube">
                <Icon name="Youtube" size={16} className="mr-2" />
                YouTube
              </TabsTrigger>
              <TabsTrigger value="video">
                <Icon name="Video" size={16} className="mr-2" />
                Видео
              </TabsTrigger>
              <TabsTrigger value="image">
                <Icon name="Image" size={16} className="mr-2" />
                Фото
              </TabsTrigger>
            </TabsList>

            <TabsContent value="youtube" className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="youtube-url">Ссылка на YouTube видео</Label>
                <div className="flex gap-2">
                  <Input
                    id="youtube-url"
                    placeholder="https://youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="flex-1"
                  />
                  <Button
                    onClick={handleYoutubeUpload}
                    disabled={isProcessing || !youtubeUrl.trim()}
                    className="gap-2"
                  >
                    {isProcessing ? (
                      <>
                        <Icon name="Loader2" size={16} className="animate-spin" />
                        Обработка
                      </>
                    ) : (
                      <>
                        <Icon name="Download" size={16} />
                        Загрузить
                      </>
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  AI изучит видео, субтитры и визуальный контент
                </p>
              </div>

              <div className="mt-6 p-4 bg-accent/50 rounded-lg">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={20} className="text-primary mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm mb-1">Что изучит AI:</h4>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      <li>• Содержание и контекст видео</li>
                      <li>• Речь и субтитры</li>
                      <li>• Визуальные элементы и демонстрации</li>
                      <li>• Ключевые концепции и идеи</li>
                    </ul>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="video" className="space-y-4 mt-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Icon name="Upload" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">Загрузи видео файл</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Поддерживаются форматы: MP4, AVI, MOV, WebM
                </p>
                <Button onClick={() => handleFileUpload("Видео")} variant="outline">
                  <Icon name="FolderOpen" size={16} className="mr-2" />
                  Выбрать файл
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="image" className="space-y-4 mt-6">
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Icon name="ImagePlus" size={48} className="mx-auto text-muted-foreground mb-4" />
                <h3 className="font-medium mb-2">Загрузи изображения</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Поддерживаются форматы: JPG, PNG, GIF, WebP
                </p>
                <Button onClick={() => handleFileUpload("Изображение")} variant="outline">
                  <Icon name="FolderOpen" size={16} className="mr-2" />
                  Выбрать файлы
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default TrainingSection;
