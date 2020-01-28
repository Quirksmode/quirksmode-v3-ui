import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Filter from 'components/Filter/Filter';
import Sidebar from 'components/sidebar/sidebar';
import PostItem from 'components/PostItem/PostItem';
import { fetchBlogData } from './PageBlog.actions';

/**
 * Description
 *
 * @name PageBlog
 * @param  {object} props []
 */
const PageBlog = ({
  fetchBlogDataAction,
  title,
  blogPosts,
  blogCategories,
  blogTags
}) => title && (
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
        <div className="Page__sectionInner grid">
          <div className="PageBlog__posts grid__content grid__content--center">
            { blogPosts.map(post => (
              <PostItem
                key={ post.postID }
                post={ post }
                size="Medium"
              />
            ))}
          </div>
          <Sidebar />
        </div>
      </div>
    </section>
  </div>
);

PageBlog.propTypes = {
  loading: PropTypes.string,
  fetchBlogDataAction: PropTypes.func,
  title: PropTypes.string,
  blogPosts: PropTypes.array,
  blogCategories: PropTypes.array,
  blogTags: PropTypes.array
};

const mapStateToProps = ({ app, pageBlog }) => ({
  title: pageBlog.title,
  blogPosts: pageBlog.blogPosts,
  blogCategories: app.blogCategories,
  blogTags: app.blogTags
});

const mapDispatchToProps = dispatch => ({
  fetchBlogDataAction: (...args) => dispatch(fetchBlogData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageBlog);
