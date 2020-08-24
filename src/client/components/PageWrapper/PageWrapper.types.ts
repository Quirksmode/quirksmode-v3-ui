import { ReactNode } from 'react';

export interface PageWrapperProps {
  loading?: boolean;
  error: boolean;
  children: ReactNode;
}
