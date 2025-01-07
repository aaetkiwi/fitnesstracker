"use client";

import React, { useState } from 'react';
import { Calendar, Running, Waves } from 'lucide-react';

interface TrainingWeek {
  runningGoal: string;
  swimming?: string;
  completed: boolean;
  date?: string;
}

interface WeeklyData {
  [key: string]: TrainingWeek;
}

const FitnessTracker: React.FC = () => {
  const [weeklyData] = useState<WeeklyData>({
    'Week 1 (15.01-21.01)': {
      runningGoal: '2km (4.5-5 km/h + intervals)',
      swimming: '20 min easy swim',
      completed: false
    },
    'Week 2 (22.01-28.01)': {
      runningGoal: '3.5km (6-7 km/h intervals)',
      swimming: '25 min moderate swim',
      completed: false
    },
    'Week 3 (29.01-04.02)': {
      runningGoal: '5km (Goal: 50 min)',
      swimming: '30 min swim with intervals',
      completed: false
    },
    'Final Goal': {
      runningGoal: '8.7km (Goal: 1.5-1.8h)',
      date: '28.01.2025',
      completed: false
    }
  });

  return (
    <div className="container mx-auto p-4">
      <div className="w-full max-w-4xl mx-auto bg-white rounded-lg shadow-md">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Calendar className="h-6 w-6" />
            Training Progress Tracker
          </h2>
        </div>
        <div className="p-6">
          <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-blue-700">
              Daily Calorie Target: 1300-1500 kcal (1600-1800 on long run days)
            </p>
          </div>
          
          <div className="space-y-4">
            {Object.entries(weeklyData).map(([week, data]) => (
              <div key={week} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg">{week}</h3>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <Running className="h-5 w-5" />
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
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${data.completed ? 'bg-green-500' : 'bg-gray-300'}`} />
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