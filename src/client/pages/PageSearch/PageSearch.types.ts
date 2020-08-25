import { Metadata } from '../Page/Page.types';
import { FeaturedImage } from 'client/components/Frame/Frame.types';

export interface PageSearchState extends PageSearchData {
  loading: boolean;
  error: boolean;
}

export interface PageSearchData {
  content: Content;
  metadata: Metadata;
}

export interface Content {
  title: string;
  searchPosts?: SearchPostsEntity[];
}

export interface SearchPostsEntity {
  postID: number;
  postName: string;
  postTitle: string;
  postExcerpt: string;
  type: 'page' | 'blog' | 'portfolio';
  date: string;
  featuredImage: FeaturedImage;
}

export interface RouteLocation {
  search: any;
}
