import React, {
  useState,
  useCallback
} from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import FsLightbox from 'fslightbox-react';
import { useInView } from 'react-intersection-observer';

const PagePortfolioScreenshots = ({
  screenshots
}) => {
  /**
   *
   * @name swiper
   * @type {object}
   */
  const [swiper, updateSwiper] = useState(null);

  const params = {
    fadeEffect: {
      crossFade: true
    },
    effect: 'fade',
    lazyLoading: true,
    preloadImages: true,
    shouldSwiperUpdate: true,
    updateOnImagesReady: true,
    loop: false,
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
      if (swiper.activeIndex === (swiper.slides.length - 1)) {
        // Fake Loop due to React issue with Loop mode
        swiper.slideTo(0);
      } else {
        swiper.slideNext();
      }
    }
  };

  /**
   *
   * @name goPrev
   * @type {function}
   */
  const goPrev = () => {
    if (swiper !== null) {
      if (swiper.activeIndex === 0) {
        // Fake Loop due to React issue with Loop mode
        swiper.slideTo(swiper.slides.length - 1);
      } else {
        swiper.slidePrev();
      }
    }
  };

  const [lightboxController, setLightboxController] = useState({
    toggler: false,
    slide: 1
  });

  /**
   * @description Hook that is generated by the useInView function from the
   *              react-intersection-observer library.
   *
   */
  const [sliderNavRef, inView] = useInView({
    threshold: 1,
    rootMargin: '-150px'
  });

  const openLightboxOnSlide = useCallback((e, index) => {
    e.preventDefault();
    setLightboxController({
      toggler: !lightboxController.toggler,
      slide: index
    });
    if (swiper !== null) {
      swiper.slideTo(index - 1);
    }
  }, [lightboxController.toggler, swiper]);

  return screenshots.length && (
    <section className="PagePortfolioScreenshots Page__section Page__section--darkFull">
      <div className="Page__sectionInner grid">
        { screenshots.length && (
        <div className="PagePortfolioScreenshots__sliderWrap">
          <div className="PagePortfolioScreenshots__screenshotOuter">
            <div className="PagePortfolioScreenshots__screenshotInner">
              <Swiper
                getSwiper={ updateSwiper }
                { ...params }
              >
                { screenshots.map((slide, index) => (
                  <a
                    href={ slide.url }
                    key={ slide.id }
                    onClick={ e => openLightboxOnSlide(e, index + 1) }
                    className="PagePortfolioScreenshots__slide aspectWrap aspectWrap--ratio-16-10"
                  >
                    <picture>
                      <source
                        type="image/webp"
                        srcSet={
                          `${slide.sizes.heroSlider768up2x}.webp 1x,
                          ${slide.sizes.heroSlider768up2x}.webp 1.5x,
                          ${slide.sizes.heroSlider768up2x}.webp 2x`
                        }
                        media="(min-width: 768px)"
                      />
                      <source
                        type="image/jpeg"
                        srcSet={
                          `${slide.sizes.heroSlider768up} 1x,
                          ${slide.sizes.heroSlider768up2x} 1.5x,
                          ${slide.sizes.heroSlider768up2x} 2x`
                        }
                        media="(min-width: 768px)"
                      />
                      <source
                        type="image/webp"
                        srcSet={
                          `${slide.sizes.heroSlider481up}.webp 1x,
                          ${slide.sizes.heroSlider481up2x}.webp 1.5x,
                          ${slide.sizes.heroSlider481up2x}.webp 2x`
                        }
                      />
                      <img
                        srcSet={
                          `${slide.sizes.heroSlider481up} 1x,
                          ${slide.sizes.heroSlider481up2x} 1.5x,
                          ${slide.sizes.heroSlider481up2x} 2x`
                        }
                        src={ slide.sizes.heroSlider481up }
                        alt={ slide.alt }
                        width={ slide.width }
                        height={ slide.height }
                      />
                    </picture>
                  </a>
                ))}
              </Swiper>
            </div>
          </div>
          { screenshots.length && (
          <FsLightbox
            toggler={ lightboxController.toggler }
            type="image"
            sources={ screenshots.map(slide => slide.url) }
            slide={ lightboxController.slide }
          />
          ) }
        </div>
        )}
      </div>
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
    </section>
  );
};

PagePortfolioScreenshots.propTypes = {
  screenshots: PropTypes.array
};

export default PagePortfolioScreenshots;
