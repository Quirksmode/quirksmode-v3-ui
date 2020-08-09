import React from 'react';
import {
  useSelector as useSelectorGeneric,
  useDispatch,
  TypedUseSelectorHook,
} from 'react-redux';
import { NavLink } from 'react-router-dom';
import { setUtility } from 'client/App.actions';
import { StoreState } from 'src/types';

// Assign Types to the Redux Hooks
export const useSelector: TypedUseSelectorHook<StoreState> = useSelectorGeneric;

const LogoNav = () => {
  const mainLogo = useSelector((state) => state.app.siteSettings?.mainLogo);
  const navItems = useSelector((state) => state.app.navItems);
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      setUtility({
        isNavToggled: false,
        isSearchToggled: false,
      })
    );
  };

  return (
    <div className="LogoNav">
      {mainLogo?.sizes.image && (
        <NavLink className="LogoNav__logo" exact to="/">
          <picture data-test="logo">
            <source
              type="image/webp"
              srcSet={`${mainLogo.sizes.image}.webp 1x, ${mainLogo.sizes.image2x}.webp 2x`}
            />
            <img
              className="img--responsive"
              srcSet={`${mainLogo.sizes.image} 1x, ${mainLogo.sizes.image2x} 2x`}
              src={mainLogo.sizes.image}
              alt={mainLogo.alt}
              width={mainLogo.width}
              height={mainLogo.height}
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
          {navItems &&
            navItems.map((item) => (
              <li className="LogoNav__nav__item" key={item.id}>
                <NavLink
                  onClick={() => handleClick()}
                  className="LogoNav__nav__link"
                  exact={item.slug === '/'}
                  activeClassName="selected"
                  to={item.slug}
                >
                  {item.title}
                </NavLink>
              </li>
            ))}
        </ul>
      </nav>
    </div>
  );
};

export default LogoNav;
