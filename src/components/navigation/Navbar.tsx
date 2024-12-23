import React from 'react';
import { Menu, X } from 'lucide-react';
import { NavItems } from './NavItems';

interface NavbarProps {
  isOpen: boolean;
  activeFeature: string;
  onToggle: () => void;
  onFeatureSelect: (feature: string) => void;
}

export function Navbar({ isOpen, activeFeature, onToggle, onFeatureSelect }: NavbarProps) {
  return (
    <nav className="fixed w-full z-50 glass-card">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <button
              onClick={onToggle}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-2 rounded-lg transition-colors"
              aria-label="Toggle navigation"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute top-16 left-0 w-64 glass-card rounded-r-2xl shadow-2xl animate-fade-in">
          <NavItems activeFeature={activeFeature} onSelect={onFeatureSelect} />
        </div>
      )}
    </nav>
  );}