import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import IconHome from 'icons/home.svg';

/**
 * Description
 *
 * @name Breadcrumbs
 */
const Breadcrumbs = ({
  children
}) => (
  <div className="Breadcrumbs" data-test="Breadcrumbs">
    <NavLink
      to="/"
      className="Breadcrumbs__crumb Breadcrumbs__crumb--home"
    >
      <span className="visuallyHidden">Home</span>
      <IconHome />
    </NavLink>
    { children }
  </div>
);

Breadcrumbs.propTypes = {
  children: PropTypes.any
};

export default Breadcrumbs;
