import { ReactNode } from 'react';

export interface ErrorBoundaryProps {
  children?: ReactNode;
}

export interface ErrorBoundaryState {
  error: Error | null;
  errorInfo: { componentStack: string } | null;
}
