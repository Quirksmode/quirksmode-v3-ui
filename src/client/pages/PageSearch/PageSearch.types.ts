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
  type: string;
  date: string;
  featuredImage: FeaturedImage;
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

export interface Metadata {
  metaTitle: string;
  metaDesc: string;
  metaUrl: string;
  metaSiteName: string;
  metaImage: string;
  metaImageWidth: number;
  metaImageHeight: number;
}
