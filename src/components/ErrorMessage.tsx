'use client';

import { AlertCircle, XCircle } from 'lucide-react';
import { getErrorMessage } from '@/lib/error-utils';

interface ErrorMessageProps {
  error: unknown;
  className?: string;
  variant?: 'default' | 'destructive' | 'warning';
  onDismiss?: () => void;
}

export default function ErrorMessage({
  error,
  className = '',
  variant = 'default',
  onDismiss,
}: ErrorMessageProps) {
  const message = getErrorMessage(error);
  
  // Configure styles based on variant
  const bgColor = variant === 'destructive' 
    ? 'bg-destructive/10' 
    : variant === 'warning' 
      ? 'bg-yellow-100 dark:bg-yellow-900/20'
      : 'bg-red-100 dark:bg-red-900/20';
  
  const textColor = variant === 'destructive' 
    ? 'text-destructive' 
    : variant === 'warning' 
      ? 'text-yellow-800 dark:text-yellow-400'
      : 'text-red-800 dark:text-red-400';
  
  const Icon = variant === 'warning' ? AlertCircle : XCircle;
  
  return (
    <div className={`p-4 my-4 rounded-md flex items-start gap-3 ${bgColor} ${textColor} ${className}`}>
      <Icon className="h-5 w-5 mt-0.5 flex-shrink-0" />
      <div className="flex-1">{message}</div>
      {onDismiss && (
        <button 
          onClick={onDismiss}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
          aria-label="Dismiss error"
        >
          <XCircle className="h-5 w-5" />
        </button>
      )}
    </div>
  );
} 