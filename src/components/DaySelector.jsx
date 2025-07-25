export default function DaySelector({ weekdays, dayIndex, setDayIndex, countCompleted, tasks, getCompletionPercentage }) {
  return(
      <div className="px-4 mb-6">
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-3 shadow-lg border border-white/50">
          <div className="flex justify-between gap-1">
            {weekdays.map((day, i) => {
              const isToday = i === dayIndex;
              const completionPercentage = getCompletionPercentage(i);
              
              return (
                <button
                  key={i}
                  className={`flex-1 relative overflow-hidden rounded-xl py-3 px-2 transition-all duration-300 ${
                    isToday 
                      ? 'bg-purple-500 text-white shadow-lg transform scale-105' 
                      : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setDayIndex(i)}
                >
                  <div className="text-xs font-semibold mb-1">{day}</div>
                  <div className="text-xs opacity-80">
                    {countCompleted(i)}/{tasks.length}
                  </div>
                  <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-500" 
                       style={{width: `${completionPercentage}%`}}></div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
  );
}