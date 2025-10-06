import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import Icon from "@/components/ui/icon";
import CodePreviewDialog from "@/components/CodePreviewDialog";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  hasApp?: boolean;
  appData?: {
    code: {
      html: string;
      css: string;
      js: string;
    };
    preview: string;
  };
}

const ChatSection = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Привет! Я AI-ассистент, готовый помочь тебе. Я уже изучил материалы, которые ты загрузил, и могу создавать веб-приложения, файлы и отвечать на вопросы. Чем могу помочь?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [currentApp, setCurrentApp] = useState<Message['appData'] | null>(null);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const isAppRequest = inputValue.toLowerCase().includes("создай") || 
                           inputValue.toLowerCase().includes("сделай") ||
                           inputValue.toLowerCase().includes("приложение");
      
      let aiMessage: Message;
      
      if (isAppRequest) {
        const appData = {
          code: {
            html: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>To-Do App</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="container">
    <h1>Мои задачи</h1>
    <div class="input-group">
      <input type="text" id="taskInput" placeholder="Добавить новую задачу...">
      <button onclick="addTask()">Добавить</button>
    </div>
    <ul id="taskList"></ul>
  </div>
  <script src="script.js"></script>
</body>
</html>`,
            css: `* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.container {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 20px 60px rgba(0,0,0,0.3);
  max-width: 500px;
  width: 100%;
}

h1 {
  color: #667eea;
  margin-bottom: 24px;
  font-size: 28px;
}

.input-group {
  display: flex;
  gap: 8px;
  margin-bottom: 24px;
}

input {
  flex: 1;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  transition: all 0.2s;
}

input:focus {
  outline: none;
  border-color: #667eea;
}

button {
  padding: 12px 24px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
}

button:hover {
  background: #5568d3;
  transform: translateY(-2px);
}

#taskList {
  list-style: none;
}

.task-item {
  background: #f9fafb;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation: slideIn 0.3s ease;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.task-item.completed {
  opacity: 0.6;
  text-decoration: line-through;
}

.task-actions {
  display: flex;
  gap: 8px;
}

.task-actions button {
  padding: 6px 12px;
  font-size: 12px;
}`,
            js: `let tasks = [];

function addTask() {
  const input = document.getElementById('taskInput');
  const taskText = input.value.trim();
  
  if (taskText === '') return;
  
  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };
  
  tasks.push(task);
  input.value = '';
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map(task => 
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';
  
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.className = \`task-item \${task.completed ? 'completed' : ''}\`;
    li.innerHTML = \`
      <span>\${task.text}</span>
      <div class="task-actions">
        <button onclick="toggleTask(\${task.id})">\${task.completed ? 'Вернуть' : 'Готово'}</button>
        <button onclick="deleteTask(\${task.id})">Удалить</button>
      </div>
    \`;
    taskList.appendChild(li);
  });
}

document.getElementById('taskInput').addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});`,
          },
          preview: `<div style="font-family: 'Inter', sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 400px; display: flex; align-items: center; justify-content: center; padding: 20px;">
            <div style="background: white; border-radius: 16px; padding: 32px; max-width: 500px; width: 100%;">
              <h1 style="color: #667eea; margin-bottom: 24px; font-size: 28px;">Мои задачи</h1>
              <div style="display: flex; gap: 8px; margin-bottom: 24px;">
                <input type="text" placeholder="Добавить новую задачу..." style="flex: 1; padding: 12px 16px; border: 2px solid #e5e7eb; border-radius: 8px; font-size: 14px;">
                <button style="padding: 12px 24px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 500;">Добавить</button>
              </div>
              <div style="background: #f9fafb; padding: 16px; border-radius: 8px; margin-bottom: 8px; display: flex; align-items: center; justify-content: space-between;">
                <span>Пример задачи</span>
                <div style="display: flex; gap: 8px;">
                  <button style="padding: 6px 12px; font-size: 12px; background: #667eea; color: white; border: none; border-radius: 8px;">Готово</button>
                  <button style="padding: 6px 12px; font-size: 12px; background: #667eea; color: white; border: none; border-radius: 8px;">Удалить</button>
                </div>
              </div>
            </div>
          </div>`,
        };
        
        aiMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Я создал для тебя To-Do приложение на основе изученных материалов! Оно включает HTML, CSS и JavaScript. Посмотри предпросмотр и код ниже.",
          timestamp: new Date(),
          hasApp: true,
          appData,
        };
      } else {
        aiMessage = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "Отличный вопрос! На основе изученных материалов, я могу создать для тебя веб-приложение. Просто скажи что именно создать, например: 'Создай калькулятор' или 'Сделай форму обратной связи'.",
          timestamp: new Date(),
        };
      }
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="border-0 shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-primary to-secondary p-6">
          <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
            <Icon name="MessageSquare" size={24} />
            Чат с AI
          </h2>
          <p className="text-white/80 text-sm mt-1">
            Общайся с обученной нейросетью
          </p>
        </div>

        <ScrollArea className="h-[500px] p-6">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 animate-scale-in ${
                  message.role === "user" ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.role === "assistant"
                      ? "bg-gradient-to-br from-primary to-secondary"
                      : "bg-muted"
                  }`}
                >
                  <Icon
                    name={message.role === "assistant" ? "Brain" : "User"}
                    size={16}
                    className={
                      message.role === "assistant"
                        ? "text-white"
                        : "text-muted-foreground"
                    }
                  />
                </div>
                <div
                  className={`flex-1 max-w-[80%] ${
                    message.role === "user" ? "text-right" : ""
                  }`}
                >
                  <div
                    className={`inline-block p-4 rounded-2xl ${
                      message.role === "assistant"
                        ? "bg-accent text-accent-foreground"
                        : "bg-primary text-primary-foreground"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.content}</p>
                    {message.hasApp && message.appData && (
                      <div className="mt-3 pt-3 border-t border-primary/10">
                        <Button
                          size="sm"
                          variant="outline"
                          className="gap-2 w-full"
                          onClick={() => {
                            setCurrentApp(message.appData || null);
                            setPreviewOpen(true);
                          }}
                        >
                          <Icon name="Code" size={14} />
                          Открыть код и предпросмотр
                        </Button>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1 px-1">
                    {message.timestamp.toLocaleTimeString("ru-RU", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 animate-scale-in">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                  <Icon name="Brain" size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="inline-block p-4 rounded-2xl bg-accent">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t border-border p-4 bg-muted/30">
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="flex-shrink-0">
              <Icon name="Paperclip" size={18} />
            </Button>
            <Input
              placeholder="Напиши сообщение..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              className="flex-1"
            />
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="flex-shrink-0 gap-2"
            >
              <Icon name="Send" size={18} />
              Отправить
            </Button>
          </div>
        </div>
      </Card>

      {currentApp && (
        <CodePreviewDialog
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          code={currentApp.code}
          preview={currentApp.preview}
        />
      )}
    </div>
  );
};

export default ChatSection;
