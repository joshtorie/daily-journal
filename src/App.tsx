import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import VoiceRecorder from './components/VoiceRecorder';
import JournalEntries from './components/JournalEntries';
import { JournalEntry } from './types';

function App() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<number>(0);
  const prompts = ['morning', 'afternoon', 'evening'];

  useEffect(() => {
    const savedEntries = localStorage.getItem('journalEntries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  const handleTranscription = (text: string) => {
    const newEntry = {
      id: Date.now(),
      date: format(new Date(), 'yyyy-MM-dd'),
      timeOfDay: prompts[currentPrompt],
      text
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem('journalEntries', JSON.stringify(updatedEntries));

    if (currentPrompt < prompts.length - 1) {
      setCurrentPrompt(prev => prev + 1);
    } else {
      setCurrentPrompt(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-800 mb-8">
          Voice Journal
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl mb-4 text-gray-700">
            Tell me about your {prompts[currentPrompt]}...
          </h2>
          <VoiceRecorder onTranscription={handleTranscription} />
        </div>

        <JournalEntries entries={entries} />
      </div>
    </div>
  );
}

export default App;