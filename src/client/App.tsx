import React, { useEffect, Fragment } from 'react';
import { renderRoutes } from 'react-router-config';
import { useDispatch } from 'react-redux';
import Header from 'components/Header/Header';
import Utility from 'components/Utility/Utility';
import Subfooter from 'components/Subfooter/Subfooter';
import Footer from 'components/Footer/Footer';
import AccessibilityLinks from 'components/AccessibilityLinks/AccessibilityLinks';
import { fetchHomeData } from 'pages/PageHome/PageHome.actions';
import { fetchAboutData } from 'pages/PageAbout/PageAbout.actions';
import { fetchContactData } from 'pages/PageContact/PageContact.actions';
import { fetchPortfolioData } from 'pages/PagePortfolio/PagePortfolio.actions';
import { fetchBlogData } from 'pages/PageBlog/PageBlog.actions';
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';
import { useTypedSelector } from './redux/types';
import { AppProps } from './App.types';

/**
 * App Component
 */
const App: React.FC<AppProps> = ({ route }) => {
  /**
   * Load all of the top page data on load. Note, for a larger site I would not take this approach,
   * but for this site it provides a fast/simple way to lazyload all the top level page data
   */
  const pageHomeTitle = useTypedSelector(
    ({ pageHome }) => pageHome.content.title
  );
  const pageAboutTitle = useTypedSelector(
    ({ pageAbout }) => pageAbout.content.title
  );
  const pagePortfolioTitle = useTypedSelector(
    ({ pagePortfolio }) => pagePortfolio.content.title
  );
  const pageContactTitle = useTypedSelector(
    ({ pageContact }) => pageContact.content.title
  );
  const pageBlogTitle = useTypedSelector(
    ({ pageBlog }) => pageBlog.content.title
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (!pageHomeTitle) dispatch(fetchHomeData());
    if (!pageAboutTitle) dispatch(fetchAboutData());
    if (!pagePortfolioTitle) dispatch(fetchPortfolioData());
    if (!pageContactTitle) dispatch(fetchContactData());
    if (!pageBlogTitle) dispatch(fetchBlogData());
  }, []);

  return (
    <Fragment>
      <ScrollToTop />
      <AccessibilityLinks />
      <Utility />
      <Header />
      <p className="visuallyHidden" id="intContent">
        <strong>Main Content</strong>
      </p>
      {renderRoutes(route.routes)}
      <Subfooter />
      <Footer />
    </Fragment>
  );
};

export default App;
