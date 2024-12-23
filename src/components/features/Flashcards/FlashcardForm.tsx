import React, { useState } from 'react';

interface FlashcardFormProps {
  onSubmit: (card: any) => void;
}

export function FlashcardForm({ onSubmit }: FlashcardFormProps) {
  const [front, setFront] = useState('');
  const [back, setBack] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      front,
      back,
      category,
      confidence: 1
    });
    setFront('');
    setBack('');
    setCategory('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <textarea
          value={front}
          onChange={(e) => setFront(e.target.value)}
          placeholder="Front side (question)"
          className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          rows={3}
          required
        />
      </div>
      <div>
        <textarea
          value={back}
          onChange={(e) => setBack(e.target.value)}
          placeholder="Back side (answer)"
          className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          rows={3}
          required
        />
      </div>
      <div>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Category (e.g., Math, History)"
          className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
      >
        Add Card
      </button>
    </form>
  );
}