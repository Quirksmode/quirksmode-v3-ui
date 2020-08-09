import App from './App';
import PageHome from './pages/PageHome';
import PageAbout from './pages/PageAbout';
import PageBlog from './pages/PageBlog/PageBlog';
import PageBlogSingle from './pages/PageBlogSingle';
import PageContact from './pages/PageContact';
import PagePortfolio from './pages/PagePortfolio';
import PagePortfolioSingle from './pages/PagePortfolioSingle';
import PageSearch from './pages/PageSearch';
import Page404 from './pages/Page404';
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

export default [
  {
    component: App,
    loadData: (store) => store.dispatch(fetchAppData()),
    routes: [
      {
        component: PageHome,
        path: '/',
        exact: true,
        loadData: (store) => store.dispatch(fetchHomeData()),
      },
      {
        component: PageAbout,
        path: '/about-me',
        exact: true,
        loadData: (store) => store.dispatch(fetchAboutData()),
      },
      {
        component: PagePortfolio,
        path: '/portfolio',
        exact: true,
        loadData: (store) => store.dispatch(fetchPortfolioData()),
      },
      {
        component: PagePortfolioSingle,
        path: '/portfolio/:slug',
        loadData: (store, match) =>
          store.dispatch(fetchPortfolioSingleData(match.params.slug)),
      },
      {
        component: PageContact,
        path: '/contact',
        exact: true,
        loadData: (store) => store.dispatch(fetchContactData()),
      },
      {
        component: PageBlog,
        path: '/blog',
        exact: true,
        loadData: (store) => store.dispatch(fetchBlogData()),
      },
      {
        component: PageBlogSingle,
        path: '/blog/:slug',
        loadData: (store, match) =>
          store.dispatch(fetchBlogSingleData(match.params.slug)),
      },
      {
        component: PageSearch,
        path: '/search',
        loadData: (store, match, queryVars) => {
          const searchQuery = queryVars.s ? queryVars.s : '';
          return store.dispatch(fetchSearchData(searchQuery));
        },
      },
      {
        component: Page,
        path: '/:slug',
        loadData: (store) => store.dispatch(fetchPageData()),
      },
      {
        component: Page404,
      },
    ],
  },
];
