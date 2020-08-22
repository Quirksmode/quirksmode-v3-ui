import React from 'react';
import { NavLink } from 'react-router-dom';
import IconHome from 'icons/home.svg';
import { BreadcrumbsProps } from './Breadcrumbs.types';

/**
 * Breadcrumbs Component
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ children }) => (
  <div className="Breadcrumbs" data-test="Breadcrumbs">
    <NavLink to="/" className="Breadcrumbs__crumb Breadcrumbs__crumb--home">
      <span className="visuallyHidden">Home</span>
      <IconHome />
    </NavLink>
    {children}
  </div>
);

export default Breadcrumbs;
