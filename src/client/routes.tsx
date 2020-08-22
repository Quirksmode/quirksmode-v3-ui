import App from './App';
// @ts-ignore
import PageHome from './pages/PageHome';
// @ts-ignore
import PageAbout from './pages/PageAbout';
// @ts-ignore
import PageBlog from './pages/PageBlog/PageBlog';
// @ts-ignore
import PageBlogSingle from './pages/PageBlogSingle';
// @ts-ignore
import PageContact from './pages/PageContact';
// @ts-ignore
import PagePortfolio from './pages/PagePortfolio';
// @ts-ignore
import PagePortfolioSingle from './pages/PagePortfolioSingle';
// @ts-ignore
import PageSearch from './pages/PageSearch';
// @ts-ignore
import Page404 from './pages/Page404';
// @ts-ignore
import Page from './pages/Page';

import { fetchAppData } from './App.actions';
import { fetchHomeData } from './pages/PageHome/PageHome.actions';
import { fetchAboutData } from './pages/PageAbout/PageAbout.actions';
import { fetchContactData } from './pages/PageContact/PageContact.actions';
import { fetchPortfolioData } from './pages/PagePortfolio/PagePortfolio.actions';
import { fetchPortfolioSingleData } from './pages/PagePortfolioSingle/PagePortfolioSingle.actions';
import { fetchBlogData } from './pages/PageBlog/PageBlog.actions';
import { fetchBlogSingleData } from './pages/PageBlogSingle/PageBlogSingle.actions';
import { fetchSearchData } from './pages/PageSearch/PageSearch.actions';
import { fetchPageData } from './pages/Page/Page.actions';
import { AppThunk } from './redux/types';
import { Request } from 'express';

export default [
  {
    component: App,
    loadData: (): AppThunk[] => [fetchAppData()],
    routes: [
      {
        path: '/',
        component: PageHome,
        exact: true,
        loadData: (): AppThunk[] => [fetchHomeData()],
      },
      {
        path: '/about-me',
        component: PageAbout,
        exact: true,
        loadData: (): AppThunk[] => [fetchAboutData()],
      },
      {
        path: '/portfolio',
        component: PagePortfolio,
        exact: true,
        loadData: (): AppThunk[] => [fetchPortfolioData()],
      },
      {
        path: '/portfolio/:slug',
        component: PagePortfolioSingle,
        loadData: ({ params }: { params: { slug: string } }): AppThunk[] => [
          fetchPortfolioSingleData(params.slug),
        ],
      },
      {
        path: '/contact',
        component: PageContact,
        exact: true,
        loadData: (): AppThunk[] => [fetchContactData()],
      },
      {
        path: '/blog',
        component: PageBlog,
        exact: true,
        loadData: (): AppThunk[] => [fetchBlogData()],
      },
      {
        path: '/blog/:slug',
        component: PageBlogSingle,
        loadData: ({ params }: { params: { slug: string } }): AppThunk[] => [
          fetchBlogSingleData(params.slug),
        ],
      },
      {
        path: '/search',
        component: PageSearch,
        loadData: ({ req }: { req: Request }): AppThunk[] => {
          const searchQuery = req.query.s ? String(req.query.s) : '';
          return [fetchSearchData(searchQuery)];
        },
      },
      {
        path: '/:slug',
        component: Page,
        loadData: ({ params }: { params: { slug: string } }): AppThunk[] => [
          fetchPageData(params.slug),
        ],
      },
      {
        component: Page404,
      },
    ],
  },
];
