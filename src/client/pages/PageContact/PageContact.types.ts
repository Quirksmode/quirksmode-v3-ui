import { Metadata } from '../Page/Page.types';

export interface PageContactState extends PageContactData {
  loading: boolean;
  error: boolean;
}

export interface PageContactData {
  content: Content;
  metadata: Metadata;
}

export interface Content {
  title: string;
}
