import React, {
  useEffect,
  useState,
  Fragment
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import SVGInline from 'react-svg-inline';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Meta from 'components/Meta/Meta';
import PostItem from 'components/PostItem/PostItem';
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
  searchPosts,
  metadata
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
      <Meta { ...metadata } />
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
          <div className="PageSearch__posts">
            {value && (
              <h2>{`Showing results for the search term: ${value}`}</h2>
            )}
            { searchPosts.length > 0 && value ? searchPosts.map(post => (
              <PostItem
                key={ post.postID }
                post={ post }
                size="Medium"
              />
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
  searchPosts: PropTypes.array,
  metadata: PropTypes.object
};

const mapStateToProps = ({ pageSearch }) => ({
  title: pageSearch.title,
  searchPosts: pageSearch.searchPosts
});

const mapDispatchToProps = dispatch => ({
  fetchSearchDataAction: (...args) => dispatch(fetchSearchData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageSearch);
