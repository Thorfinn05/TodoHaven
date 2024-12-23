import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, X, Star } from 'lucide-react';
import { FlashcardDeck, Flashcard } from '../../../types/study';

interface StudyProps {
  deck: FlashcardDeck;
  onUpdateConfidence: (deckId: string, cardId: string, confidence: 1 | 2 | 3 | 4 | 5) => void;
  onClose: () => void;
}

export function FlashcardStudy({ deck, onUpdateConfidence, onClose }: StudyProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const currentCard = deck.cards[currentIndex];

  const handleNext = () => {
    if (currentIndex < deck.cards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsFlipped(false);
    }
  };

  const handleConfidence = (confidence: 1 | 2 | 3 | 4 | 5) => {
    onUpdateConfidence(deck.id, currentCard.id, confidence);
    handleNext();
  };

  if (!currentCard) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg text-center">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          No cards in this deck
        </h3>
        <button
          onClick={onClose}
          className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          {deck.name} - Card {currentIndex + 1} of {deck.cards.length}
        </h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="min-h-[200px] bg-gray-50 dark:bg-gray-700 rounded-xl p-6 mb-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02]"
      >
        <div className="text-lg text-gray-900 dark:text-white">
          {isFlipped ? currentCard.back : currentCard.front}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((rating) => (
            <button
              key={rating}
              onClick={() => handleConfidence(rating as 1 | 2 | 3 | 4 | 5)}
              className={`p-2 rounded-lg ${
                rating === currentCard.confidence
                  ? 'text-yellow-500'
                  : 'text-gray-400 hover:text-yellow-500'
              }`}
            >
              <Star className="w-5 h-5" />
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentIndex === deck.cards.length - 1}
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 disabled:opacity-50"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}