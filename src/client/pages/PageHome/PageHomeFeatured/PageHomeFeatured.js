import React, {
  useState
} from 'react';
import PropTypes from 'prop-types';
import Swiper from 'react-id-swiper';
import { useInView } from 'react-intersection-observer';
import { NavLink } from 'react-router-dom';
import Frame from 'components/Frame/Frame';

/**
 * Description
 *
 * @name PageHomeFeatured
 * @param  {object} props.featuredWork []
 */
const PageHomeFeatured = ({
  featuredWork
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
    preloadImages: true,
    lazyLoading: true,
    updateOnImagesReady: true,
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    autoHeight: true,
    breakpoints: {
      481: {
        slidesPerView: 2,
        spaceBetween: 30
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 50
      },
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
    <section className="PageHomeFeatured Page__section Page__section--greyFade">
      <div className="Page__sectionInner grid">
        <div className="Page__headingWrap">
          <h2>Featured Work</h2>
          <NavLink
            to="/portfolio"
            className="link--withHeading link--withIcon"
          >
              View All Work
          </NavLink>
        </div>
        <Swiper
          getSwiper={ updateSwiper }
          { ...params }
        >
          { featuredWork.map(project => (
            <div className="PageHomeFeatured__slide" key={ project.id }>
              <NavLink
                to={ `/portfolio/${project.slug}` }
              >
                <Frame featuredImage={ project.featuredImage } title={ project.title } isNew={ project.isNew } size="Medium" />
              </NavLink>
            </div>
          ))}
        </Swiper>
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

PageHomeFeatured.propTypes = {
  featuredWork: PropTypes.array
};

export default PageHomeFeatured;