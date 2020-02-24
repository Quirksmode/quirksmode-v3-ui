import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { connectRouter } from 'connected-react-router';
import pageHome, { initialState as pageHomeState } from '../pages/PageHome/PageHome.reducer';
import pageAbout, { initialState as pageAboutState } from '../pages/PageAbout/PageAbout.reducer';
import pageContact, { initialState as pageContactState } from '../pages/PageContact/PageContact.reducer';
import pagePortfolio, { initialState as pagePortfolioState } from '../pages/PagePortfolio/PagePortfolio.reducer';
import pagePortfolioSingle, { initialState as pagePortfolioSingleState } from '../pages/PagePortfolioSingle/PagePortfolioSingle.reducer';
import pageBlog, { initialState as pageBlogState } from '../pages/PageBlog/PageBlog.reducer';
import pageBlogSingle, { initialState as pageBlogSingleState } from '../pages/PageBlogSingle/PageBlogSingle.reducer';
import pageSearch, { initialState as pageSearchState } from '../pages/PageSearch/PageSearch.reducer';
import pageContactForm, { initialState as pageContactFormState } from '../pages/PageContact/PageContactForm/PageContactForm.reducer';
import page, { initialState as pageState } from '../pages/Page/Page.reducer';
import app, { initialState as appState } from '../App.reducer';

export const initialState = {
  pageHome: pageHomeState,
  pageAbout: pageAboutState,
  pageContact: pageContactState,
  pagePortfolio: pagePortfolioState,
  pagePortfolioSingle: pagePortfolioSingleState,
  pageBlog: pageBlogState,
  pageBlogSingle: pageBlogSingleState,
  pageSearch: pageSearchState,
  pageContactForm: pageContactFormState,
  page: pageState,
  app: appState
};

const createRootReducer = history => combineReducers({
  router: history ? connectRouter(history) : {},
  pageHome,
  pageAbout,
  pageContact,
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
export default createRootReducer;
