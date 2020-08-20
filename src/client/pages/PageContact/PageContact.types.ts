export interface PageContactState extends PageContactData {
  loading: boolean;
  error: boolean;
}

export interface PageContactData {
  content: Content;
  metadata: Metadata;
}

export interface Content {
  title: string;
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
