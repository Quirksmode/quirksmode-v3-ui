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
 * Description
 *
 * @name PageBlog
 * @param  {object} props []
 */
const PageBlog = ({
  fetchBlogDataAction,
  content,
  metadata,
  blogCategories,
  blogTags,
  error,
  history
}) => {
  const {
    title,
    blogPosts
  } = content;

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
              <div className="PageBlog__posts grid__content grid__content--center">
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
  error: PropTypes.bool,
  blogCategories: PropTypes.array,
  blogTags: PropTypes.array,
  history: PropTypes.object
};

const mapStateToProps = ({ app, pageBlog }) => ({
  content: pageBlog.content,
  metadata: pageBlog.metadata,
  error: pageBlog.error,
  blogCategories: app.blogCategories,
  blogTags: app.blogTags
});

const mapDispatchToProps = dispatch => ({
  fetchBlogDataAction: (...args) => dispatch(fetchBlogData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageBlog);
