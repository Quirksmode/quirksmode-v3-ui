import React from 'react';
import PropTypes from 'prop-types';
import SVGInline from 'react-svg-inline';
import { NavLink } from 'react-router-dom';
import IconArrowDown from '!!raw-loader!icons/arrowdown.svg';

/**
 * Home Page Intro Component
 *
 * @name PageHomeSkills
 * @param {object} props.intro - The intro content
 * @param {object} props.cv - The cv content
 * @return {JSXElement}
 */
const PageHomeIntro = ({
  intro,
  cv
}) => (
  <div className="PageHomeIntro">
    <div className="Page__headingWrap">
      <h2>HELLO, my name is dave</h2>
      <NavLink
        to="/about-me"
        className="link--withHeading link--withIcon"
      >
        More About Me
      </NavLink>
    </div>
    <div className="PageHomeIntro__intro">
      { intro && (
        <div className="PageHomeIntro__imgWrap">
          <picture>
            <source
              type="image/webp"
              srcSet={
                `${intro.image.url}.webp 1x,
                  ${intro.image.url}.webp 1.5x,
                  ${intro.image.url}.webp 2x`
              }
            />
            <img
              srcSet={
                `${intro.image.url} 1x,
                  ${intro.image.url} 1.5x,
                  ${intro.image.url} 2x`
              }
              src={ intro.image.url }
              alt={ intro.image.alt }
              width={ intro.image.width }
              height={ intro.image.width }
              loading="lazy"
            />
          </picture>
        </div>
      )}
      { intro && (
        <div className="PageHomeIntro__textWrap">
          <div dangerouslySetInnerHTML={ { __html: intro.text } } />
          <a
            className="btn--submitIcon"
            title={ cv.title }
            href={ cv.url }
            target="_blank"
            rel="noopener noreferrer"
          >
            DOWNLOAD MY CV
            <SVGInline svg={ IconArrowDown } />
          </a>
        </div>
      )}
    </div>
  </div>
);

PageHomeIntro.propTypes = {
  intro: PropTypes.object,
  cv: PropTypes.object
};

export default PageHomeIntro;
