import React, { useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import LogoNav from 'components/Header/LogoNav/LogoNav';
import { setUtility } from 'client/App.actions';
import { throttle } from 'lodash';
import IconSoundcloud from 'icons/soundcloud.svg';
import IconTwitter from 'icons/twitter.svg';
import IconLinkedin from 'icons/linkedin-circle.svg';
import IconGithub from 'icons/github.svg';
import IconSearch from 'icons/search.svg';
import IconMenu from 'icons/menu.svg';
import IconClose from 'icons/close.svg';
import { useTypedSelector } from 'client/redux/types';

/**
 * Utility Component
 */
const Utility = () => {
  const dispatch = useDispatch();
  const app = useTypedSelector((state) => state.app);
  const { utility } = app;
  if (!utility) return null;
  const { isNavToggled, isSearchToggled, isMenuBtnToggled } = utility;

  /**
   * Throttled Window Scroll Event to show/hide the menu button
   * when certain window conditions are met.
   */
  const onScroll = useCallback(
    throttle(() => {
      if (window.innerWidth > 480) {
        if (window.pageYOffset > 200) {
          dispatch(
            setUtility({
              ...utility,
              isMenuBtnToggled: true,
            })
          );
        } else {
          dispatch(
            setUtility({
              ...utility,
              isNavToggled: false,
              isMenuBtnToggled: false,
            })
          );
        }
      }
    }, 100),
    [setUtility, utility]
  );

  /**
   * On Click Event to show/hide the Nav Menu
   */
  const toggleNav = () => {
    dispatch(
      setUtility({
        ...utility,
        isNavToggled: !isNavToggled,
        isSearchToggled: false,
      })
    );
  };

  /**
   * On Click Event to show/hide the Search Bar
   */
  const toggleSearch = () => {
    dispatch(
      setUtility({
        ...utility,
        isNavToggled: false,
        isSearchToggled: !isSearchToggled,
      })
    );
  };

  /**
   * Add/remove Window Scroll Event listener when component mounts/dismounts
   */
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div className="Utility">
      <div
        className={`Utility__nav${isNavToggled ? ' Utility__nav--open' : ''}`}
      >
        <LogoNav />
      </div>
      <div
        className={`Utility__search${
          isSearchToggled ? ' Utility__search--open' : ''
        }`}
      >
        <p className="visuallyHidden" id="int_search">
          <strong>Search Quirksmode</strong>
        </p>
        <form
          role="search"
          method="get"
          className="Utility__search__form"
          action="/search"
        >
          <div className="Utility__search__inputWrap">
            <label htmlFor="Utility__search__input">
              <span className="visuallyHidden">Search for:</span>
              <input
                type="text"
                name="s"
                id="Utility__search__input"
                placeholder="Search..."
                className="Utility__search__input"
              />
            </label>
          </div>
          <button
            type="submit"
            id="Utility__search__submit"
            className="Utility__search__submit"
          >
            <span className="visuallyHidden">Submit</span>
            <IconSearch />
          </button>
        </form>
      </div>
      <div className="Utility__outer">
        <div className="Utility__inner grid">
          <div className="Utility__iconsWrap">
            <div className="Utility__icon Utility__icon--github">
              <a
                href="https://github.com/Quirksmode"
                rel="noopener noreferrer"
                title="Quirksmode's Github Page"
                target="_blank"
              >
                <span className="visuallyHidden">
                  Quirksmode&apos;s Github Page
                </span>
                <IconGithub />
              </a>
            </div>
            <div className="Utility__icon Utility__icon--twitter">
              <a
                href="http://www.twitter.com/quirksmode_uk"
                rel="noopener noreferrer"
                title="Quirksmode's Twitter Page"
                target="_blank"
              >
                <span className="visuallyHidden">
                  Quirksmode&apos;s Twitter Page
                </span>
                <IconTwitter />
              </a>
            </div>
            <div className="Utility__icon Utility__icon--linkedin">
              <a
                href="https://www.linkedin.com/in/david-plunkett-4552365/"
                rel="noopener noreferrer"
                title="Quirksmode's LinkedIn Page"
                target="_blank"
              >
                <span className="visuallyHidden">
                  Quirksmode&apos;s LinkedIn Page
                </span>
                <IconLinkedin />
              </a>
            </div>
            <div className="Utility__icon Utility__icon--soundcloud">
              <a
                href="https://soundcloud.com/quirksmode"
                rel="noopener noreferrer"
                title="Quirksmode's Soundcloud Profile"
                target="_blank"
              >
                <span className="visuallyHidden">
                  Quirksmode&apos;s Soundcloud Profile
                </span>
                <IconSoundcloud />
              </a>
            </div>
          </div>
          <div className="Utility__iconsWrap">
            <div
              className={`Utility__icon Utility__icon--search${
                isSearchToggled ? ' Utility__icon--search--open' : ''
              }`}
            >
              <button type="button" onClick={toggleSearch}>
                <span className="visuallyHidden">Toggle Search</span>
                {isSearchToggled ? (
                  <IconClose className="Utility__iconSvgClose" />
                ) : (
                  <IconSearch className="Utility__iconSvgSearch" />
                )}
              </button>
            </div>
            <div
              className={`Utility__icon Utility__icon--menu${
                isNavToggled ? ' Utility__icon--menu--open' : ''
              }${isMenuBtnToggled ? ' Utility__icon--menu--show' : ''}`}
            >
              <button type="button" onClick={toggleNav}>
                <span className="visuallyHidden">Toggle Navigation Menu</span>
                <IconMenu />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Utility;
