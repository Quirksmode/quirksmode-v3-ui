import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { fetchPageData } from 'pages/Page/Page.actions';
import { fetchBlogSingleData } from 'pages/PageBlogSingle/PageBlogSingle.actions';
import { fetchPortfolioSingleData } from 'pages/PagePortfolioSingle/PagePortfolioSingle.actions';
import { connect } from 'react-redux';

/**
 * LinkLoader Component
 *
 * @name LinkLoader
 * @param  {boolean} props.isNew [Show/Hide the New indicator]
 */
const LinkLoader = ({
  type = null,
  title = '',
  slug,
  children,
  fetchPageDataAction,
  fetchPortfolioSingleDataAction,
  fetchBlogSingleDataAction,
  loadingSlug
}) => {
  /**
   * Create the href based on the type e.g. Page, Portfolio or Blog
   *
   * @name href
   * @type {object}
   */
  const href = type !== 'page' ? `/${type}/${slug}` : `/${slug}`;

  /**
   * Object to store references to the actions
   *
   * @name actionObj
   * @type {object}
   */
  const actionObj = {
    portfolio: fetchPortfolioSingleDataAction,
    blog: fetchBlogSingleDataAction,
    page: fetchPageDataAction
  };

  const handleClick = (e) => {
    e.preventDefault();
    if (type) {
      actionObj[type](slug, href);
    }
  };

  return (
    <NavLink
      to={ href }
      onClick={ e => handleClick(e) }
      className={ `LinkLoader${loadingSlug === href ? ' LinkLoader--loading' : ''}` }
    >
      { title && <span className="visuallyHidden">{ title }</span> }
      { children }
    </NavLink>
  );
};

LinkLoader.propTypes = {
  type: PropTypes.string,
  slug: PropTypes.string,
  children: PropTypes.any,
  fetchPageDataAction: PropTypes.func,
  fetchPortfolioSingleDataAction: PropTypes.func,
  fetchBlogSingleDataAction: PropTypes.func,
  loadingSlug: PropTypes.string
};

const mapStateToProps = ({ app }) => ({
  loadingSlug: app.loadingSlug
});

const mapDispatchToProps = dispatch => ({
  fetchPageDataAction: (...args) => dispatch(fetchPageData(...args)),
  fetchPortfolioSingleDataAction: (...args) => dispatch(fetchPortfolioSingleData(...args)),
  fetchBlogSingleDataAction: (...args) => dispatch(fetchBlogSingleData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkLoader);
