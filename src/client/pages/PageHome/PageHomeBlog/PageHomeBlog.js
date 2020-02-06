import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import PostItem from 'components/PostItem/PostItem';

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
        <PostItem
          key={ post.postID }
          post={ post }
          size="Small"
          lineClamp="3"
        />
      ))}
    </div>
  </div>
);

PageHomeBlog.propTypes = {
  latestBlogPosts: PropTypes.array
};

export default PageHomeBlog;
