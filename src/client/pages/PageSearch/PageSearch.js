import React, {
  useEffect,
  useState,
  Fragment
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import SVGInline from 'react-svg-inline';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import PostItem from 'components/PostItem/PostItem';
import { fetchSearchData } from './PageSearch.actions';
import IconSearch from '!!raw-loader!icons/search.svg';

/**
 * Search Page
 *
 * @name PageSearch
 * @param {function} props.fetchSearchDataAction - Redux action to Fetch the Search Page Data
 * @param {object} props.content - The content for this Page
 * @param {object} props.metadata - The metadata for this Page
 * @param {boolean} props.loading - Flag for while the data is being fetched
 * @param {boolean} props.error - Flag for if there is an error fetching the data
 * @param {object} props.location - The location used to parse the URL's Query String
 * @return {JSXElement}
 */
const PageSearch = ({
  fetchSearchDataAction,
  content,
  metadata,
  loading,
  error,
  location,
}) => {
  /**
   * @type {Object}
   * @property {string} content.title - The Page Title
   * @property {array} content.searchPosts - The Search Posts
   */
  const {
    title,
    searchPosts
  } = content;

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

  /**
   * Fetch the Search Page Data via Redux using the URL's Query String
   */
  useEffect(() => {
    const queryVars = queryString.parse(location.search);
    const searchQuery = queryVars.s;
    setValue(searchQuery);
  }, [fetchSearchDataAction, location.search]);

  /**
   * Event Handler to Fetch the Search data when the Search Input changes
   *
   * @name handleChange
   * @param {event} e - onChange Event for the Search Input
   */
  const handleChange = (e) => {
    setValue(e.target.value);
    fetchSearchDataAction(e.target.value);
  };

  /**
   * Event Handler to Fetch the Search data when the Search Form is submitted
   *
   * @name handleSubmit
   * @param {event} e - onClick Event for the Submit Button
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    fetchSearchDataAction(value);
  };

  return (
    <PageWrapper error={ error } loading={ loading }>
      <div className="Page PageSearch">
        { metadata && <Meta { ...metadata } /> }
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
    </PageWrapper>
  );
};

PageSearch.propTypes = {
  fetchSearchDataAction: PropTypes.func,
  content: PropTypes.object,
  metadata: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  location: PropTypes.object
};

const mapStateToProps = ({ pageSearch }) => ({
  content: pageSearch.content,
  loading: pageSearch.loading,
  error: pageSearch.error
});

const mapDispatchToProps = dispatch => ({
  fetchSearchDataAction: (...args) => dispatch(fetchSearchData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageSearch);
