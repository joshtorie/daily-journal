import React from 'react';
import { JournalEntry } from '../types';

interface Props {
  entries: JournalEntry[];
}

const JournalEntries: React.FC<Props> = ({ entries }) => {
  const entriesByDate = entries.reduce((acc, entry) => {
    if (!acc[entry.date]) {
      acc[entry.date] = [];
    }
    acc[entry.date].push(entry);
    return acc;
  }, {} as Record<string, JournalEntry[]>);

  return (
    <div className="space-y-6">
      {Object.entries(entriesByDate)
        .sort(([dateA], [dateB]) => new Date(dateB).getTime() - new Date(dateA).getTime())
        .map(([date, dayEntries]) => (
          <div key={date} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">{date}</h3>
            <div className="space-y-4">
              {dayEntries.map(entry => (
                <div key={entry.id} className="border-l-4 border-purple-500 pl-4">
                  <h4 className="text-sm font-medium text-purple-600 mb-2">
                    {entry.timeOfDay}
                  </h4>
                  <p className="text-gray-700">{entry.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default JournalEntries;