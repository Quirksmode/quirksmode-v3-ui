import React, {
  useEffect,
  useState,
  Fragment,
  ChangeEvent,
  FormEvent,
} from 'react';
import { useDispatch } from 'react-redux';
import queryString from 'query-string';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import PostItem from 'components/PostItem/PostItem';
import IconSearch from 'icons/search.svg';
import { fetchSearchData } from './PageSearch.actions';
import { useLocation } from 'react-router-dom';
import { useTypedSelector } from 'client/redux/types';
import { RouteLocation } from './PageSearch.types';

/**
 * Search Page
 */
const PageSearch = () => {
  const dispatch = useDispatch();
  const location: RouteLocation = useLocation();
  const pageSearch = useTypedSelector((state) => state.pageSearch);

  const { content, metadata, loading, error } = pageSearch;
  if (!content) return null;
  const { title, searchPosts } = content;

  // React state mutator for setting the values
  const [value, setValue] = useState('');

  // Fetch the Search Page Data via Redux using the URL's Query String
  useEffect(() => {
    const queryVars = queryString.parse(location.search);
    const searchQuery = String(queryVars.s);
    setValue(searchQuery);
  }, [fetchSearchData, location.search]);

  /**
   * Event Handler to Fetch the Search data when the Search Input
   * changes
   */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    fetchSearchData(e.target.value);
  };

  /**
   * Event Handler to Fetch the Search data when the Search Form is
   * submitted
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchSearchData(value));
  };

  return (
    <PageWrapper error={error} loading={loading}>
      <div className="Page PageSearch">
        {metadata && <Meta {...metadata} />}
        <section className="Page__section Page__section--greyFade Page__section--withFilter">
          <div className="Page__sectionInner PagePortfolio__sketch grid">
            <h1>{title}</h1>
            <Breadcrumbs>
              <span className="Breadcrumbs__divider">&gt;</span>
              <span className="Breadcrumbs__active">{title}</span>
            </Breadcrumbs>
            <div className="Filter">
              <form
                role="search"
                className="PageSearch__searchForm"
                onSubmit={handleSubmit}
              >
                <div className="PageSearch__search">
                  <label
                    className="PageSearch__search"
                    htmlFor="PageSearch__searchInput"
                  >
                    <span className="visuallyHidden">Search Quirksmode</span>
                    <input
                      onChange={handleChange}
                      className="PageSearch__searchInput"
                      value={value}
                      placeholder="Search..."
                      type="text"
                      id="PageSearch__searchInput"
                      // eslint-disable-next-line jsx-a11y/no-autofocus
                      autoFocus
                    />
                  </label>
                </div>
                <button
                  type="submit"
                  className="PageSearch__submit visuallyHidden"
                >
                  <span className="visuallyHidden">Search</span>
                  <IconSearch />
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
              {searchPosts.length > 0 && value ? (
                searchPosts.map((post) => (
                  <PostItem key={post.postID} post={post} size="Medium" />
                ))
              ) : (
                <Fragment>
                  {value && <p>Sorry, that search has returned no results.</p>}
                </Fragment>
              )}
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default PageSearch;
