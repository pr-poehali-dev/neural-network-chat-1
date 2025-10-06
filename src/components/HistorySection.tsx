import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";

interface TrainingItem {
  id: string;
  type: "youtube" | "video" | "image";
  title: string;
  date: Date;
  status: "completed" | "processing";
  itemsCount?: number;
}

const mockHistory: TrainingItem[] = [
  {
    id: "1",
    type: "youtube",
    title: "React Tutorial for Beginners",
    date: new Date(2024, 9, 5),
    status: "completed",
  },
  {
    id: "2",
    type: "video",
    title: "Product Demo Recording",
    date: new Date(2024, 9, 4),
    status: "completed",
  },
  {
    id: "3",
    type: "image",
    title: "Design Screenshots",
    date: new Date(2024, 9, 3),
    status: "completed",
    itemsCount: 12,
  },
  {
    id: "4",
    type: "youtube",
    title: "Advanced TypeScript Patterns",
    date: new Date(2024, 9, 2),
    status: "processing",
  },
];

const HistorySection = () => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "youtube":
        return "Youtube";
      case "video":
        return "Video";
      case "image":
        return "Image";
      default:
        return "FileText";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "youtube":
        return "bg-red-500";
      case "video":
        return "bg-blue-500";
      case "image":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary/90 to-secondary/90 p-6">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Icon name="History" size={24} />
            История обучения
          </h2>
          <p className="text-white/80 text-sm mt-1">
            Все материалы, которые изучил AI
          </p>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Icon name="Database" size={18} className="text-muted-foreground" />
              <span className="text-sm font-medium">
                Всего материалов: {mockHistory.length}
              </span>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Icon name="Filter" size={16} />
              Фильтр
            </Button>
          </div>

          <ScrollArea className="h-[500px]">
            <div className="space-y-3">
              {mockHistory.map((item) => (
                <Card
                  key={item.id}
                  className="p-4 hover:shadow-md transition-all cursor-pointer border-l-4 animate-scale-in"
                  style={{
                    borderLeftColor:
                      item.type === "youtube"
                        ? "#ef4444"
                        : item.type === "video"
                        ? "#3b82f6"
                        : "#22c55e",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`w-12 h-12 rounded-lg ${getTypeColor(
                        item.type
                      )} flex items-center justify-center flex-shrink-0`}
                    >
                      <Icon
                        name={getTypeIcon(item.type)}
                        size={24}
                        className="text-white"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-medium text-sm leading-tight">
                          {item.title}
                        </h3>
                        {item.status === "processing" ? (
                          <Badge variant="outline" className="flex-shrink-0">
                            <Icon
                              name="Loader2"
                              size={12}
                              className="mr-1 animate-spin"
                            />
                            Обработка
                          </Badge>
                        ) : (
                          <Badge className="flex-shrink-0 bg-green-500 hover:bg-green-600">
                            <Icon name="CheckCircle" size={12} className="mr-1" />
                            Изучено
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Icon name="Calendar" size={12} />
                          {item.date.toLocaleDateString("ru-RU")}
                        </div>
                        {item.itemsCount && (
                          <div className="flex items-center gap-1">
                            <Icon name="Files" size={12} />
                            {item.itemsCount} файлов
                          </div>
                        )}
                      </div>
                    </div>

                    <Button variant="ghost" size="icon" className="flex-shrink-0">
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-6 p-4 bg-accent/30 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Brain" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-sm">AI обучен на всех материалах</h4>
                <p className="text-xs text-muted-foreground">
                  Можешь использовать полученные знания в чате
                </p>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default HistorySection;
