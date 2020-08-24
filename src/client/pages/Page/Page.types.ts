export interface PageState extends PageData {
  loading: boolean;
  error: boolean;
}

export interface PageData {
  content: Content;
  metadata: Metadata;
}

export interface Content {
  title: string;
  slug: string;
  pageContent: string;
  contentBlocks?: ContentBlocksEntity[];
}

export interface ContentBlocksEntity {
  id: number;
  type: string;
  fullWidth: boolean;
  centerAlign: boolean;
  content: string;
}

export interface Metadata {
  metaTitle: string;
  metaDesc: string;
  metaUrl: string;
  metaSiteName: string;
  metaImage: string;
  metaImageWidth: string;
  metaImageHeight: string;
}

export interface RouteParams {
  slug: string;
}
