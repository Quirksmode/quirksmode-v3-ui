import React, { useEffect, useMemo } from 'react';
import {
  useSelector as useSelectorGeneric,
  useDispatch,
  TypedUseSelectorHook,
} from 'react-redux';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import { fetchHomeData } from './PageHome.actions';
import PageHomeFeatured from './PageHomeFeatured/PageHomeFeatured';
import PageHomeIntro from './PageHomeIntro/PageHomeIntro';
import PageHomeSkills from './PageHomeSkills/PageHomeSkills';
import PageHomeBlog from './PageHomeBlog/PageHomeBlog';
import { StoreState } from 'src/types';

// Assign Types to the Redux Hooks
export const useSelector: TypedUseSelectorHook<StoreState> = useSelectorGeneric;

/**
 * Home Page Component
 */
const PageHome = () => {
  // Redux Hooks
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const pageHome = useSelector((state) => state.pageHome);
  const app = useSelector((state) => state.app);

  console.log('app', app);
  console.log('state', state);
  console.log('pageHome', pageHome);

  const { content, metadata, loading, error } = pageHome;
  if (!content) return null;
  const { featuredWork, intro, latestBlogPosts, skills } = content;

  if (!app.siteSettings) return null;
  const { cv } = app.siteSettings;

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
    [app, content, error, loading, metadata]
  );
};

export default PageHome;
