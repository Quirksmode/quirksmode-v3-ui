export interface FrameProps {
  featuredImage: FeaturedImage;
  size: 'Small' | 'Medium';
  title?: string;
  isNew?: boolean;
  date?: string;
}

export interface FeaturedImage {
  alt?: string;
  width?: number;
  height?: number;
  sizes: Sizes;
}

export interface Sizes {
  [key: string]: string;
}
