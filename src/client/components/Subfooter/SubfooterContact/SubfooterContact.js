import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const SunFooterContact = ({
  contact
}) => {
  const {
    title,
    image,
    name,
    number,
    email,
    link_text: linkText,
    link
  } = contact;

  return (
    <section className="SubfooterContact Subfooter__section">
      <h2 className="Subfooter__sectionHeading">{ title }</h2>
      <div className="SubfooterContact__contentWrap">
        { image && (
          <div className="SubfooterContact__imgWrap">
            <picture>
              <source
                type="image/webp"
                srcSet={
                  `${image.sizes.image}.webp 1x,
                   ${image.sizes.image2x}.webp 1.5x,
                   ${image.sizes.image2x}.webp 2x`
                }
              />
              <img
                className="img--responsive"
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
          </div>
        )}
        <div className="SubfooterContact__textWrap">
          <p>
            <strong>{ name }</strong>
          </p>
          <p>{ number }</p>
          <p>{ email }</p>
        </div>
      </div>
      { link && (
        <NavLink
          className="Subfooter__link"
          to={ link.url }
          dangerouslySetInnerHTML={ { __html: linkText } }
        />
      )}
    </section>
  );
};

SunFooterContact.propTypes = {
  contact: PropTypes.object
};

export default SunFooterContact;
