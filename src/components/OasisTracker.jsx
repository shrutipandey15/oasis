import { useState, useEffect } from "react";
import DaySelector from "./DaySelector";
import BottomPanel from "./BottomPanel";
import Garden from "./Garden";
import AddHabitModal from "./AddHabitModal";
import useLocalStorageState from "~/hooks/useLocalStorageState";

const initialTasks = [
  {
    id: "water",
    name: "Drank water 💧",
    frequency: "daily",
    completed: {},
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
    completed: {},
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
    completed: {},
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
    completed: {},
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
    completed: {},
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
    completed: {},
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
    completed: {},
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
    completed: {},
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
    completed: {},
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
  const [tasks, setTasks] = useLocalStorageState("tasks", initialTasks);

  const [dayIndex, setDayIndex] = useState(() => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1;
  });

  const [isEditMode, setIsEditMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {}, [dayIndex]);

  const getDateStringForDayIndex = (dayIndex) => {
    const today = new Date();
    const currentDayOfWeek = today.getDay();
    const targetDayOfWeek = dayIndex + 1;

    let dayDifference =
      targetDayOfWeek - (currentDayOfWeek === 0 ? 7 : currentDayOfWeek);

    const targetDate = new Date();
    targetDate.setDate(today.getDate() + dayDifference);

    return targetDate.toISOString().split("T")[0];
  };

  const toggleTask = (taskId) => {
    const dateString = getDateStringForDayIndex(dayIndex);

    setTasks((currentTasks) => {
      return currentTasks.map((task) => {
        if (task.id === taskId) {
          const newCompleted = { ...task.completed };

          if (newCompleted[dateString]) {
            delete newCompleted[dateString];
          } else {
            newCompleted[dateString] = true;
          }
          return { ...task, completed: newCompleted };
        }
        return task;
      });
    });
  };

  const resetToday = () => {
    const dateString = getDateStringForDayIndex(dayIndex);

    setTasks((currentTasks) =>
      currentTasks.map((task) => {
        const newCompleted = { ...task.completed };

        if (newCompleted[dateString]) {
          delete newCompleted[dateString];
        }

        return { ...task, completed: newCompleted };
      })
    );
  };

  const addTask = (newHabit) => {
    const newTask = {
      id: newHabit.name.toLowerCase().replace(/\s/g, "-") + Date.now(),
      name: newHabit.name,
      frequency: newHabit.frequency,
      reminders: ["Don't forget to do your new habit!"],
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (taskId) => {
    if (window.confirm("Are you sure you want to delete this habit?")) {
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  const getDailyTasks = () =>
    tasks.filter((task) => task.frequency === "daily");
  const getWeeklyTasks = () =>
    tasks.filter((task) => task.frequency === "weekly");

  const countCompleted = (day, taskType = "all") => {
    const dateString = getDateStringForDayIndex(day);
    let tasksToCount = tasks;
    if (taskType === "daily") {
      tasksToCount = getDailyTasks();
    } else if (taskType === "weekly") {
      tasksToCount = getWeeklyTasks();
    }
    return tasksToCount.filter((task) => task.completed?.[dateString]).length;
  };

  const calculateStreak = (task) => {
    const { completed, frequency } = task;
    if (!completed) return 0;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let streak = 0;

    if (frequency === "daily") {
      for (let i = 0; i < 365; i++) {
        const checkDate = new Date(today);
        checkDate.setDate(today.getDate() - i);
        const dateStr = checkDate.toISOString().split("T")[0];

        if (completed[dateStr]) {
          streak++;
        } else {
          break;
        }
      }
    } else if (frequency === "weekly") {
      for (let i = 0; i < 52; i++) {
        const weekEnd = new Date(today);
        weekEnd.setDate(today.getDate() - i * 7);

        const weekStart = new Date(weekEnd);
        weekStart.setDate(weekEnd.getDate() - 6);

        let completedThisWeek = false;
        for (let j = 0; j < 7; j++) {
          const checkDate = new Date(weekStart);
          checkDate.setDate(weekStart.getDate() + j);
          const dateStr = checkDate.toISOString().split("T")[0];

          if (completed[dateStr]) {
            completedThisWeek = true;
            break;
          }
        }

        if (completedThisWeek) {
          streak++;
        } else {
          break;
        }
      }
    }

    return streak;
  };

  const getTotalTasks = (taskType = "all") => {
    if (taskType === "daily") return getDailyTasks().length;
    if (taskType === "weekly") return getWeeklyTasks().length;
    return tasks.length;
  };

  const getCompletionPercentage = (day) => {
    const completed = countCompleted(day);
    if (tasks.length === 0) return 0;
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="pb-40">
        <div className="h-12 bg-transparent" />
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

        <Garden
          tasks={tasks}
          dayIndex={dayIndex}
          toggleTask={toggleTask}
          getDateStringForDayIndex={getDateStringForDayIndex}
          isEditMode={isEditMode}
          deleteTask={deleteTask}
          calculateStreak={calculateStreak}
        />
      </div>
      <AddHabitModal
        isOpen={isModalOpen}
        setIsOpen={setIsModalOpen}
        addTask={addTask}
      />

      <BottomPanel
        countCompleted={countCompleted}
        dayIndex={dayIndex}
        getTotalTasks={getTotalTasks}
        resetToday={resetToday}
        setIsModalOpen={setIsModalOpen}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
      />
    </div>
  );
}
