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
import ScrollToTop from 'components/ScrollToTop/ScrollToTop';

/**
 * Description
 *
 * @name App
 * @param  {func} props.fetchAppDataAction []
 * @param  {object} props.location []
 * @param  {object} props.route []
 */
const App = ({
  fetchHomeDataAction,
  fetchAboutDataAction,
  fetchPortfolioDataAction,
  fetchContactDataAction,
  fetchBlogDataAction,
  pageHomeContent,
  pageAboutContent,
  pagePortfolioContent,
  pageContactContent,
  pageBlogContent,
  location,
  route
}) => {
  // Load all of the top page data on load
  useEffect(() => {
    if (!pageHomeContent.title) fetchHomeDataAction();
    if (!pageAboutContent.title) fetchAboutDataAction();
    if (!pagePortfolioContent.title) fetchPortfolioDataAction();
    if (!pageContactContent.title) fetchContactDataAction();
    if (!pageBlogContent.title) fetchBlogDataAction();
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
  fetchHomeDataAction: PropTypes.func,
  fetchAboutDataAction: PropTypes.func,
  fetchPortfolioDataAction: PropTypes.func,
  fetchContactDataAction: PropTypes.func,
  fetchBlogDataAction: PropTypes.func,
  pageHomeContent: PropTypes.object,
  pageAboutContent: PropTypes.object,
  pagePortfolioContent: PropTypes.object,
  pageContactContent: PropTypes.object,
  pageBlogContent: PropTypes.object,
  location: PropTypes.object,
  route: PropTypes.object
};

const mapStateToProps = ({
  pageHome,
  pageAbout,
  pagePortfolio,
  pageContact,
  pageBlog
}) => ({
  pageHomeContent: pageHome.content,
  pageAboutContent: pageAbout.content,
  pagePortfolioContent: pagePortfolio.content,
  pageContactContent: pageContact.content,
  pageBlogContent: pageBlog.content,
});

const mapDispatchToProps = dispatch => ({
  fetchHomeDataAction: (...args) => dispatch(fetchHomeData(...args)),
  fetchAboutDataAction: (...args) => dispatch(fetchAboutData(...args)),
  fetchPortfolioDataAction: (...args) => dispatch(fetchPortfolioData(...args)),
  fetchContactDataAction: (...args) => dispatch(fetchContactData(...args)),
  fetchBlogDataAction: (...args) => dispatch(fetchBlogData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
