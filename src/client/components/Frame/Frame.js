import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

/**
 * Calculate the cursor position and return the relevant coordinates
 *
 * @name calc
 * @param  {event} e [Event]
 * @param  {function} frameRef [Stored reference to the frame element]
 */
const calc = (e, frameRef) => {
  const bounds = frameRef.current.getBoundingClientRect();
  const xPos = e.clientX - bounds.left - (bounds.width / 2);
  const yPos = e.clientY - bounds.top - (bounds.height / 2);
  return [-(yPos) / 20, (xPos) / 20, 1];
};

/**
 * Transform the x, y and scale
 *
 * @name trans
 * @param  {number} x [X coordinate]
 * @param  {number} y [Y coordinate]
 * @param  {number} s [Scale]
 */
const trans = (x, y, s) => `perspective(600px) rotateX(${x}deg) rotateY(${y}deg) scale(${s})`;

/**
 * Frame Component
 *
 * @name Frame
 * @param  {boolean} props.isNew [Show/Hide the New indicator]
 * @param  {object} props.featuredImage [Featured Image]
 * @param  {string} props.String [The Title]
 * @param  {string} props.size [The size of the Frame]
 */
const Frame = ({
  isNew = false,
  featuredImage,
  title = null,
  size = 'Small',
  date = null,
  type = null,
  slug,
  loading,
  action
}) => {
  /**
   * React Ref for the Frame
   *
   * @name frameRef
   * @type {object}
   */
  const frameRef = React.createRef();

  /**
   * Create the href based on the type e.g. Page, Portfolio or Blog
   *
   * @name href
   * @type {object}
   */
  const href = type ? `/${type}/${slug}` : `/${slug}`;

  /**
   * React Spring Hook for defining the animation
   *
   * @name useSpring
   * @type {object}
   * @return {JSX} Component View
   */
  const [styles, set] = useSpring(() => (
    { xys: [0, 0, 1], config: { mass: 5, tension: 350, friction: 40 } }));

  const handleClick = (e) => {
    e.preventDefault();
    action(slug, href);
  };

  return (
    <NavLink
      to={ href }
      onClick={ e => handleClick(e) }
      className="Frame"
    >
      <animated.div
        ref={ frameRef }
        className={ `Frame__inner Frame__inner--rollover${loading ? ' Frame__inner--loading' : ''}` }
        onMouseMove={ e => set({ xys: calc(e, frameRef) }) }
        onMouseLeave={ () => set({ xys: [0, 0, 1] }) }
        style={ { transform: styles.xys.interpolate(trans), } }
      >
        { isNew && (
          <div className="Frame__new">
            <span>New</span>
          </div>
        )}

        <div className="Frame__aspect Frame--reflection">
          <picture>
            <source
              type="image/webp"
              srcSet={
                `${featuredImage.sizes[`quirksmode${size}2x`]}.webp 1x,
                  ${featuredImage.sizes[`quirksmode${size}2x`]}.webp 1.5x,
                  ${featuredImage.sizes[`quirksmode${size}2x`]}.webp 2x`
              }
            />
            <img
              srcSet={
                `${featuredImage.sizes[`quirksmode${size}`]} 1x,
                  ${featuredImage.sizes[`quirksmode${size}2x`]} 1.5x,
                  ${featuredImage.sizes[`quirksmode${size}2x`]} 2x`
              }
              src={ featuredImage.sizes[`quirksmode${size}`] }
              alt={ featuredImage.alt }
              width={ featuredImage.width }
              height={ featuredImage.width }
              loading="lazy"
            />
          </picture>
          { title && (
            <h3 className="Frame__title">
              { title }
            </h3>
          )}

          { date && (
            <div className="Frame__date">
              <span>{ date }</span>
            </div>
          )}
        </div>
      </animated.div>
    </NavLink>
  );
};

Frame.propTypes = {
  featuredImage: PropTypes.object,
  title: PropTypes.string,
  size: PropTypes.string,
  isNew: PropTypes.bool,
  date: PropTypes.string,
  type: PropTypes.string,
  slug: PropTypes.string,
  loading: PropTypes.bool,
  action: PropTypes.func
};

export default Frame;
