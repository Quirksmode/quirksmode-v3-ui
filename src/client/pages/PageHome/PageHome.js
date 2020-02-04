import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchBlogSingleData } from 'pages/PageBlogSingle/PageBlogSingle.actions';
import Meta from 'components/Meta/Meta';
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
  content,
  metadata,
  loading,
  siteSettings,
  fetchHomeDataAction,
  fetchBlogSingleDataAction,
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

  useEffect(() => {
    if (!intro) fetchHomeDataAction();
  }, [fetchHomeDataAction, intro]);

  return intro && (
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
                action={ fetchBlogSingleDataAction }
                loading={ loading }
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

PageHome.propTypes = {
  content: PropTypes.object,
  metadata: PropTypes.object,
  siteSettings: PropTypes.object,
  fetchHomeDataAction: PropTypes.func
};

const mapStateToProps = ({
  pageHome,
  pageBlogSingle,
  app
}) => ({
  content: pageHome.content,
  metadata: pageHome.metadata,
  loading: pageBlogSingle.loading,
  siteSettings: app.siteSettings
});

const mapDispatchToProps = dispatch => ({
  fetchHomeDataAction: (...args) => dispatch(fetchHomeData(...args)),
  fetchBlogSingleDataAction: (...args) => dispatch(fetchBlogSingleData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageHome);
