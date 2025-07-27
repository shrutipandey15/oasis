import GardenPlant from './GardenPlant';

export default function Garden({ tasks, toggleTask, isEditMode, deleteTask, dayIndex, getDateStringForDayIndex, calculateStreak }) {
  const dateString = getDateStringForDayIndex(dayIndex);

  return (
    <div className="p-4 flex-1 flex flex-wrap gap-x-6 gap-y-8 justify-center items-end">
      {tasks.map(task => {
        const isCompleted = !!task.completed?.[dateString];
        const streak = calculateStreak(task);

        return (
          <GardenPlant
            key={task.id}
            task={task}
            isCompleted={isCompleted}
            streak={streak}
            isEditMode={isEditMode}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        );
      })}
    </div>
  );
}