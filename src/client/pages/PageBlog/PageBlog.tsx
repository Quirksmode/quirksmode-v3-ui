import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Meta from 'components/Meta/Meta';
import Filter from 'components/Filter/Filter';
import Sidebar from 'components/Sidebar/Sidebar';
import PostItem from 'components/PostItem/PostItem';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import { fetchBlogData } from './PageBlog.actions';

/**
 * Blog Page
 *
 * @name PageBlog
 * @param {function} props.fetchBlogDataAction - Redux action to Fetch the Blog Page Data
 * @param {object} props.content - The content for this Page
 * @param {object} props.metadata - The metadata for this Page
 * @param {boolean} props.loading - Flag for while the data is being fetched
 * @param {boolean} props.error - Flag for if there is an error fetching the data
 * @param {array} props.blogCategories - The Blog Categories, used to populate the Filter
 * @param {array} props.blogTags - The Blog Tags, used to populate the Filter
 * @param {object} props.history - The history instance that you may use to navigate
 * @return {JSXElement}
 */
const PageBlog = ({
  fetchBlogDataAction,
  content,
  metadata,
  loading,
  error,
  blogCategories,
  blogTags,
  history
}) => {
  /**
   * @type {Object}
   * @property {string} content.title - The Page Title
   * @property {array} content.blogPosts - The Blog Posts
   */
  const {
    title,
    blogPosts
  } = content;

  /**
   * Fetch the Blog Page Data via Redux, this will trigger each time the filter updates the URL
   */
  useEffect(() => {
    fetchBlogDataAction(history.location.search);
  }, [fetchBlogDataAction, history.location.search]);

  return (
    <PageWrapper error={ error }>
      <div className="Page PageBlog">
        { metadata && <Meta { ...metadata } /> }
        <section className="Page__section Page__section--greyFade Page__section--withFilter clearfix">
          <div className="Page__sectionInner PagePortfolio__sketch grid">
            <h1>{ title }</h1>
            <Breadcrumbs>
              <span className="Breadcrumbs__divider">&gt;</span>
              <span className="Breadcrumbs__active">{ title }</span>
            </Breadcrumbs>
            <Filter history={ history } categories={ blogCategories } tags={ blogTags } fetchDataAction={ fetchBlogDataAction } type="blog" />
          </div>
        </section>
        <section className="Page__section Page__section--greyFade project-row-wrap clearfix">
          <div className="Page__section project-row clearfix">
            <div className="Page__sectionInner grid">
              <div className="PageBlog__posts grid__content">
                { blogPosts.length > 0 && blogPosts.map(post => (
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
    </PageWrapper>
  );
};

PageBlog.propTypes = {
  fetchBlogDataAction: PropTypes.func,
  content: PropTypes.object,
  metadata: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  blogCategories: PropTypes.array,
  blogTags: PropTypes.array,
  history: PropTypes.object
};

const mapStateToProps = ({ app, pageBlog }) => ({
  content: pageBlog.content,
  metadata: pageBlog.metadata,
  loading: pageBlog.loading,
  error: pageBlog.error,
  blogCategories: app.blogCategories,
  blogTags: app.blogTags
});

const mapDispatchToProps = dispatch => ({
  fetchBlogDataAction: (...args) => dispatch(fetchBlogData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageBlog);
