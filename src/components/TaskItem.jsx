import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function TaskItem({ task, isCompleted, onToggle, onShowReminder, taskType }) {
  const colorClass = taskType === 'daily' ? 'purple' : 'pink';

  return (
    <div className={`transform transition-all duration-300 ${isCompleted ? 'scale-98 opacity-80' : 'scale-100 opacity-100'}`}>
      <Card className={`bg-white/90 backdrop-blur-xl border-0 rounded-2xl shadow-md transition-all duration-300 ${isCompleted ? `bg-gradient-to-r from-${colorClass}-50 to-pink-50` : 'hover:shadow-lg'}`}>
        <CardContent className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3 flex-1">
            <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isCompleted ? `bg-${colorClass}-400` : 'bg-gray-300'}`}></div>
            <span className={`font-medium transition-all duration-300 ${isCompleted ? `text-${colorClass}-700 line-through` : 'text-gray-800'}`}>
              {task.name}
            </span>
            {taskType === 'weekly' && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                weekly
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onShowReminder(task)}
              className={`text-${colorClass}-400 hover:text-${colorClass}-600 text-lg`}
              title="Get reminder"
            >
              💬
            </button>
            <Switch
              checked={isCompleted}
              onCheckedChange={() => onToggle(task.id)}
              className={`data-[state=checked]:bg-${colorClass}-500`}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}