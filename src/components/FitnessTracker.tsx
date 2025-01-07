"use client";

import React, { useState } from 'react';
import { Calendar, Activity, Waves, CheckCircle2, PenLine, X, Save } from 'lucide-react';

interface TrainingWeek {
  runningGoal: string;
  swimming?: string;
  completed: boolean;
  date?: string;
  notes?: string;
}

interface WeeklyData {
  [key: string]: TrainingWeek;
}

const FitnessTracker: React.FC = () => {
  const [weeklyData, setWeeklyData] = useState<WeeklyData>({
    'Week 1 (15.01-21.01)': {
      runningGoal: '2km (4.5-5 km/h + intervals)',
      swimming: '20 min easy swim',
      completed: false,
      notes: ''
    },
    'Week 2 (22.01-28.01)': {
      runningGoal: '3.5km (6-7 km/h intervals)',
      swimming: '25 min moderate swim',
      completed: false,
      notes: ''
    },
    'Week 3 (29.01-04.02)': {
      runningGoal: '5km (Goal: 50 min)',
      swimming: '30 min swim with intervals',
      completed: false,
      notes: ''
    },
    'Final Goal': {
      runningGoal: '8.7km (Goal: 1.5-1.8h)',
      date: '28.01.2025',
      completed: false,
      notes: ''
    }
  });

  const [editingNotes, setEditingNotes] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState('');

  const toggleWeekCompletion = (week: string) => {
    setWeeklyData(prevData => ({
      ...prevData,
      [week]: {
        ...prevData[week],
        completed: !prevData[week].completed
      }
    }));
  };

  const startEditingNotes = (week: string) => {
    setEditingNotes(week);
    setTempNotes(weeklyData[week].notes || '');
  };

  const saveNotes = (week: string) => {
    setWeeklyData(prevData => ({
      ...prevData,
      [week]: {
        ...prevData[week],
        notes: tempNotes
      }
    }));
    setEditingNotes(null);
  };

  const calculateProgress = () => {
    const totalWeeks = Object.keys(weeklyData).length;
    const completedWeeks = Object.values(weeklyData).filter(week => week.completed).length;
    return Math.round((completedWeeks / totalWeeks) * 100);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Training Progress Tracker
          </h2>
          <div className="mt-4 bg-gray-100 rounded-full h-4">
            <div 
              className="bg-green-500 h-4 rounded-full transition-all duration-500"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
          <p className="text-sm text-gray-600 mt-2">Overall Progress: {calculateProgress()}%</p>
        </div>
        <div className="p-6">
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-700">
              Daily Calorie Target: 1300-1500 kcal (1600-1800 on long run days)
            </p>
          </div>
          
          <div className="space-y-4">
            {Object.entries(weeklyData).map(([week, data]) => (
              <div 
                key={week} 
                className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-lg">{week}</h3>
                      <button 
                        onClick={() => toggleWeekCompletion(week)}
                        className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      >
                        <CheckCircle2 
                          className={`h-5 w-5 ${data.completed ? 'text-green-500' : 'text-gray-300'}`}
                        />
                      </button>
                    </div>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5" />
                        <span>{data.runningGoal}</span>
                      </div>
                      {data.swimming && (
                        <div className="flex items-center gap-2">
                          <Waves className="h-5 w-5" />
                          <span>{data.swimming}</span>
                        </div>
                      )}
                      {data.date && (
                        <div className="flex items-center gap-2 text-blue-500">
                          <Calendar className="h-5 w-5" />
                          <span>Target Date: {data.date}</span>
                        </div>
                      )}
                    </div>
                    <div className="mt-3">
                      {editingNotes === week ? (
                        <div className="flex gap-2">
                          <textarea
                            value={tempNotes}
                            onChange={(e) => setTempNotes(e.target.value)}
                            className="flex-1 p-2 border rounded-md text-sm"
                            placeholder="Add your notes here..."
                            rows={2}
                          />
                          <div className="flex flex-col gap-1">
                            <button 
                              onClick={() => saveNotes(week)}
                              className="p-1 hover:bg-green-100 rounded-full transition-colors"
                            >
                              <Save className="h-4 w-4 text-green-600" />
                            </button>
                            <button 
                              onClick={() => setEditingNotes(null)}
                              className="p-1 hover:bg-red-100 rounded-full transition-colors"
                            >
                              <X className="h-4 w-4 text-red-600" />
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start gap-2">
                          <p className="text-sm text-gray-600 flex-1">
                            {data.notes || 'No notes yet'}
                          </p>
                          <button 
                            onClick={() => startEditingNotes(week)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <PenLine className="h-4 w-4 text-gray-500" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FitnessTracker;