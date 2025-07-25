import React from 'react';
import { useState } from 'react';
import { Card, CardContent } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Switch } from "~/components/ui/switch";

const tasks = [
  {
    id: "water",
    name: "Drank water 💧",
    frequency: "daily",
    reminders: [
      "Hey cutie patootie, did you drink water today? 💧",
      "Your body is basically a houseplant with anxiety - WATER IT! 🌱",
      "H2-OH NO! You forgot water again, didn't you? 💦",
      "Time to hydrate or die-drate, bestie! 🥤"
    ]
  },
  {
    id: "meal",
    name: "Ate a meal 🍽️",
    frequency: "daily",
    reminders: [
      "Did you eat, you adorable human? Food is fuel! 🍽️",
      "Your stomach is sending angry notifications - FEED IT! 🥪",
      "Snacks don't count as meals, you beautiful disaster! 🍕",
      "Remember when you had breakfast... me neither 🥞"
    ]
  },
  {
    id: "interview",
    name: "Interview prep 💼",
    frequency: "weekly",
    reminders: [
      "Future CEO, time for some interview prep! 💼",
      "Practice makes perfect (or at least less awkward)! 🎭",
      "Your dream job is waiting for you to get ready! ✨",
      "Channel your inner main character energy! 🌟"
    ]
  },
  {
    id: "gym",
    name: "Gym or movement 🏋️",
    frequency: "daily",
    reminders: [
      "Time to build those biceps, gorgeous! 💪",
      "Your future hot self is waiting at the gym! 🔥",
      "Movement is medicine (and also makes you look good)! 🏃‍♀️",
      "Even 5 minutes counts, you beautiful human! ⚡"
    ]
  },
  {
    id: "project",
    name: "Worked on side project 💡",
    frequency: "weekly",
    reminders: [
      "Your side project misses you, creative genius! 💡",
      "Building the future, one line of code at a time! 🚀",
      "Your ideas deserve to see the light of day! ☀️",
      "Plot twist: you're actually brilliant! Work on that project! 🧠"
    ]
  },
  {
    id: "writing",
    name: "Wrote something ✍️",
    frequency: "weekly",
    reminders: [
      "Turn your brain chaos into beautiful words! ✍️",
      "Your thoughts deserve to exist outside your head! 📝",
      "Time to write something, you literary legend! 📚",
      "Even a grocery list counts as writing practice! 📋"
    ]
  },
  {
    id: "linkedin",
    name: "Posted on LinkedIn 🌐",
    frequency: "weekly",
    reminders: [
      "Time to professionally humble-brag, networking ninja! 🌐",
      "LinkedIn is calling - answer with your brilliance! 💼",
      "Share your wins, you accomplished human! 🏆",
      "Your professional network needs your wisdom! 🧠"
    ]
  },
  {
    id: "reading",
    name: "Read something 📚",
    frequency: "weekly",
    reminders: [
      "Feed your beautiful brain some knowledge! 📚",
      "Reading makes you 37% more interesting (I made that up)! 🤓",
      "Time to escape into someone else's world! 🌍",
      "Your brain is hungry for new ideas! 🧠"
    ]
  },
  {
    id: "checkin",
    name: "Checked in with myself 🪞",
    frequency: "daily",
    reminders: [
      "Hey beautiful soul, how are you really doing? 🪞",
      "Your feelings are valid - check in with them! 💭",
      "Mental health check: you matter, you're worthy! 💜",
      "Time for some self-love and reflection, darling! ✨"
    ]
  }
];

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function OasisTracker() {
  const [weekData, setWeekData] = useState(() => 
    Array(7).fill().map(() => 
      tasks.reduce((acc, task) => ({ ...acc, [task.id]: false }), {})
    )
  );
  
  const [dayIndex, setDayIndex] = useState(() => {
    const today = new Date().getDay();
    return today === 0 ? 6 : today - 1;
  });

  const [showReminder, setShowReminder] = useState(null);
  const [reminderTimeout, setReminderTimeout] = useState(null);

  const toggleTask = (taskId) => {
    const updated = [...weekData];
    updated[dayIndex][taskId] = !updated[dayIndex][taskId];
    setWeekData(updated);
  };

  const resetToday = () => {
    const updated = [...weekData];
    updated[dayIndex] = tasks.reduce((acc, task) => ({ ...acc, [task.id]: false }), {});
    setWeekData(updated);
  };

  const getDailyTasks = () => tasks.filter(task => task.frequency === 'daily');
  const getWeeklyTasks = () => tasks.filter(task => task.frequency === 'weekly');

  const countCompleted = (day, taskType = 'all') => {
    const dayData = weekData[day];
    if (taskType === 'daily') {
      return getDailyTasks().filter(task => dayData[task.id]).length;
    } else if (taskType === 'weekly') {
      return getWeeklyTasks().filter(task => dayData[task.id]).length;
    }
    return Object.values(dayData).filter(Boolean).length;
  };

  const getTotalTasks = (taskType = 'all') => {
    if (taskType === 'daily') return getDailyTasks().length;
    if (taskType === 'weekly') return getWeeklyTasks().length;
    return tasks.length;
  };

  const showRandomReminder = (task) => {
    const randomReminder = task.reminders[Math.floor(Math.random() * task.reminders.length)];
    setShowReminder({ task: task.name, message: randomReminder });
    
    if (reminderTimeout) clearTimeout(reminderTimeout);
    const timeout = setTimeout(() => setShowReminder(null), 4000);
    setReminderTimeout(timeout);
  };

  const getCompletionPercentage = (day) => {
    const completed = countCompleted(day);
    return Math.round((completed / tasks.length) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 overflow-hidden">
      {/* iOS Status Bar Space */}
      <div className="h-12 bg-transparent"></div>
      
      {/* Reminder Popup */}
      {showReminder && (
        <div className="fixed top-20 left-4 right-4 z-50 animate-in slide-in-from-top duration-300">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl shadow-xl border border-white/20">
            <div className="text-sm font-medium opacity-90 mb-1">{showReminder.task}</div>
            <div className="text-base">{showReminder.message}</div>
            <button 
              onClick={() => setShowReminder(null)}
              className="absolute top-2 right-3 text-white/80 hover:text-white text-lg"
            >×</button>
          </div>
        </div>
      )}
      
      {/* Header */}
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

      {/* Day Selector */}
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

      {/* Tasks List */}
      <div className="px-4 flex-1 pb-40">
        {/* Daily Tasks Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-purple-800">Daily Habits ☀️</h2>
            <span className="text-sm text-purple-600 bg-purple-100 px-3 py-1 rounded-full">
              {countCompleted(dayIndex, 'daily')}/{getTotalTasks('daily')}
            </span>
          </div>
          <div className="space-y-3">
            {getDailyTasks().map((task) => {
              const isCompleted = weekData[dayIndex][task.id];
              
              return (
                <div key={task.id} 
                     className={`transform transition-all duration-300 ${
                       isCompleted ? 'scale-98 opacity-80' : 'scale-100 opacity-100'
                     }`}>
                  <Card className={`bg-white/90 backdrop-blur-xl border-0 rounded-2xl shadow-md transition-all duration-300 ${
                    isCompleted ? 'bg-gradient-to-r from-purple-50 to-pink-50' : 'hover:shadow-lg'
                  }`}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isCompleted ? 'bg-purple-400' : 'bg-gray-300'
                        }`}></div>
                        <span className={`font-medium transition-all duration-300 ${
                          isCompleted ? 'text-purple-700 line-through' : 'text-gray-800'
                        }`}>
                          {task.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => showRandomReminder(task)}
                          className="text-purple-400 hover:text-purple-600 text-lg"
                          title="Get reminder"
                        >
                          💬
                        </button>
                        <Switch 
                          checked={isCompleted} 
                          onCheckedChange={() => toggleTask(task.id)}
                          className="data-[state=checked]:bg-purple-500"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Tasks Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-pink-800">Weekly Goals 🎯</h2>
            <span className="text-sm text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
              {countCompleted(dayIndex, 'weekly')}/{getTotalTasks('weekly')}
            </span>
          </div>
          <div className="space-y-3">
            {getWeeklyTasks().map((task) => {
              const isCompleted = weekData[dayIndex][task.id];
              
              return (
                <div key={task.id} 
                     className={`transform transition-all duration-300 ${
                       isCompleted ? 'scale-98 opacity-80' : 'scale-100 opacity-100'
                     }`}>
                  <Card className={`bg-white/90 backdrop-blur-xl border-0 rounded-2xl shadow-md transition-all duration-300 ${
                    isCompleted ? 'bg-gradient-to-r from-pink-50 to-purple-50' : 'hover:shadow-lg'
                  }`}>
                    <CardContent className="flex items-center justify-between p-4">
                      <div className="flex items-center gap-3 flex-1">
                        <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          isCompleted ? 'bg-pink-400' : 'bg-gray-300'
                        }`}></div>
                        <span className={`font-medium transition-all duration-300 ${
                          isCompleted ? 'text-pink-700 line-through' : 'text-gray-800'
                        }`}>
                          {task.name}
                        </span>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                          weekly
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => showRandomReminder(task)}
                          className="text-pink-400 hover:text-pink-600 text-lg"
                          title="Get reminder"
                        >
                          💬
                        </button>
                        <Switch 
                          checked={isCompleted} 
                          onCheckedChange={() => toggleTask(task.id)}
                          className="data-[state=checked]:bg-pink-500"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Action Panel */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-gray-200/50">
        <div className="px-6 py-4 pb-8">
          {/* Progress Summary */}
          <div className="mb-4">
            <div className="grid grid-cols-2 gap-4 mb-3">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-600">Daily</span>
                  <span className="text-xs font-bold text-purple-600">
                    {countCompleted(dayIndex, 'daily')}/{getTotalTasks('daily')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-purple-500 to-purple-400 h-1.5 rounded-full transition-all duration-500"
                    style={{width: `${Math.round((countCompleted(dayIndex, 'daily') / getTotalTasks('daily')) * 100)}%`}}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-medium text-gray-600">Weekly</span>
                  <span className="text-xs font-bold text-pink-600">
                    {countCompleted(dayIndex, 'weekly')}/{getTotalTasks('weekly')}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-gradient-to-r from-pink-500 to-pink-400 h-1.5 rounded-full transition-all duration-500"
                    style={{width: `${Math.round((countCompleted(dayIndex, 'weekly') / getTotalTasks('weekly')) * 100)}%`}}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Reset Button */}
          <Button 
            onClick={resetToday} 
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-4 rounded-2xl shadow-lg transition-all duration-300 transform active:scale-95"
          >
            Reset Today ↺
          </Button>
        </div>
      </div>
    </div>
  );
}