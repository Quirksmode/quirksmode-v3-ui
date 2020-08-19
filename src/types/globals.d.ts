declare module 'redux-form';
declare const __CLIENT__: boolean;
declare const __SERVER__: boolean;

declare module '*.svg';
declare module '*.gif';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.webp';
declare module '*.css';
declare module '*.scss';

interface Window {
  __INITIAL_STATE__: Record<string, unknown>;
}
