import React, {
  useEffect,
  Fragment
} from 'react';
import { renderRoutes } from 'react-router-config';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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
import { fetchAppData } from './App.actions';
import ScrollToTop from './ScrollToTop';

/**
 * Description
 *
 * @name App
 * @param  {func} props.fetchAppDataAction []
 * @param  {object} props.location []
 * @param  {object} props.route []
 */
const App = ({
  fetchAppDataAction,
  fetchHomeDataAction,
  fetchAboutDataAction,
  fetchPortfolioDataAction,
  fetchContactDataAction,
  fetchBlogDataAction,
  location,
  route
}) => {
  // Load all of the top page data on load
  useEffect(() => {
    fetchAppDataAction();
    fetchHomeDataAction();
    fetchAboutDataAction();
    fetchPortfolioDataAction();
    fetchContactDataAction();
    fetchBlogDataAction();
  }, [
    fetchAboutDataAction,
    fetchAppDataAction,
    fetchBlogDataAction,
    fetchContactDataAction,
    fetchHomeDataAction,
    fetchPortfolioDataAction
  ]);

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
  fetchAppDataAction: PropTypes.func,
  fetchHomeDataAction: PropTypes.func,
  fetchAboutDataAction: PropTypes.func,
  fetchPortfolioDataAction: PropTypes.func,
  fetchContactDataAction: PropTypes.func,
  fetchBlogDataAction: PropTypes.func,
  location: PropTypes.object,
  route: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  fetchAppDataAction: (...args) => dispatch(fetchAppData(...args)),
  fetchHomeDataAction: (...args) => dispatch(fetchHomeData(...args)),
  fetchAboutDataAction: (...args) => dispatch(fetchAboutData(...args)),
  fetchPortfolioDataAction: (...args) => dispatch(fetchPortfolioData(...args)),
  fetchContactDataAction: (...args) => dispatch(fetchContactData(...args)),
  fetchBlogDataAction: (...args) => dispatch(fetchBlogData(...args))
});

export default connect(null, mapDispatchToProps)(App);
