import { useState, useEffect } from 'react';
import { Flashcard, FlashcardDeck } from '../types/study';
import { v4 as uuidv4 } from 'uuid';

export function useFlashcards() {
  const [decks, setDecks] = useState<FlashcardDeck[]>(() => {
    const saved = localStorage.getItem('flashcardDecks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('flashcardDecks', JSON.stringify(decks));
  }, [decks]);

  const addDeck = (name: string, description: string) => {
    const newDeck: FlashcardDeck = {
      id: uuidv4(),
      name,
      description,
      cards: []
    };
    setDecks(prev => [...prev, newDeck]);
  };

  const deleteDeck = (deckId: string) => {
    setDecks(prev => prev.filter(deck => deck.id !== deckId));
  };

  const addCard = (deckId: string, card: Omit<Flashcard, 'id'>) => {
    const newCard = { ...card, id: uuidv4() };
    setDecks(prev =>
      prev.map(deck =>
        deck.id === deckId
          ? { ...deck, cards: [...deck.cards, newCard] }
          : deck
      )
    );
  };

  const updateCardConfidence = (deckId: string, cardId: string, confidence: 1 | 2 | 3 | 4 | 5) => {
    setDecks(prev =>
      prev.map(deck =>
        deck.id === deckId
          ? {
              ...deck,
              cards: deck.cards.map(card =>
                card.id === cardId
                  ? { ...card, confidence, lastReviewed: new Date().toISOString() }
                  : card
              )
            }
          : deck
      )
    );
  };

  return {
    decks,
    addDeck,
    deleteDeck,
    addCard,
    updateCardConfidence
  };
}