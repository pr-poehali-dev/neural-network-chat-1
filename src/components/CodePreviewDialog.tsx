import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface CodePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  code: {
    html: string;
    css: string;
    js: string;
  };
  preview: string;
}

const CodePreviewDialog = ({
  open,
  onOpenChange,
  code,
  preview,
}: CodePreviewDialogProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyCode = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Скопировано!",
      description: `${type} код скопирован в буфер обмена`,
    });
  };

  const downloadFile = (content: string, filename: string) => {
    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({
      title: "Файл загружен!",
      description: `${filename} сохранён на устройство`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl h-[80vh] flex flex-col p-0">
        <DialogHeader className="px-6 py-4 border-b">
          <DialogTitle className="flex items-center gap-2">
            <Icon name="Code" size={20} />
            Сгенерированное приложение
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <Tabs defaultValue="preview" className="h-full flex flex-col">
            <TabsList className="mx-6 mt-4 w-fit">
              <TabsTrigger value="preview" className="gap-2">
                <Icon name="Eye" size={16} />
                Предпросмотр
              </TabsTrigger>
              <TabsTrigger value="html" className="gap-2">
                <Icon name="FileCode" size={16} />
                HTML
              </TabsTrigger>
              <TabsTrigger value="css" className="gap-2">
                <Icon name="Palette" size={16} />
                CSS
              </TabsTrigger>
              <TabsTrigger value="js" className="gap-2">
                <Icon name="Braces" size={16} />
                JavaScript
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden px-6 pb-6">
              <TabsContent value="preview" className="h-full mt-4">
                <div className="h-full border rounded-lg bg-white overflow-hidden">
                  <div
                    className="h-full p-8"
                    dangerouslySetInnerHTML={{ __html: preview }}
                  />
                </div>
              </TabsContent>

              <TabsContent value="html" className="h-full mt-4">
                <div className="h-full relative">
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 z-10 gap-2"
                    onClick={() => copyCode(code.html, "HTML")}
                  >
                    <Icon name={copied ? "Check" : "Copy"} size={14} />
                    {copied ? "Скопировано" : "Копировать"}
                  </Button>
                  <ScrollArea className="h-full border rounded-lg">
                    <pre className="p-4 text-xs">
                      <code>{code.html}</code>
                    </pre>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="css" className="h-full mt-4">
                <div className="h-full relative">
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 z-10 gap-2"
                    onClick={() => copyCode(code.css, "CSS")}
                  >
                    <Icon name={copied ? "Check" : "Copy"} size={14} />
                    {copied ? "Скопировано" : "Копировать"}
                  </Button>
                  <ScrollArea className="h-full border rounded-lg">
                    <pre className="p-4 text-xs">
                      <code>{code.css}</code>
                    </pre>
                  </ScrollArea>
                </div>
              </TabsContent>

              <TabsContent value="js" className="h-full mt-4">
                <div className="h-full relative">
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2 z-10 gap-2"
                    onClick={() => copyCode(code.js, "JavaScript")}
                  >
                    <Icon name={copied ? "Check" : "Copy"} size={14} />
                    {copied ? "Скопировано" : "Копировать"}
                  </Button>
                  <ScrollArea className="h-full border rounded-lg">
                    <pre className="p-4 text-xs">
                      <code>{code.js}</code>
                    </pre>
                  </ScrollArea>
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="border-t p-4 flex items-center justify-between bg-muted/30">
          <p className="text-sm text-muted-foreground">
            Код готов к использованию
          </p>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Закрыть
            </Button>
            <Button 
              className="gap-2"
              onClick={() => {
                downloadFile(code.html, "index.html");
                downloadFile(code.css, "style.css");
                downloadFile(code.js, "script.js");
              }}
            >
              <Icon name="Download" size={16} />
              Скачать файлы
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodePreviewDialog;