import { useState, useEffect } from "react";
import DaySelector from "./DaySelector";
import TaskList from "./TaskList";
import BottomPanel from "./BottomPanel";

const tasks = [
  {
    id: "water",
    name: "Drank water 💧",
    frequency: "daily",
    reminders: [
      "Hey cutie patootie, did you drink water today? 💧",
      "Your body is basically a houseplant with anxiety - WATER IT! 🌱",
      "H2-OH NO! You forgot water again, didn't you? 💦",
      "Time to hydrate or die-drate, bestie! 🥤",
    ],
  },
  {
    id: "meal",
    name: "Ate a meal 🍽️",
    frequency: "daily",
    reminders: [
      "Did you eat, you adorable human? Food is fuel! 🍽️",
      "Your stomach is sending angry notifications - FEED IT! 🥪",
      "Snacks don't count as meals, you beautiful disaster! 🍕",
      "Remember when you had breakfast... me neither 🥞",
    ],
  },
  {
    id: "interview",
    name: "Interview prep 💼",
    frequency: "weekly",
    reminders: [
      "Future CEO, time for some interview prep! 💼",
      "Practice makes perfect (or at least less awkward)! 🎭",
      "Your dream job is waiting for you to get ready! ✨",
      "Channel your inner main character energy! 🌟",
    ],
  },
  {
    id: "gym",
    name: "Gym or movement 🏋️",
    frequency: "daily",
    reminders: [
      "Time to build those biceps, gorgeous! 💪",
      "Your future hot self is waiting at the gym! 🔥",
      "Movement is medicine (and also makes you look good)! 🏃‍♀️",
      "Even 5 minutes counts, you beautiful human! ⚡",
    ],
  },
  {
    id: "project",
    name: "Worked on side project 💡",
    frequency: "weekly",
    reminders: [
      "Your side project misses you, creative genius! 💡",
      "Building the future, one line of code at a time! 🚀",
      "Your ideas deserve to see the light of day! ☀️",
      "Plot twist: you're actually brilliant! Work on that project! 🧠",
    ],
  },
  {
    id: "writing",
    name: "Wrote something ✍️",
    frequency: "weekly",
    reminders: [
      "Turn your brain chaos into beautiful words! ✍️",
      "Your thoughts deserve to exist outside your head! 📝",
      "Time to write something, you literary legend! 📚",
      "Even a grocery list counts as writing practice! 📋",
    ],
  },
  {
    id: "linkedin",
    name: "Posted on LinkedIn 🌐",
    frequency: "weekly",
    reminders: [
      "Time to professionally humble-brag, networking ninja! 🌐",
      "LinkedIn is calling - answer with your brilliance! 💼",
      "Share your wins, you accomplished human! 🏆",
      "Your professional network needs your wisdom! 🧠",
    ],
  },
  {
    id: "reading",
    name: "Read something 📚",
    frequency: "weekly",
    reminders: [
      "Feed your beautiful brain some knowledge! 📚",
      "Reading makes you 37% more interesting (I made that up)! 🤓",
      "Time to escape into someone else's world! 🌍",
      "Your brain is hungry for new ideas! 🧠",
    ],
  },
  {
    id: "checkin",
    name: "Checked in with myself 🪞",
    frequency: "daily",
    reminders: [
      "Hey beautiful soul, how are you really doing? 🪞",
      "Your feelings are valid - check in with them! 💭",
      "Mental health check: you matter, you're worthy! 💜",
      "Time for some self-love and reflection, darling! ✨",
    ],
  },
];

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function OasisTracker() {
  const [weekData, setWeekData] = useState(() =>
    Array(7)
      .fill()
      .map(() =>
        tasks.reduce((acc, task) => ({ ...acc, [task.id]: false }), {})
      )
  );

  const [dayIndex, setDayIndex] = useState(() => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1;
  });

  const [showReminder, setShowReminder] = useState(null);
  const [reminderTimeout, setReminderTimeout] = useState(null);

  useEffect(() => {}, [dayIndex]);

  const toggleTask = (taskId) => {
    const updated = [...weekData];
    if (!updated[dayIndex]) updated[dayIndex] = {};
    updated[dayIndex][taskId] = !updated[dayIndex][taskId];
    setWeekData(updated);
  };

  const resetToday = () => {
    const updated = [...weekData];
    updated[dayIndex] = tasks.reduce(
      (acc, task) => ({ ...acc, [task.id]: false }),
      {}
    );
    setWeekData(updated);
  };

  const getDailyTasks = () =>
    tasks.filter((task) => task.frequency === "daily");
  const getWeeklyTasks = () =>
    tasks.filter((task) => task.frequency === "weekly");

  const countCompleted = (day, taskType = "all") => {
    const dayData = weekData[day];
    if (!dayData) return 0;

    if (taskType === "daily") {
      return getDailyTasks().filter((task) => dayData[task.id]).length;
    } else if (taskType === "weekly") {
      return getWeeklyTasks().filter((task) => dayData[task.id]).length;
    }
    return Object.values(dayData).filter(Boolean).length;
  };

  const getTotalTasks = (taskType = "all") => {
    if (taskType === "daily") return getDailyTasks().length;
    if (taskType === "weekly") return getWeeklyTasks().length;
    return tasks.length;
  };

  const showRandomReminder = (task) => {
    const randomReminder =
      task.reminders[Math.floor(Math.random() * task.reminders.length)];
    setShowReminder({ task: task.name, message: randomReminder });

    if (reminderTimeout) clearTimeout(reminderTimeout);
    const timeout = setTimeout(() => setShowReminder(null), 4000);
    setReminderTimeout(timeout);
  };

  const getCompletionPercentage = (day) => {
    const completed = countCompleted(day);
    if (tasks.length === 0) return 0;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden">
      <div className="h-12 bg-transparent"></div>

      {showReminder && (
        <div className="fixed top-20 left-4 right-4 z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl shadow-xl border border-white/20">
            <div className="text-sm font-medium opacity-90 mb-1">
              {showReminder.task}
            </div>
            <div className="text-base">{showReminder.message}</div>
            <button
              onClick={() => setShowReminder(null)}
              className="absolute top-2 right-3 text-white/80 hover:text-white text-lg"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="px-6 pb-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-purple-800 mb-2">
            🌸 Soft Tracker
          </h1>
          <p className="text-sm text-purple-600 opacity-80">
            Your gentle daily companion
          </p>
        </div>
      </div>

      <DaySelector
        weekdays={weekdays}
        dayIndex={dayIndex}
        setDayIndex={setDayIndex}
        countCompleted={countCompleted}
        tasks={tasks}
        getCompletionPercentage={getCompletionPercentage}
      />

      <TaskList
        weekData={weekData}
        dayIndex={dayIndex}
        getDailyTasks={getDailyTasks}
        getWeeklyTasks={getWeeklyTasks}
        toggleTask={toggleTask}
        showRandomReminder={showRandomReminder}
        countCompleted={countCompleted}
        getTotalTasks={getTotalTasks}
      />

      <BottomPanel
        countCompleted={countCompleted}
        dayIndex={dayIndex}
        getTotalTasks={getTotalTasks}
        resetToday={resetToday}
      />

      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50">
        <div className="px-6 py-4 pb-8"></div>
      </div>
    </div>
  );
}
