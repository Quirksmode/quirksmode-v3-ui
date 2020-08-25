import { Metadata } from '../Page/Page.types';
import { FeaturedImage } from 'client/components/Frame/Frame.types';

export interface PagePortfolioState extends PagePortfolioData {
  loading: boolean;
  error: boolean;
}

export interface PagePortfolioData {
  content: Content;
  metadata: Metadata;
}

export interface Content {
  title: string;
  projects?: ProjectsEntity[];
}

export interface ProjectsEntity {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
  term_order: string;
  projects?: ProjectsEntity1[];
}

export interface ProjectsEntity1 {
  postID: number;
  postName: string;
  postTitle: string;
  postExcerpt: string;
  date: string;
  featuredImage: FeaturedImage;
  isNew: boolean;
  projectTags?: ProjectTagsEntity[];
  projectTagsList: string;
}

export interface ProjectTagsEntity {
  term_id: number;
  name: string;
  slug: string;
  term_group: number;
  term_taxonomy_id: number;
  taxonomy: string;
  description: string;
  parent: number;
  count: number;
  filter: string;
  term_order: string;
}

export interface RouteHistory {
  location: any;
}
