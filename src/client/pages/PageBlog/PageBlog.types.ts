import { Metadata } from '../Page/Page.types';
import { FeaturedImage } from 'client/components/Frame/Frame.types';

export interface PageBlogState extends PageBlogData {
  loading: boolean;
  error: boolean;
}

export interface PageBlogData {
  content: Content;
  metadata: Metadata;
}

export interface Content {
  title: string;
  blogPosts?: BlogPostsEntity[];
}

export interface BlogPostsEntity {
  postID: number;
  postName: string;
  postTitle: string;
  postExcerpt: string;
  type: 'page' | 'blog' | 'portfolio';
  date: string;
  featuredImage: FeaturedImage;
}

export interface RouteHistory {
  location: any;
}
