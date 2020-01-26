import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Share from 'components/Share/Share';

/**
 * Description
 *
 * @name Hero
 */
const Hero = ({
  hero,
  title,
  subtitle = '',
  url
}) => (
  <section className="Hero">
    <picture>
      <source
        type="image/webp"
        srcSet={
                `${hero.image.sizes.fullWidth1024}.webp 1x,
                ${hero.image.sizes.fullWidth1024_2x}.webp 1.5x,
                ${hero.image.sizes.fullWidth1024_2x}.webp 2x`
              }
        media="(min-width: 1024px)"
      />
      <source
        type="image/jpeg"
        srcSet={
                `${hero.image.sizes.fullWidth1024} 1x,
                ${hero.image.sizes.fullWidth1024_2x} 1.5x,
                ${hero.image.sizes.fullWidth1024_2x} 2x`
              }
        media="(min-width: 1024px)"
      />
      <source
        type="image/webp"
        srcSet={
                `${hero.image.sizes.fullWidth1800}.webp 1x,
                ${hero.image.sizes.fullWidth1800_2x}.webp 1.5x,
                ${hero.image.sizes.fullWidth1800_2x}.webp 2x`
              }
        media="(min-width: 1024px)"
      />
      <source
        type="image/jpeg"
        srcSet={
                `${hero.image.sizes.fullWidth1800} 1x,
                ${hero.image.sizes.fullWidth1800_2x} 1.5x,
                ${hero.image.sizes.fullWidth1800_2x} 2x`
              }
        media="(min-width: 1024px)"
      />
      <source
        type="image/webp"
        srcSet={
                `${hero.image.sizes.fullWidth1024}.webp 1x,
                ${hero.image.sizes.fullWidth1024_2x}.webp 1.5x,
                ${hero.image.sizes.fullWidth1024_2x}.webp 2x`
              }
        media="(min-width: 768px)"
      />
      <source
        type="image/jpeg"
        srcSet={
                `${hero.image.sizes.fullWidth1024} 1x,
                ${hero.image.sizes.fullWidth1024_2x} 1.5x,
                ${hero.image.sizes.fullWidth1024_2x} 2x`
              }
        media="(min-width: 768px)"
      />
      <source
        type="image/webp"
        srcSet={
                `${hero.image.sizes.fullWidth768}.webp 1x,
                ${hero.image.sizes.fullWidth768_2x}.webp 1.5x,
                ${hero.image.sizes.fullWidth768_2x}.webp 2x`
              }
        media="(min-width: 481px)"
      />
      <source
        type="image/jpeg"
        srcSet={
                `${hero.image.sizes.fullWidth768} 1x,
                ${hero.image.sizes.fullWidth768_2x} 1.5x,
                ${hero.image.sizes.fullWidth768_2x} 2x`
              }
        media="(min-width: 481px)"
      />
      <source
        type="image/webp"
        srcSet={
                `${hero.image.sizes.fullWidth481}.webp 1x,
                ${hero.image.sizes.fullWidth481_2x}.webp 1.5x,
                ${hero.image.sizes.fullWidth481_2x}.webp 2x`
              }
      />
      <img
        className="Hero__img"
        srcSet={
                `${hero.image.sizes.fullWidth481} 1x,
                ${hero.image.sizes.fullWidth481_2x} 1.5x,
                ${hero.image.sizes.fullWidth481_2x} 2x`
              }
        src={ hero.image.sizes.fullWidth481 }
        alt={ hero.image.alt }
      />
    </picture>
    <div className="Hero__inner grid">
      <div className={`Hero__textWrap grid__content${hero.alignCenter ? ' grid__content--center' : ''}`}>
        <h1 className="Hero__textWrapTitle">{ title }</h1>
        <h3>
          { subtitle }
        </h3>
      </div>
      <Breadcrumbs>
        <span className="Breadcrumbs__divider">&gt;</span>
        <NavLink to="/blog" className="Breadcrumbs__link">Blog</NavLink>
      </Breadcrumbs>
      <div className="Hero__share">
        <Share title={ title } url={ url } />
      </div>
    </div>
  </section>
);

Hero.propTypes = {
  hero: PropTypes.object,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  url: PropTypes.string
};

export default Hero;
