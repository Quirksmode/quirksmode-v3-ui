import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Meta from 'components/Meta/Meta';
import Filter from 'components/Filter/Filter';
import Sidebar from 'components/Sidebar/Sidebar';
import PostItem from 'components/PostItem/PostItem';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import { fetchBlogData } from './PageBlog.actions';
import { useTypedSelector } from 'client/redux/types';
import { useHistory } from 'react-router-dom';
import { RouteHistory } from './PageBlog.types';

/**
 * Blog Page
 */
const PageBlog: React.FC = () => {
  const dispatch = useDispatch();
  const history: RouteHistory = useHistory();
  const pageBlog = useTypedSelector((state) => state.pageBlog);
  const app = useTypedSelector((state) => state.app);

  const { content, metadata, error } = pageBlog;
  if (!content) return null;
  const { title, blogPosts } = content;
  const { blogCategories, blogTags } = app;

  /**
   * Fetch the Blog Page Data via Redux, this will trigger each time the filter updates the URL
   */
  useEffect(() => {
    dispatch(fetchBlogData(history.location.search));
  }, [fetchBlogData, history.location.search]);

  return (
    <PageWrapper error={error}>
      <div className="Page PageBlog">
        {metadata && <Meta {...metadata} />}
        <section className="Page__section Page__section--greyFade Page__section--withFilter clearfix">
          <div className="Page__sectionInner PagePortfolio__sketch grid">
            <h1>{title}</h1>
            <Breadcrumbs>
              <span className="Breadcrumbs__divider">&gt;</span>
              <span className="Breadcrumbs__active">{title}</span>
            </Breadcrumbs>
            <Filter categories={blogCategories} tags={blogTags} type="blog" />
          </div>
        </section>
        <section className="Page__section Page__section--greyFade project-row-wrap clearfix">
          <div className="Page__section project-row clearfix">
            <div className="Page__sectionInner grid">
              <div className="PageBlog__posts grid__content">
                {blogPosts.length > 0 &&
                  blogPosts.map((post) => (
                    <PostItem key={post.postID} post={post} size="Medium" />
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

export default PageBlog;
