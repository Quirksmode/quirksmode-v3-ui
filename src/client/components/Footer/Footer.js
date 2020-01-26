import React, {
  useState
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import IconSoundcloud from '!!raw-loader!icons/soundcloud.svg';
import IconTwitter from '!!raw-loader!icons/twitter.svg';
import IconLinkedin from '!!raw-loader!icons/linkedin-circle.svg';
import IconGithub from '!!raw-loader!icons/github.svg';
import IconMenu from '!!raw-loader!icons/menu.svg';

/**
 * Description
 *
 * @name footer
 */
const Footer = ({
  footerNavItems
}) => {
  /**
   * react state mutator for setting the isNavToggled boolean
   *
   * @name useState
   * @type {function}
   */
  const [
    isNavToggled,
    setIsNavToggled
  ] = useState(false);

  const toggleNav = () => {
    if (isNavToggled) {
      document.body.classList.remove('Footer__nav--open');
    } else {
      document.body.classList.add('Footer__nav--open');
    }

    setIsNavToggled(!isNavToggled);
  };

  return (
    <footer id="Footer" className="Footer">
      <p className="visuallyHidden" id="intFooterr">
        <strong>Footer</strong>
      </p>
      <div className="Footer__innerWrap grid">
        <nav role="navigation" className="Footer__nav">
          <ul className="Footer__navItems">
            <li className="Footer__navItem">
              <NavLink
                className="Footer__navLink Footer__navLink--quirksmode"
                exact
                activeClassName="selected"
                to="/"
              >
                Quirks
                <span>mode</span>
              </NavLink>
            </li>
            { footerNavItems && footerNavItems.map(item => (
              <li className="Footer__navItem" key={ item.id }>
                <NavLink
                  className="Footer__navLink"
                  exact
                  activeClassName="Footer__navLink--selected"
                  to={ item.slug }
                >
                  { item.title }
                </NavLink>
              </li>
            ))
            }
          </ul>
        </nav>
        <div className="Footer__iconsWrap">
          <div className="Utility__icon Utility__icon--github">
            <a
              href="#"
              rel="bookmark"
              title="Quirksmode's Github Page"
            >
              <span className="visuallyHidden">Quirksmode&apos;s Github Page</span>
              <SVGInline svg={ IconGithub } />
            </a>
          </div>

          <div className="Utility__icon Utility__icon--twitter">
            <a
              href="http://www.twitter.com/quirksmode_uk"
              rel="external"
              title="Quirksmode's Twitter Page"
            >
              <span className="visuallyHidden">Quirksmode&apos;s Twitter Page</span>
              <SVGInline svg={ IconTwitter } />
            </a>
          </div>
          <div className="Utility__icon Utility__icon--soundcloud">
            <a href="https://soundcloud.com/quirksmode" rel="bookmark" title="Quirksmode's Soundcloud Profile">
              <span className="visuallyHidden">Quirksmode&apos;s Soundcloud Profile</span>
              <SVGInline svg={ IconSoundcloud } />
            </a>
          </div>
          <div className="Utility__icon Utility__icon--linkedin">
            <a
              href="https://www.linkedin.com/in/david-plunkett-4552365/"
              rel="bookmark"
              title="Quirksmode's LinkedIn Page"
            >
              <span className="visuallyHidden">Quirksmode&apos;s LinkedIn Page</span>
              <SVGInline svg={ IconLinkedin } />
            </a>
          </div>
          <div className="Footer__icon Footer__icon--menu">
            <button
              type="button"
              onClick={ toggleNav }
            >
              <span className="visuallyHidden">Toggle Footer Navigation Menu</span>
              <SVGInline svg={ IconMenu } />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  footerNavItems: PropTypes.array
};

const mapStateToProps = ({ app }) => ({
  footerNavItems: app.footerNavItems
});

export default connect(mapStateToProps, null)(Footer);
