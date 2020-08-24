import React from 'react';
import { NavLink } from 'react-router-dom';
import { fetchPageData } from 'pages/Page/Page.actions';
import { fetchBlogSingleData } from 'pages/PageBlogSingle/PageBlogSingle.actions';
import { fetchPortfolioSingleData } from 'pages/PagePortfolioSingle/PagePortfolioSingle.actions';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from 'client/redux/types';
import { LinkLoaderProps, LinkLoaderActionObj } from './LinkLoader.types';

/**
 * LinkLoader Component
 */
const LinkLoader: React.FC<LinkLoaderProps> = ({
  type = null,
  title = '',
  slug,
  children,
}) => {
  const dispatch = useDispatch();
  const { loadingSlug } = useTypedSelector(({ app }) => app);

  // Create the href based on the type e.g. Page, Portfolio or Blog
  const href = type !== 'page' ? `/${type}/${slug}` : `/${slug}`;

  // Object to store references to the actions
  const actionObj: LinkLoaderActionObj = {
    portfolio: fetchPortfolioSingleData,
    blog: fetchBlogSingleData,
    page: fetchPageData,
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (type) {
      dispatch(actionObj[type](slug, href));
    }
  };

  return (
    <NavLink
      to={href}
      onClick={(e) => handleClick(e)}
      className={`LinkLoader${
        loadingSlug === href ? ' LinkLoader--loading' : ''
      }`}
    >
      {title && <span className="visuallyHidden">{title}</span>}
      {children}
    </NavLink>
  );
};

export default LinkLoader;
