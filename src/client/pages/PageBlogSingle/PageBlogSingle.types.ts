import { Metadata } from '../Page/Page.types';
import { FeaturedImage } from 'client/components/Frame/Frame.types';

export interface PageBlogSingleState extends PageBlogSingleData {
  loading: boolean;
  error: boolean;
}

export interface PageBlogSingleData {
  content: Content;
  metadata: Metadata;
}

export interface Content {
  id: number;
  title: string;
  url: string;
  date: string;
  hero: Hero;
  contentBlocks?: ContentBlocksEntity[];
  related?: RelatedEntity[];
  noRelated: boolean;
}

export interface Hero {
  image: FeaturedImage;
  alignCenter: boolean;
}

export interface ContentBlocksEntity {
  id: number;
  type: string;
  fullWidth: boolean;
  centerAlign: boolean;
  content: string;
}

export interface RelatedEntity {
  ID: number;
  post_author: string;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: string;
  post_modified_gmt: string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: string;
  filter: string;
  isNew: boolean;
  featuredImage: FeaturedImage;
}
