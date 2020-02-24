import React, {
  useEffect,
  Fragment
} from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import {
  useSelector,
  useDispatch
} from 'react-redux';
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

/**
 * Description
 *
 * @name App
 * @param  {object} props.location
 * @param  {object} props.route
 */
const App = ({
  location,
  route
}) => {
  /**
   * Load all of the top page data on load. Note, I would not normally do this,
   * but it provides a fast/simple way to preload all the top level pages
   */
  const pageHomeTitle = useSelector(state => state.pageHome.content.title);
  const pageAboutTitle = useSelector(state => state.pageAbout.content.title);
  const pagePortfolioTitle = useSelector(state => state.pagePortfolio.content.title);
  const pageContactTitle = useSelector(state => state.pageContact.content.title);
  const pageBlogTitle = useSelector(state => state.pageBlog.content.title);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!pageHomeTitle) dispatch(fetchHomeData());
    if (!pageAboutTitle) dispatch(fetchAboutData());
    if (!pagePortfolioTitle) dispatch(fetchPortfolioData());
    if (!pageContactTitle) dispatch(fetchContactData());
    if (!pageBlogTitle) dispatch(fetchBlogData());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <ScrollToTop />
      <AccessibilityLinks />
      <Utility />
      <Header location={ location } />
      <p className="visuallyHidden" id="intContent">
        <strong>Main Content</strong>
      </p>
      {renderRoutes(route.routes)}
      <Subfooter />
      <Footer />
    </Fragment>
  );
};

App.propTypes = {
  location: PropTypes.object,
  route: PropTypes.object
};

export default App;
