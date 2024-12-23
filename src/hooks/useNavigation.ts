import { useState } from 'react';
import { FeatureState } from '../types/navigation';

export function useNavigation() {
  const [state, setState] = useState<FeatureState>({
    activeFeature: 'tasks',
    isNavOpen: false
  });

  const toggleNav = () => {
    setState(prev => ({
      ...prev,
      isNavOpen: !prev.isNavOpen
    }));
  };

  const setActiveFeature = (feature: string) => {
    setState(prev => ({
      ...prev,
      activeFeature: feature,
      isNavOpen: false
    }));
  };

  return {
    ...state,
    toggleNav,
    setActiveFeature
  };
}