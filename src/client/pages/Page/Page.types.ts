export interface PageState extends PageData {
  loading: boolean;
  error: boolean;
}

export interface PageData {
  content: Content;
  metadata: Metadata | {};
}

export interface Content {
  title: string;
  pageContent: string;
  contentBlocks?: ContentBlocksEntity[] | null;
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
  metaImageWidth: number;
  metaImageHeight: number;
}
