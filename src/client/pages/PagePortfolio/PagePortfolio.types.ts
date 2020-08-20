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

export interface FeaturedImage {
  alt: string;
  width: number;
  height: number;
  sizes: Sizes;
}

export interface Sizes {
  quirksmodeSmall: string;
  quirksmodeSmall2x: string;
  quirksmodeMedium: string;
  quirksmodeMedium2x: string;
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

export interface Metadata {
  metaTitle: string;
  metaDesc: string;
  metaUrl: string;
  metaSiteName: string;
  metaImage: string;
  metaImageWidth: number;
  metaImageHeight: number;
}
