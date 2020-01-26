import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Frame from 'components/Frame/Frame';

/**
 * Description
 *
 * @name PageHomeBlog
 * @param  {object} props.latestBlogPosts []
 */
const PageHomeBlog = ({
  latestBlogPosts
}) => (
  <div className="PageHomeBlog">
    <div className="Page__headingWrap">
      <h2>General Shoutings</h2>
      <NavLink
        to="/blog"
        className="link--withHeading link--withIcon"
      >
        View My Blog
      </NavLink>
    </div>
    <div className="PageHomeBlog__posts">
      { latestBlogPosts.map(post => (
        <article className="PageHomeBlog__post" key={ post.postName }>
          <div className="PageHomeBlog__imgWrap">
            <NavLink
              to={ `/blog/${post.postName}` }
              title={ post.postTitle }
            >
              <Frame featuredImage={ post.featuredImage } size="Small" />
            </NavLink>
          </div>
          <div className="PageHomeBlog__textWrap">
            <header className="PageHomeBlog__textHeader">
              <h3 className="PageHomeBlog__postTitle">
                <NavLink
                  className="PageHomeBlog__postTitleLink"
                  to={ `/blog/${post.postName}` }
                  title={ post.postTitle }
                >
                  { post.postTitle }
                </NavLink>
              </h3>
              <p className="PageHomeBlog__postDate">
                { post.date }
              </p>
            </header>
            <section>
              <p className="PageHomeBlog__postExcerpt lineClamp lineClamp--3">
                { post.postExcerpt }
              </p>
              <NavLink
                to={ `/blog/${post.postName}` }
                title={ post.postTitle }
                className="PageHomeBlog__postLink link--withHeading link--withIcon"
              >
                Read More
              </NavLink>
            </section>
          </div>
        </article>
      ))
      }
    </div>
  </div>
);

PageHomeBlog.propTypes = {
  latestBlogPosts: PropTypes.array
};

export default PageHomeBlog;
