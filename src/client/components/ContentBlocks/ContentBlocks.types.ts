import { Tags } from 'client/App.types';
import { FeaturedImage } from '../Frame/Frame.types';

export interface ContentBlocksProps {
  contentBlocks: (
    | ContentBlockContent
    | ContentBlockImageFull
    | ContentBlockCode
    | ContentBlockContentSidebar
  )[];
  tags?: Tags[];
  projectURL?: string;
}

export interface ContentBlocksCommon {
  id: number;
  type: string;
}

export interface ContentBlockContentProps {
  block: ContentBlockContent;
}

export interface ContentBlockContent extends ContentBlocksCommon {
  fullWidth?: boolean;
  centerAlign?: boolean;
  content?: string;
}

export interface ContentBlockImageFullProps {
  block: ContentBlockImageFull;
}

export interface ContentBlockImageFull extends ContentBlocksCommon {
  image?: FeaturedImage;
}

export interface ContentBlockCodeProps {
  block: ContentBlockCode;
}

export interface ContentBlockCode extends ContentBlocksCommon {
  intro?: string;
  code?: string;
  language?: string;
}

export interface ContentBlockContentSidebarProps {
  block: ContentBlockContentSidebar;
  tags?: Tags[];
  projectURL?: string;
}

export interface ContentBlockContentSidebar extends ContentBlocksCommon {
  showTags?: boolean;
  content?: string;
}
