export default function Garden({
  tasks,
  toggleTask,
  isEditMode,
  deleteTask,
  dayIndex,
  getDateStringForDayIndex,
  calculateStreak,
}) {
  const dateString = getDateStringForDayIndex(dayIndex);

  return (
    <div className="p-4 flex-1 flex flex-wrap gap-4 justify-center items-center">
      {tasks.map((task) => {
        const isCompleted = !!task.completed?.[dateString];
        const emoji = task.name.split(" ").pop();
        const streak = calculateStreak(task);

        return (
          <div
            key={task.id}
            onClick={() => !isEditMode && toggleTask(task.id)}
            className={`relative text-4xl p-3 bg-white/30 rounded-2xl shadow-md transition-all duration-300 ${
              isEditMode ? "cursor-default" : "cursor-pointer hover:scale-110"
            }`}
            title={task.name}
          >
            {isCompleted ? emoji : "🌱"}

            {streak > 1 && !isEditMode && (
              <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shadow-md">
                🔥{streak}
              </div>
            )}

            {isEditMode && (
              <button
                onClick={() => deleteTask(task.id)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm shadow-md hover:bg-red-600"
              >
                X
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}
