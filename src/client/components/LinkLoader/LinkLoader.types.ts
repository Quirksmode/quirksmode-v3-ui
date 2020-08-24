import { ReactNode } from 'react';
import { fetchPageData } from 'pages/Page/Page.actions';
import { fetchBlogSingleData } from 'pages/PageBlogSingle/PageBlogSingle.actions';
import { fetchPortfolioSingleData } from 'pages/PagePortfolioSingle/PagePortfolioSingle.actions';

export interface LinkLoaderProps {
  type?: 'page' | 'blog' | 'portfolio';
  title?: string;
  slug: string;
  children: ReactNode;
}

export interface LinkLoaderActionObj {
  [key: string]:
    | typeof fetchPageData
    | typeof fetchBlogSingleData
    | typeof fetchPortfolioSingleData;
}
