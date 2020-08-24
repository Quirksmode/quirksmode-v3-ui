import { Metadata } from '../Page/Page.types';
import { FeaturedImage } from 'client/components/Frame/Frame.types';

export interface PageHomeState extends PageHomeData {
  loading: boolean;
  error: boolean;
}

export interface PageHomeData {
  content: Content;
  metadata: Metadata;
}

export interface Content {
  title: string;
  heroSlides?: HeroSlidesEntity[] | null;
  featuredWork?: FeaturedWorkEntity[] | [];
  intro: Intro;
  latestBlogPosts?: LatestBlogPostsEntity[] | [];
  skills?: SkillsEntity[] | [];
}

export interface HeroSlidesEntity {
  id: number;
  image: Image;
}

export interface Image {
  alt: string;
  width: number;
  height: number;
  sizes: Sizes;
}

export interface Sizes {
  heroSlider481up: string;
  heroSlider481up2x: string;
  heroSlider768up: string;
  heroSlider768up2x: string;
}

export interface FeaturedWorkEntity {
  id: number;
  slug: string;
  title: string;
  date: string;
  isNew: boolean;
  featuredImage: FeaturedImage;
}

export interface Intro {
  image: Image1;
  text: string;
}

export interface Image1 {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface LatestBlogPostsEntity {
  postID: number;
  postName: string;
  postTitle: string;
  postExcerpt: string;
  type: string;
  date: string;
  featuredImage: FeaturedImage;
}

export interface SkillsEntity {
  skill_name: string;
}
