import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'client/redux/types';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import { fetchHomeData } from './PageHome.actions';
import PageHomeFeatured from './PageHomeFeatured/PageHomeFeatured';
import PageHomeIntro from './PageHomeIntro/PageHomeIntro';
import PageHomeSkills from './PageHomeSkills/PageHomeSkills';
import PageHomeBlog from './PageHomeBlog/PageHomeBlog';

/**
 * Home Page
 */
const PageHome: React.FC = () => {
  const dispatch = useDispatch();
  const pageHome = useTypedSelector((state) => state.pageHome);
  const app = useTypedSelector((state) => state.app);

  const { content, metadata, loading, error } = pageHome;
  const { featuredWork, intro, latestBlogPosts, skills } = content;
  const { cv } = app.siteSettings;

  // Fetch the Home Page Data via Redux, but only if the data does not already exist
  useEffect(() => {
    if (!intro) {
      dispatch(fetchHomeData());
    }
  }, [intro]);

  return useMemo(
    () => (
      <PageWrapper error={error} loading={loading}>
        <div className="page PageHome">
          {metadata && <Meta {...metadata} />}
          <h1 className="visuallyHidden">Welcome to Quirksmode</h1>
          {featuredWork?.length > 0 && (
            <PageHomeFeatured featuredWork={featuredWork} />
          )}
          <section className="Page__section">
            <div className="Page__sectionInner grid">
              <div className="PageHome__colWrap">
                <div className="PageHome__col">
                  {intro && <PageHomeIntro intro={intro} cv={cv} />}
                  {skills?.length > 0 && <PageHomeSkills skills={skills} />}
                </div>
                <div className="PageHome__col">
                  {latestBlogPosts?.length > 0 && (
                    <PageHomeBlog latestBlogPosts={latestBlogPosts} />
                  )}
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
