import React, { useState } from 'react';
import { Brain, Plus } from 'lucide-react';
import { useFlashcards } from '../../../hooks/useFlashcards';
import { FlashcardDeck } from './FlashcardDeck';
import { FlashcardStudy } from './FlashcardStudy';
import { FlashcardForm } from './FlashcardForm';

export function Flashcards() {
  const { decks, addDeck, addCard, updateCardConfidence } = useFlashcards();
  const [showNewDeckForm, setShowNewDeckForm] = useState(false);
  const [newDeckName, setNewDeckName] = useState('');
  const [newDeckDescription, setNewDeckDescription] = useState('');

  const handleCreateDeck = (e: React.FormEvent) => {
    e.preventDefault();
    if (newDeckName.trim()) {
      addDeck(newDeckName.trim(), newDeckDescription.trim());
      setNewDeckName('');
      setNewDeckDescription('');
      setShowNewDeckForm(false);
    }
  };

  const handleDeleteDeck = (deckId: string) => {
    // Implementation will be added in the next update
    console.log('Delete deck:', deckId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary-500" />
            Flashcards
          </h2>
          <button
            onClick={() => setShowNewDeckForm(!showNewDeckForm)}
            className="flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Create Deck
          </button>
        </div>

        {showNewDeckForm && (
          <form onSubmit={handleCreateDeck} className="mb-6 space-y-4">
            <input
              type="text"
              value={newDeckName}
              onChange={(e) => setNewDeckName(e.target.value)}
              placeholder="Deck Name"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              required
            />
            <textarea
              value={newDeckDescription}
              onChange={(e) => setNewDeckDescription(e.target.value)}
              placeholder="Deck Description"
              className="w-full px-4 py-2 rounded-lg border dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              rows={3}
            />
            <button
              type="submit"
              className="w-full bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
            >
              Create Deck
            </button>
          </form>
        )}

        <div className="space-y-6">
          {decks.map(deck => (
            <FlashcardDeck
              key={deck.id}
              deck={deck}
              onAddCard={addCard}
              onUpdateConfidence={updateCardConfidence}
              onDeleteDeck={handleDeleteDeck}
            />
          ))}
          {decks.length === 0 && (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              No flashcard decks yet. Create your first deck to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}