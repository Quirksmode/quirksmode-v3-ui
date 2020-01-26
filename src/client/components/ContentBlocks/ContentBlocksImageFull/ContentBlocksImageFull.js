import React from 'react';
import PropTypes from 'prop-types';

/**
 * Description
 *
 * @name ContentBlocksContent
 * @param  {object} props []
 */
const ContentBlocksImageFull = ({
  block
}) => (
  <div className="ContentBlocksImageFull">
    <picture>
      <source
        type="image/webp"
        srcSet={
          `${block.image.sizes.fullWidth1800}.webp 1x,
          ${block.image.sizes.fullWidth1800_2x}.webp 1.5x,
          ${block.image.sizes.fullWidth1800_2x}.webp 2x`
        }
        media="(min-width: 1024px)"
      />
      <source
        type="image/jpeg"
        srcSet={
          `${block.image.sizes.fullWidth1800} 1x,
          ${block.image.sizes.fullWidth1800_2} 1.5x,
          ${block.image.sizes.fullWidth1800_2x} 2x`
        }
        media="(min-width: 1024px)"
      />
      <source
        type="image/webp"
        srcSet={
          `${block.image.sizes.fullWidth1024}.webp 1x,
          ${block.image.sizes.fullWidth1024_2x}.webp 1.5x,
          ${block.image.sizes.fullWidth1024_2x}.webp 2x`
        }
        media="(min-width: 768px)"
      />
      <source
        type="image/jpeg"
        srcSet={
          `${block.image.sizes.fullWidth1024} 1x,
          ${block.image.sizes.fullWidth1024_2} 1.5x,
          ${block.image.sizes.fullWidth1024_2x} 2x`
        }
        media="(min-width: 768px)"
      />
      <source
        type="image/webp"
        srcSet={
          `${block.image.sizes.fullWidth768}.webp 1x,
          ${block.image.sizes.fullWidth768_2x}.webp 1.5x,
          ${block.image.sizes.fullWidth768_2x}.webp 2x`
        }
        media="(min-width: 481px)"
      />
      <source
        type="image/jpeg"
        srcSet={
          `${block.image.sizes.fullWidth768} 1x,
          ${block.image.sizes.fullWidth768_2} 1.5x,
          ${block.image.sizes.fullWidth768_2x} 2x`
        }
        media="(min-width: 481px)"
      />
      <source
        type="image/webp"
        srcSet={
          `${block.image.sizes.fullWidth481}.webp 1x,
          ${block.image.sizes.fullWidth481_2x}.webp 1.5x,
          ${block.image.sizes.fullWidth481_2x}.webp 2x`
        }
      />
      <img
        srcSet={
          `${block.image.sizes.fullWidth481} 1x,
          ${block.image.sizes.fullWidth481_2x} 1.5x,
          ${block.image.sizes.fullWidth481_2x} 2x`
        }
        src={ block.image.sizes.fullWidth481 }
        alt={ block.image.alt }
      />
    </picture>
  </div>
);

ContentBlocksImageFull.propTypes = {
  block: PropTypes.object
};

export default ContentBlocksImageFull;
