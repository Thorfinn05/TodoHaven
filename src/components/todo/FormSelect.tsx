import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormSelectProps {
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}

export function FormSelect({
  icon: Icon,
  value,
  onChange,
  options,
  className = '',
}: FormSelectProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
      </div>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full pl-10 pr-4 py-3 rounded-xl glass-input text-gray-900 dark:text-white ${className}`}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>{label}</option>
        ))}
      </select>
    </div>
  );
}