import React, {
  useState
} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import { useInView } from 'react-intersection-observer';
import LogoNav from './LogoNav/LogoNav';

/**
 * Description
 *
 * @name Header
 * @param  {object}   props.app                    []
 * @param  {object}   props.mainLogo               []
 * @param  {array}    props.heroSlides             []
 * @param  {object}   props.location               []
 */
const Header = ({
  heroSlides,
  location
}) => {
  /**
   *
   * @name swiper
   * @type {object}
   */
  const [swiper, updateSwiper] = useState(null);

  /**
   *
   * @name params
   * @type {object}
   */
  const params = {
    autoHeight: true,
    preloadImages: false,
    loop: false,
    shouldSwiperUpdate: true,
    updateOnImagesReady: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true
    }
  };

  /**
   *
   * @name goNext
   * @type {function}
   */
  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };

  /**
   *
   * @name goPrev
   * @type {function}
   */
  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  /**
   * @description Hook that is generated by the useInView function from the
   *              react-intersection-observer library.
   *
   */
  const [sliderNavRef, inView] = useInView({
    threshold: 1,
    rootMargin: '-150px'
  });

  return (
    <header className="Header">
      <div className="Header__innerWrap grid">
        <LogoNav />
        { location.pathname === '/' && heroSlides && heroSlides.length > 0 && (
          <div className="Header__sliderOuterWrap">
            <div className="Header__sliderWrap">
              <Swiper
                getSwiper={ updateSwiper }
                { ...params }
              >
                { heroSlides.map(slide => (
                  <div className="aspectWrap aspectWrap--ratio-16-10" key={ slide.id }>
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={
                          `${slide.image.sizes.heroSlider768up}.webp 1x,
                          ${slide.image.sizes.heroSlider768up2x}.webp 1.5x,
                          ${slide.image.sizes.heroSlider768up2x}.webp 2x`
                        }
                        media="(min-width: 768px)"
                      />
                      <source
                        type="image/jpeg"
                        srcSet={
                          `${slide.image.sizes.heroSlider768up} 1x,
                          ${slide.image.sizes.heroSlider768up2x} 1.5x,
                          ${slide.image.sizes.heroSlider768up2x} 2x`
                        }
                        media="(min-width: 768px)"
                      />
                      <source
                        type="image/webp"
                        srcSet={
                          `${slide.image.sizes.heroSlider481up}.webp 1x,
                          ${slide.image.sizes.heroSlider481up2x}.webp 1.5x,
                          ${slide.image.sizes.heroSlider481up2x}.webp 2x`
                        }
                      />
                      <img
                        srcSet={
                          `${slide.image.sizes.heroSlider481up} 1x,
                          ${slide.image.sizes.heroSlider481up2x} 1.5x,
                          ${slide.image.sizes.heroSlider481up2x} 2x`
                        }
                        src={ slide.image.sizes.heroSlider481up }
                        alt={ slide.image.alt }
                        width={ slide.image.width }
                        height={ slide.image.height }
                      />
                    </picture>
                  </div>
                ))}
              </Swiper>
            </div>
          </div>
        )}
      </div>

      { location.pathname === '/' && (
        <div
          ref={ sliderNavRef }
          className={ `Slider__directionNav${inView ? ' Slider__directionNav--active' : ''}` }
        >
          <button
            type="button"
            onClick={ goPrev }
            className="Slider__prev"
          >
            Previous
          </button>
          <button
            type="button"
            onClick={ goNext }
            className="Slider__next"
          >
            Next
          </button>
        </div>
      )}
    </header>
  );
};

Header.propTypes = {
  heroSlides: PropTypes.array,
  location: PropTypes.object,
};

const mapStateToProps = ({ pageHome }) => ({
  heroSlides: pageHome.content.heroSlides
});

export default connect(
  mapStateToProps,
  null
)(Header);
