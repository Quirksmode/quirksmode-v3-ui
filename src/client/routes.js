import App from './App';
import PageHome from './pages/PageHome/PageHome';
import PageAbout from './pages/PageAbout/PageAbout';
import PageBlog from './pages/PageBlog/PageBlog';
import PageBlogSingle from './pages/PageBlogSingle/PageBlogSingle';
import PageContact from './pages/PageContact/PageContact';
import PagePortfolio from './pages/PagePortfolio/PagePortfolio';
import PagePortfolioSingle from './pages/PagePortfolioSingle/PagePortfolioSingle';
import PageSearch from './pages/PageSearch/PageSearch';
import Page404 from './pages/Page404/Page404';
import Page from './pages/Page/Page';
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
    ...App,
    routes: [
      {
        component: PageHome,
        path: '/',
        exact: true,
        loadData: store => store.dispatch(fetchHomeData())
      },
      {
        component: PageAbout,
        path: '/about-me',
        exact: true,
        loadData: store => store.dispatch(fetchAboutData())
      },
      {
        component: PagePortfolio,
        path: '/portfolio',
        exact: true,
        loadData: store => store.dispatch(fetchPortfolioData())
      },
      {
        component: PagePortfolioSingle,
        path: '/portfolio/:slug',
        loadData: (store, match) => store.dispatch(fetchPortfolioSingleData(match.params.slug))
      },
      {
        component: PageContact,
        path: '/contact',
        exact: true,
        loadData: store => store.dispatch(fetchContactData())
      },
      {
        component: PageBlog,
        path: '/blog',
        exact: true,
        loadData: store => store.dispatch(fetchBlogData())
      },
      {
        component: PageBlogSingle,
        path: '/blog/:slug',
        loadData: (store, match) => store.dispatch(fetchBlogSingleData(match.params.slug))
      },
      {
        component: PageSearch,
        path: '/search',
        loadData: (store, match, queryVars) => {
          const searchQuery = queryVars.s ? queryVars.s : '';
          return store.dispatch(fetchSearchData(searchQuery));
        }
      },
      {
        component: Page,
        path: '/:slug',
        loadData: store => store.dispatch(fetchPageData())
      },
      {
        component: Page404
      }
    ]
  }
];
