import React from 'react';
import { LucideIcon } from 'lucide-react';

interface FormInputProps {
  icon: LucideIcon;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  required?: boolean;
  className?: string;
}

export function FormInput({
  icon: Icon,
  value,
  onChange,
  placeholder,
  type = 'text',
  required = false,
  className = '',
}: FormInputProps) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-primary-600 dark:text-primary-400" />
      </div>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className={`w-full pl-10 pr-4 py-3 rounded-xl glass-input text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 ${className}`}
      />
    </div>
  );
}