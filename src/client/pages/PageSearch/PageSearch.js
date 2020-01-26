import React, {
  useEffect,
  useState,
  Fragment
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import { NavLink } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Frame from 'components/Frame/Frame';
import { fetchSearchData } from './PageSearch.actions';
import IconSearch from '!!raw-loader!icons/search.svg';

/**
 * Description
 *
 * @name PageSearch
 * @param  {object} props []
 */
const PageSearch = ({
  fetchSearchDataAction,
  location,
  title,
  searchPosts
}) => {
  /**
   * react state mutator for setting the values
   *
   * @name useState
   * @type {function}
   */
  const [
    value,
    setValue
  ] = useState('');

  useEffect(() => {
    const queryVars = queryString.parse(location.search);
    const searchQuery = queryVars.s;
    setValue(searchQuery);
  }, [fetchSearchDataAction, location.search]);

  const handleChange = (e) => {
    setValue(e.target.value);
    fetchSearchDataAction(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchDataAction(value);
  };

  return title && (
    <div className="Page PageSearch">
      <Helmet>
        <title>Portfolio Helmet Test</title>
        <meta property="og:title" content="Portfolio Page" />
      </Helmet>
      <section className="Page__section Page__section--greyFade Page__section--withFilter">
        <div className="Page__sectionInner PagePortfolio__sketch grid">
          <h1>{ title }</h1>
          <Breadcrumbs>
            <span className="Breadcrumbs__divider">&gt;</span>
            <span className="Breadcrumbs__active">{ title }</span>
          </Breadcrumbs>
          <div className="Filter">
            <form
              role="search"
              className="PageSearch__searchForm"
              onSubmit={ handleSubmit }
            >
              <div className="PageSearch__search">
                <label className="PageSearch__search" htmlFor="PageSearch__searchInput">
                  <span className="visuallyHidden">Search Quirksmode</span>
                  <input
                    onChange={ handleChange }
                    className="PageSearch__searchInput"
                    value={ value }
                    placeholder="Search..."
                    type="text"
                    id="PageSearch__searchInput"
                    // eslint-disable-next-line jsx-a11y/no-autofocus
                    autoFocus
                  />
                </label>
              </div>
              <button type="submit" className="PageSearch__submit visuallyHidden">
                <span className="visuallyHidden">Search</span>
                <SVGInline svg={ IconSearch } />
              </button>
            </form>
          </div>
        </div>
      </section>
      <section className="Page__section Page__section--greyFade">
        <div className="Page__sectionInner grid grid--sidebar">
          <div className="PageBlog__posts">
            {value && (
              <h2>{`Showing results for the search term: ${value}`}</h2>
            )}
            { searchPosts.length > 0 && value ? searchPosts.map(post => (
              <article className="PageHomeBlog__post" key={ post.ID }>
                { post.featuredImage && (
                <div className="PageHomeBlog__imgWrap PageHomeBlog__imgWrap--large">
                  <NavLink
                    to={ `/blog/${post.post_name}` }
                    title={ post.post_title }
                  >
                    <Frame featuredImage={ post.featuredImage } />
                  </NavLink>
                </div>
                )}
                <div className="PageHomeBlog__textWrap">
                  <header className="PageHomeBlog__textHeader">
                    <h3 className="PageHomeBlog__postTitle">
                      <NavLink
                        className="PageHomeBlog__postTitleLink"
                        to={ `/blog/${post.post_name}` }
                        title={ post.post_title }
                      >
                        { post.post_title }
                      </NavLink>
                    </h3>
                    <p className="PageHomeBlog__postDate">
                      { post.date }
                    </p>
                  </header>
                  <section>
                    <p className="PageHomeBlog__postExcerpt">
                      { post.post_excerpt }
                    </p>
                    <NavLink
                      to={ `/blog/${post.post_name}` }
                      title={ post.post_title }
                      className="PageHomeBlog__postLink link--withHeading link--withIcon"
                    >
                      Read More
                    </NavLink>
                  </section>
                </div>
              </article>
            )) : (
              <Fragment>
                { value && (
                  <p>Sorry, that search has returned no results.</p>
                )}
              </Fragment>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

PageSearch.propTypes = {
  fetchSearchDataAction: PropTypes.func,
  title: PropTypes.string,
  searchPosts: PropTypes.array
};

const mapStateToProps = ({ pageSearch }) => ({
  title: pageSearch.title,
  searchPosts: pageSearch.searchPosts
});

const mapDispatchToProps = dispatch => ({
  fetchSearchDataAction: (...args) => dispatch(fetchSearchData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageSearch);
