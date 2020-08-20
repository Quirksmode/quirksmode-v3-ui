export interface PagePortfolioSingleState extends PagePortfolioSingleData {
  loading: boolean;
  error: boolean;
}

export interface PagePortfolioSingleData {
  content: Content;
  metadata: Metadata;
}

export interface Content {
  id: number;
  title: string;
  slug: string;
  url: string;
  hero: Hero;
  projectTags?: ProjectTagsEntity[];
  projectRole: string;
  projectURL: string;
  screenshots?: ScreenshotsEntity[];
  contentBlocks?: ContentBlocksEntity[];
  related?: RelatedEntity[];
  noRelated: boolean;
}

export interface Hero {
  image: Image;
  alignCenter: boolean;
}

export interface Image {
  alt: string;
  sizes: Sizes;
}

export interface Sizes {
  fullWidth481: string;
  fullWidth481_2x: string;
  fullWidth768: string;
  fullWidth768_2x: string;
  fullWidth1024: string;
  fullWidth1024_2x: string;
  fullWidth1800: string;
  fullWidth1800_2x: string;
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

export interface ScreenshotsEntity {
  id: number;
  url: string;
  alt: string;
  width: number;
  height: number;
  sizes: Sizes1;
}

export interface Sizes1 {
  heroSlider481up: string;
  heroSlider481up2x: string;
  heroSlider768up: string;
  heroSlider768up2x: string;
}

export interface ContentBlocksEntity {
  id: number;
  type: string;
  content: string;
  showTags: boolean;
  showLink: boolean;
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

export interface FeaturedImage {
  alt: string;
  width: number;
  height: number;
  sizes: Sizes2;
}

export interface Sizes2 {
  quirksmodeMedium: string;
  quirksmodeMedium2x: string;
}

export interface Metadata {
  metaTitle: string;
  metaDesc: string;
  metaUrl: string;
  metaSiteName: string;
  metaImage: string;
  metaImageWidth: number;
  metaImageHeight: number;
}
