import React, { useState } from 'react';
import { Brain, Plus, Edit2, Trash2 } from 'lucide-react';
import { FlashcardForm } from './FlashcardForm';
import { FlashcardStudy } from './FlashcardStudy';
import { FlashcardDeck as DeckType } from '../../../types/study';

interface DeckProps {
  deck: DeckType;
  onAddCard: (deckId: string, card: any) => void;
  onUpdateConfidence: (deckId: string, cardId: string, confidence: 1 | 2 | 3 | 4 | 5) => void;
  onDeleteDeck: (deckId: string) => void;
}

export function FlashcardDeck({ deck, onAddCard, onUpdateConfidence, onDeleteDeck }: DeckProps) {
  const [showForm, setShowForm] = useState(false);
  const [isStudying, setIsStudying] = useState(false);

  if (isStudying) {
    return (
      <FlashcardStudy 
        deck={deck} 
        onUpdateConfidence={onUpdateConfidence}
        onClose={() => setIsStudying(false)}
      />
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg mb-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-primary-500" />
            {deck.name}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{deck.description}</p>
          <p className="text-sm text-primary-500 mt-2">{deck.cards.length} cards</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onDeleteDeck(deck.id)}
            className="p-2 text-red-500 hover:text-red-600 rounded-lg"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => setIsStudying(true)}
          className="flex-1 bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors flex items-center justify-center gap-2"
        >
          <Brain className="w-5 h-5" />
          Study Now
        </button>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center justify-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Card
        </button>
      </div>

      {showForm && (
        <div className="mt-4">
          <FlashcardForm onSubmit={(card) => {
            onAddCard(deck.id, card);
            setShowForm(false);
          }} />
        </div>
      )}
    </div>
  );
}