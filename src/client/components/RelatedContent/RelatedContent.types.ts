import { RelatedEntity } from 'client/pages/PagePortfolioSingle/PagePortfolioSingle.types';

export interface RelatedContentProps {
  related: RelatedEntity[];
  type: 'portfolio' | 'blog';
  noRelated: boolean;
}
