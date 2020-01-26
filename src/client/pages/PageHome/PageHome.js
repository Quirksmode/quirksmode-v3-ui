import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
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
  cv,
  featuredWork,
  intro,
  latestBlogPosts,
  skills
}) => {
  useEffect(() => {
    if (!intro) fetchHomeDataAction();
  }, [fetchHomeDataAction, intro]);

  return intro && (
    <div className="page PageHome">
      <Helmet>
        <title>Home Page Helmet Test</title>
        <meta property="og:title" content="Home Page" />
      </Helmet>
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
              <PageHomeBlog latestBlogPosts={ latestBlogPosts } />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

PageHome.propTypes = {
  fetchHomeDataAction: PropTypes.func,
  cv: PropTypes.object,
  featuredWork: PropTypes.array,
  intro: PropTypes.object,
  latestBlogPosts: PropTypes.array,
  skills: PropTypes.array
};

const mapStateToProps = ({ app, pageHome }) => ({
  cv: app.siteSettings.cv,
  featuredWork: pageHome.featuredWork,
  intro: pageHome.intro,
  latestBlogPosts: pageHome.latestBlogPosts,
  skills: pageHome.skills
});

const mapDispatchToProps = dispatch => ({
  fetchHomeDataAction: (...args) => dispatch(fetchHomeData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageHome);
