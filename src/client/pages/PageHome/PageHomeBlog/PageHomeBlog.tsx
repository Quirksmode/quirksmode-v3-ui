import React from 'react';
import { NavLink } from 'react-router-dom';
import PostItem from 'components/PostItem/PostItem';
import { PageHomeBlogProps } from './PageHomeBlog.types';

/**
 * Home Page Latest Blog Posts
 */
const PageHomeBlog: React.FC<PageHomeBlogProps> = ({ latestBlogPosts }) => (
  <div className="PageHomeBlog">
    <div className="Page__headingWrap">
      <h2>General Shoutings</h2>
      <NavLink to="/blog" className="link--withHeading link--withIcon">
        View My Blog
      </NavLink>
    </div>
    <div className="PageHomeBlog__posts">
      {latestBlogPosts.map((post) => (
        <PostItem key={post.postID} post={post} size="Small" lineClamp="3" />
      ))}
    </div>
  </div>
);

export default PageHomeBlog;
