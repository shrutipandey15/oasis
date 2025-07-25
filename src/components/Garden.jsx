export default function Garden({ tasks }) {
  return (
    <div className="p-4 flex-1 flex flex-wrap gap-4 justify-center items-center">
      {tasks.map(task => (
        <div 
          key={task.id} 
          className="text-4xl p-3 bg-white/30 rounded-2xl shadow-md cursor-pointer hover:scale-110 transition-transform"
          title={task.name}
        >
          🌱
        </div>
      ))}
    </div>
  );
}