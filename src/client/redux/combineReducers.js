import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import pageHome from '../pages/PageHome/PageHome.reducer';
import pageAbout from '../pages/PageAbout/PageAbout.reducer';
import pagePortfolio from '../pages/PagePortfolio/PagePortfolio.reducer';
import pagePortfolioSingle from '../pages/PagePortfolioSingle/PagePortfolioSingle.reducer';
import pageBlog from '../pages/PageBlog/PageBlog.reducer';
import pageBlogSingle from '../pages/PageBlogSingle/PageBlogSingle.reducer';
import pageSearch from '../pages/PageSearch/PageSearch.reducer';
import pageContactForm from '../pages/PageContact/PageContactForm/PageContactForm.reducer';
import page from '../pages/Page/Page.reducer';
import app from '../App.reducer';

export default combineReducers({
  pageHome,
  pageAbout,
  pagePortfolio,
  pagePortfolioSingle,
  pageBlog,
  pageBlogSingle,
  pageSearch,
  pageContactForm,
  page,
  form,
  app
});
