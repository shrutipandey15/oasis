import { Button } from "@/components/ui/button";

export default function BottomPanel({
  countCompleted,
  dayIndex,
  getTotalTasks,
  resetToday,
  isEditMode,
  setIsEditMode,
  setIsModalOpen,
}) {
  const dailyCompleted = countCompleted(dayIndex, "daily");
  const totalDaily = getTotalTasks("daily");
  const weeklyCompleted = countCompleted(dayIndex, "weekly");
  const totalWeekly = getTotalTasks("weekly");

  const dailyPercentage =
    totalDaily > 0 ? Math.round((dailyCompleted / totalDaily) * 100) : 0;
  const weeklyPercentage =
    totalWeekly > 0 ? Math.round((weeklyCompleted / totalWeekly) * 100) : 0;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50">
      <div className="px-6 py-4 pb-8">
        <div className="mb-4">
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-600">Daily</span>
                <span className="text-xs font-bold text-purple-600">
                  {dailyCompleted}/{totalDaily}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-purple-500 to-purple-400 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${dailyPercentage}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs font-medium text-gray-600">
                  Weekly
                </span>
                <span className="text-xs font-bold text-pink-600">
                  {weeklyCompleted}/{totalWeekly}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-gradient-to-r from-pink-500 to-pink-400 h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${weeklyPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-2">
          <Button onClick={resetToday} variant="outline" className="w-full">
            Reset Today ↺
          </Button>
          <Button onClick={() => setIsModalOpen(true)} className="w-full">
            Add Habit +
          </Button>
          <Button
            onClick={() => setIsEditMode(!isEditMode)}
            variant={isEditMode ? "default" : "outline"}
            className="w-full"
          >
            {isEditMode ? "Done" : "Edit"}
          </Button>
        </div>
      </div>
    </div>
  );
}
