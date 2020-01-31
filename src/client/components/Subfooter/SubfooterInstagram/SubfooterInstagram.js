import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const SubfooterInstagram = ({
  instagram
}) => {
  const {
    title,
    link_text: linkText,
    images,
    link
  } = instagram;

  return (
    <section className="SubfooterInstagram Subfooter__section">
      <h2 className="Subfooter__sectionHeading">{ title }</h2>
      <div className="SubfooterInstagram__imgWrap">
        { images && images.length > 0 && images.map((image, index) => (
          <picture key={ index }>
            <source
              type="image/webp"
              srcSet={
                  `${image.sizes.image}.webp 1x,
                   ${image.sizes.image2x}.webp 1.5x,
                   ${image.sizes.image2x}.webp 2x`
                }
            />
            <img
              className="SubfooterInstagram__img img--responsive"
              srcSet={
                  `${image.sizes.image} 1x,
                   ${image.sizes.image2x} 1.5x,
                   ${image.sizes.image2x} 2x`
                }
              src={ image.sizes.image }
              alt={ image.alt }
              width={ image.width }
              height={ image.width }
              loading="lazy"
            />
          </picture>
        ))}
      </div>
      { link && (
        <a
          href={ link.url }
          className="Subfooter__link"
          dangerouslySetInnerHTML={ { __html: linkText } }
        />
      )}
    </section>
  );
};

SubfooterInstagram.propTypes = {
  instagram: PropTypes.object
};

export default SubfooterInstagram;
