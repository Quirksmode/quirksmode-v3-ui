import React, { useEffect, useMemo } from 'react';
import {
  useSelector as useSelectorGeneric,
  useDispatch,
  TypedUseSelectorHook
} from 'react-redux';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import { fetchHomeData } from './PageHome.actions';
import PageHomeFeatured from './PageHomeFeatured/PageHomeFeatured';
import PageHomeIntro from './PageHomeIntro/PageHomeIntro';
import PageHomeSkills from './PageHomeSkills/PageHomeSkills';
import PageHomeBlog from './PageHomeBlog/PageHomeBlog';
import { StoreState } from 'src/types';

export const useSelector: TypedUseSelectorHook<StoreState> = useSelectorGeneric;

/**
 * Home Page
 *
 * @name PageHome
 * @param {function} props.fetchHomeDataAction - Redux action to Fetch the Home Page Data
 * @param {object} props.content - The content for this Page
 * @param {object} props.metadata - The metadata for this Page
 * @param {boolean} props.loading - Flag for while the data is being fetched
 * @param {boolean} props.error - Flag for if there is an error fetching the data
 * @param {object} props.siteSettings - The Global Site Settings
 * @return {JSXElement}
 */
const PageHome = () => {
  // Apply the Redux Hooks
  const pageHome = useSelector(state => state.pageHome);
  const app = useSelector(state => state.app);
  const dispatch = useDispatch();

  const { content, metadata, loading, error } = pageHome;

  const { siteSettings } = app;

  /**
   * @type {Object}
   * @property {array} content.featuredWork - For the featured work Slider
   * @property {object} content.intro - Intro content
   * @property {array} content.latestBlogPosts - Latest Blog Posts
   * @property {array} content.skills - List of skills
   */
  const { featuredWork, intro, latestBlogPosts, skills } = content;

  /**
   * @type {Object}
   * @property {object} siteSettings.cv - CV data from the Global Site Settings
   */
  const { cv } = siteSettings;

  /**
   * Fetch the Home Page Data via Redux, but only if the data does not already exist
   */
  useEffect(() => {
    if (!intro) {
      dispatch(fetchHomeData());
    }
  }, [dispatch, intro]);

  return useMemo(
    () => (
      <PageWrapper error={error} loading={loading}>
        <div className="page PageHome">
          {metadata && <Meta {...metadata} />}
          <h1 className="visuallyHidden">Welcome to Quirksmode</h1>
          {featuredWork.length > 0 && (
            <PageHomeFeatured featuredWork={featuredWork} />
          )}
          <section className="Page__section">
            <div className="Page__sectionInner grid">
              <div className="PageHome__colWrap">
                <div className="PageHome__col">
                  {intro && <PageHomeIntro intro={intro} cv={cv} />}
                  {skills.length > 0 && <PageHomeSkills skills={skills} />}
                </div>
                <div className="PageHome__col">
                  <PageHomeBlog
                    latestBlogPosts={latestBlogPosts}
                    loading={loading}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </PageWrapper>
    ),
    [cv, error, featuredWork, intro, latestBlogPosts, loading, metadata, skills]
  );
};

export default PageHome;
