import TaskItem from './TaskItem';

export default function TaskList({ 
  weekData, 
  dayIndex, 
  getDailyTasks, 
  getWeeklyTasks, 
  toggleTask, 
  showRandomReminder, 
  countCompleted, 
  getTotalTasks 
}) {
  const dailyTasks = getDailyTasks();
  const weeklyTasks = getWeeklyTasks();

  return (
    <div className="px-4 flex-1 pb-40">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-purple-800">Daily Habits ☀️</h2>
          <span className="text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
            {countCompleted(dayIndex, 'daily')}/{getTotalTasks('daily')}
          </span>
        </div>
        <div className="space-y-3">
          {dailyTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isCompleted={weekData[dayIndex]?.[task.id]}
              onToggle={toggleTask}
              onShowReminder={showRandomReminder}
              taskType="daily"
            />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-pink-800">Weekly Goals 🎯</h2>
          <span className="text-sm text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
            {countCompleted(dayIndex, 'weekly')}/{getTotalTasks('weekly')}
          </span>
        </div>
        <div className="space-y-3">
          {weeklyTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              isCompleted={weekData[dayIndex]?.[task.id]}
              onToggle={toggleTask}
              onShowReminder={showRandomReminder}
              taskType="weekly"
            />
          ))}
        </div>
      </div>
    </div>
  );
}