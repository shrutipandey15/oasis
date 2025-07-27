export default function GardenPlant({ task, isCompleted, streak, isEditMode, onToggle, onDelete }) {
  const emoji = task.name.split(' ').pop();

  const headClasses = isCompleted
    ? (task.frequency === 'daily' ? 'opacity-100 bg-purple-400' : 'opacity-100 bg-pink-400')
    : 'opacity-60 bg-gray-300';
  
  const stemClasses = isCompleted
    ? (task.frequency === 'daily' ? 'bg-green-600' : 'bg-green-700')
    : 'bg-gray-400';

  return (
    <div
      onClick={() => !isEditMode && onToggle(task.id)}
      className={`relative flex flex-col items-center transition-all duration-300 ${isEditMode ? 'cursor-default' : 'cursor-pointer hover:opacity-100'}`}
      title={task.name}
    >
      <div className={`text-4xl w-16 h-16 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 ${headClasses}`}>
        {isCompleted ? emoji : '🌱'}
      </div>
      
      <div className={`w-2 h-8 rounded-b-md transition-all duration-300 ${stemClasses}`} />

      {streak > 1 && !isEditMode && (
        <div className="absolute -bottom-2 -right-2 bg-orange-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-bold shadow-md">
          🔥{streak}
        </div>
      )}
      
      {isEditMode && (
        <button 
          onClick={() => onDelete(task.id)}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm shadow-md hover:bg-red-600"
        >
          X
        </button>
      )}
    </div>
  );
}