import React, {
  useEffect,
  useCallback
} from 'react';
import { connect } from 'react-redux';
import SVGInline from 'react-svg-inline';
import LogoNav from 'components/Header/LogoNav/LogoNav';
import { setUtility } from 'client/App.actions';
import throttle from 'utils/throttle';
import IconSoundcloud from '!!raw-loader!icons/soundcloud.svg';
import IconTwitter from '!!raw-loader!icons/twitter.svg';
import IconLinkedin from '!!raw-loader!icons/linkedin-circle.svg';
import IconGithub from '!!raw-loader!icons/github.svg';
import IconSearch from '!!raw-loader!icons/search.svg';
import IconMenu from '!!raw-loader!icons/menu.svg';
import IconClose from '!!raw-loader!icons/close.svg';

/**
 * Description
 *
 * @name Utility
 */
const Utility = ({
  setUtilityAction,
  utility
}) => {
  const {
    isNavToggled,
    isSearchToggled,
    isMenuBtnToggled
  } = utility;

  const onScroll = useCallback(throttle(() => {
    if (window.innerWidth > 480) {
      if (window.pageYOffset > 200) {
        setUtilityAction({
          ...utility,
          isMenuBtnToggled: true
        });
      } else {
        setUtilityAction({
          ...utility,
          isNavToggled: false,
          isMenuBtnToggled: false
        });
      }
    }
  }, [setUtilityAction, utility], 100));

  const toggleNav = () => {
    setUtilityAction({
      ...utility,
      isNavToggled: !isNavToggled,
      isSearchToggled: false
    });
  };

  const toggleSearch = () => {
    setUtilityAction({
      ...utility,
      isNavToggled: false,
      isSearchToggled: !isSearchToggled
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [onScroll]);

  return (
    <div className="Utility">
      <div className={ `Utility__nav${isNavToggled ? ' Utility__nav--open' : ''}` }>
        <LogoNav setUtilityAction={ setUtilityAction } />
      </div>
      <div className={ `Utility__search${isSearchToggled ? ' Utility__search--open' : ''}` }>
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
            <label
              htmlFor="Utility__search__input"
            >
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
          <button type="submit" id="Utility__search__submit" className="Utility__search__submit">
            <span className="visuallyHidden">Submit</span>
            <SVGInline svg={ IconSearch } />
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
              >
                <span className="visuallyHidden">Quirksmode&apos;s Github Page</span>
                <SVGInline svg={ IconGithub } />
              </a>
            </div>
            <div className="Utility__icon Utility__icon--twitter">
              <a
                href="http://www.twitter.com/quirksmode_uk"
                rel="noopener noreferrer"
                title="Quirksmode's Twitter Page"
              >
                <span className="visuallyHidden">Quirksmode&apos;s Twitter Page</span>
                <SVGInline svg={ IconTwitter } />
              </a>
            </div>
            <div className="Utility__icon Utility__icon--linkedin">
              <a
                href="https://www.linkedin.com/in/david-plunkett-4552365/"
                rel="noopener noreferrer"
                title="Quirksmode's LinkedIn Page"
              >
                <span className="visuallyHidden">Quirksmode&apos;s LinkedIn Page</span>
                <SVGInline svg={ IconLinkedin } />
              </a>
            </div>
            <div className="Utility__icon Utility__icon--soundcloud">
              <a
                href="https://soundcloud.com/quirksmode"
                rel="noopener noreferrer"
                title="Quirksmode's Soundcloud Profile"
              >
                <span className="visuallyHidden">Quirksmode&apos;s Soundcloud Profile</span>
                <SVGInline svg={ IconSoundcloud } />
              </a>
            </div>
          </div>
          <div className="Utility__iconsWrap">
            <div className={ `Utility__icon Utility__icon--search${isSearchToggled ? ' Utility__icon--search--open' : ''}` }>
              <button
                type="button"
                onClick={ toggleSearch }
              >
                <span className="visuallyHidden">Toggle Search</span>
                <SVGInline className="Utility__iconSvgSearch" svg={ IconSearch } />
                <SVGInline className="Utility__iconSvgClose" svg={ IconClose } />
              </button>
            </div>
            <div className={ `Utility__icon Utility__icon--menu${isNavToggled ? ' Utility__icon--menu--open' : ''}${isMenuBtnToggled ? ' Utility__icon--menu--show' : ''}` }>
              <button
                type="button"
                onClick={ toggleNav }
              >
                <span className="visuallyHidden">Toggle Navigation Menu</span>
                <SVGInline svg={ IconMenu } />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ app }) => ({
  utility: app.utility
});

const mapDispatchToProps = dispatch => ({
  setUtilityAction: (...args) => dispatch(setUtility(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(Utility);
