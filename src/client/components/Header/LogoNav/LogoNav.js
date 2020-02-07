import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const LogoNav = ({
  mainLogo,
  navItems
}) => (
  <div className="LogoNav">
    { mainLogo.sizes.image && (
      <NavLink
        className="LogoNav__logo"
        exact
        to="/"
      >
        <picture>
          <source
            type="image/webp"
            srcSet={ `${mainLogo.sizes.image}.webp 1x, ${mainLogo.sizes.image2x}.webp 2x` }
          />
          <img
            className="img--responsive"
            srcSet={ `${mainLogo.sizes.image} 1x, ${mainLogo.sizes.image2x} 2x` }
            src={ mainLogo.sizes.image }
            alt={ mainLogo.alt }
            width={ mainLogo.width }
            height={ mainLogo.height }
            loading="lazy"
          />
        </picture>
      </NavLink>
    )}
    <nav className="LogoNav__nav">
      <p className="visuallyHidden">
        <strong>Main Navigation</strong>
      </p>
      <ul className="LogoNav__nav__items">
        { navItems
        && navItems.map(item => (
          <li className="LogoNav__nav__item" key={ item.id }>
            <NavLink
              className="LogoNav__nav__link"
              exact={ item.slug === '/' }
              activeClassName="selected"
              to={ item.slug }
            >
              { item.title }
            </NavLink>
          </li>
        ))
      }
      </ul>
    </nav>
  </div>
);

LogoNav.propTypes = {
  mainLogo: PropTypes.object,
  navItems: PropTypes.array
};

const mapStateToProps = ({ app }) => ({
  mainLogo: app.siteSettings.mainLogo,
  navItems: app.navItems
});

export default connect(mapStateToProps, null)(LogoNav);
