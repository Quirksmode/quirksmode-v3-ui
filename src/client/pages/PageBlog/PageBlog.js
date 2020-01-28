import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Filter from 'components/Filter/Filter';
import Sidebar from 'components/sidebar/sidebar';
import Frame from 'components/Frame/Frame';
import { fetchBlogSingleData } from 'pages/PageBlogSingle/PageBlogSingle.actions';
import { fetchBlogData } from './PageBlog.actions';

/**
 * Description
 *
 * @name PageBlog
 * @param  {object} props []
 */
const PageBlog = ({
  fetchBlogDataAction,
  fetchBlogSingleDataAction,
  title,
  blogPosts,
  blogCategories,
  blogTags,
  loading
}) => {
  useEffect(() => {
    if (!title) fetchBlogDataAction();
  }, [fetchBlogDataAction, title]);

  return title && (
    <div className="page PageBlog">
      <Helmet>
        <title>Portfolio Helmet Test</title>
        <meta property="og:title" content="Portfolio Page" />
      </Helmet>
      <section className="Page__section Page__section--greyFade Page__section--withFilter clearfix">
        <div className="Page__sectionInner PagePortfolio__sketch grid">
          <h1>{ title }</h1>
          <Breadcrumbs>
            <span className="Breadcrumbs__divider">&gt;</span>
            <span className="Breadcrumbs__active">{ title }</span>
          </Breadcrumbs>
          <Filter categories={ blogCategories } tags={ blogTags } fetchDataAction={ fetchBlogDataAction } type="blog" />
        </div>
      </section>
      <section className="Page__section Page__section--greyFade project-row-wrap clearfix">
        <div className="Page__section project-row clearfix">
          <div className="Page__sectionInner grid grid--sidebar">
            <div className="PageBlog__posts">
              { blogPosts.map((post) => {
                const {
                  ID,
                  featuredImage,
                  post_title: postTitle,
                  post_name: postName,
                  post_excerpt: postExcerpt,
                  date,
                } = post;

                return (
                  <article className="PageHomeBlog__post" key={ ID }>
                    { featuredImage && (
                      <div className="PageHomeBlog__imgWrap PageHomeBlog__imgWrap--large">
                        <Frame
                          key={ postName }
                          type="blog"
                          slug={ postName }
                          action={ fetchBlogSingleDataAction }
                          loading={ loading === postName }
                          featuredImage={ featuredImage }
                          title={ postTitle }
                          size="Medium"
                        />
                      </div>
                    )}
                    <div className="PageHomeBlog__textWrap">
                      <header className="PageHomeBlog__textHeader">
                        <h3 className="PageHomeBlog__postTitle">
                          <NavLink
                            className="PageHomeBlog__postTitleLink"
                            to={ `/blog/${postName}` }
                            title={ postTitle }
                          >
                            { postTitle }
                          </NavLink>
                        </h3>
                        <p className="PageHomeBlog__postDate">
                          { date }
                        </p>
                      </header>
                      <section>
                        <p className="PageHomeBlog__postExcerpt">
                          { postExcerpt }
                        </p>
                        <NavLink
                          to={ `/blog/${ID}` }
                          title={ postTitle }
                          className="PageHomeBlog__postLink link--withHeading link--withIcon"
                        >
                          Read More
                        </NavLink>
                      </section>
                    </div>
                  </article>
                );
              })}
            </div>
            <Sidebar />
          </div>
        </div>
      </section>
    </div>
  );
};

PageBlog.propTypes = {
  loading: PropTypes.string,
  fetchBlogDataAction: PropTypes.func,
  fetchBlogSingleDataAction: PropTypes.func,
  title: PropTypes.string,
  blogPosts: PropTypes.array,
  blogCategories: PropTypes.array,
  blogTags: PropTypes.array
};

const mapStateToProps = ({ app, pageBlog, pageBlogSingle }) => ({
  loading: pageBlogSingle.loading,
  title: pageBlog.title,
  blogPosts: pageBlog.blogPosts,
  blogCategories: app.blogCategories,
  blogTags: app.blogTags
});

const mapDispatchToProps = dispatch => ({
  fetchBlogDataAction: (...args) => dispatch(fetchBlogData(...args)),
  fetchBlogSingleDataAction: (...args) => dispatch(fetchBlogSingleData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageBlog);
