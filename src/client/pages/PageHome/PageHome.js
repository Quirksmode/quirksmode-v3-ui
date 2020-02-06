import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import { fetchHomeData } from './PageHome.actions';
import PageHomeFeatured from './PageHomeFeatured/PageHomeFeatured';
import PageHomeIntro from './PageHomeIntro/PageHomeIntro';
import PageHomeSkills from './PageHomeSkills/PageHomeSkills';
import PageHomeBlog from './PageHomeBlog/PageHomeBlog';

/**
 * Description
 *
 * @name PageHome
 * @param  {object} props.cv []
 */
const PageHome = ({
  fetchHomeDataAction,
  content,
  metadata,
  loading,
  error,
  siteSettings
}) => {
  const {
    featuredWork,
    intro,
    latestBlogPosts,
    skills
  } = content;

  const {
    cv
  } = siteSettings;

  // useEffect(() => {
  //   if (!intro) fetchHomeDataAction();
  // }, [fetchHomeDataAction, intro]);

  return (
    <PageWrapper error={ error } loading={ loading }>
      <div className="page PageHome">
        <Meta { ...metadata } />
        <h1 className="visuallyHidden">Welcome to Quirksmode</h1>
        { featuredWork.length > 0 && <PageHomeFeatured featuredWork={ featuredWork } /> }
        <section className="Page__section">
          <div className="Page__sectionInner grid">
            <div className="PageHome__colWrap">
              <div className="PageHome__col">
                { intro && <PageHomeIntro intro={ intro } cv={ cv } /> }
                { skills.length > 0 && <PageHomeSkills skills={ skills } /> }
              </div>
              <div className="PageHome__col">
                <PageHomeBlog
                  latestBlogPosts={ latestBlogPosts }
                  loading={ loading }
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

PageHome.propTypes = {
  fetchHomeDataAction: PropTypes.func,
  content: PropTypes.object,
  metadata: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  siteSettings: PropTypes.object
};

const mapStateToProps = ({
  pageHome,
  app
}) => ({
  content: pageHome.content,
  metadata: pageHome.metadata,
  loading: pageHome.loading,
  error: pageHome.error,
  siteSettings: app.siteSettings
});

const mapDispatchToProps = dispatch => ({
  fetchHomeDataAction: (...args) => dispatch(fetchHomeData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageHome);
