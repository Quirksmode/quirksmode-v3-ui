import React from 'react';
import LazyLoad from 'components/LazyLoad/LazyLoad';
import { SubfooterContactProps } from '../Subfooter.types';

const SunFooterContact: React.FC<SubfooterContactProps> = ({ contact }) => {
  const {
    title,
    image,
    name,
    number,
    email,
    link_text: linkText,
    link,
  } = contact;

  return (
    <section className="SubfooterContact Subfooter__section">
      <h2 className="Subfooter__sectionHeading">{title}</h2>
      <div className="SubfooterContact__contentWrap">
        {image && (
          <div className="SubfooterContact__imgWrap">
            <LazyLoad>
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${image.sizes.image}.webp 1x,
                   ${image.sizes.image2x}.webp 1.5x,
                   ${image.sizes.image2x}.webp 2x`}
                />
                <img
                  className="img--responsive"
                  srcSet={`${image.sizes.image} 1x,
                   ${image.sizes.image2x} 1.5x,
                   ${image.sizes.image2x} 2x`}
                  src={image.sizes.image}
                  alt={image.alt}
                  width={image.width}
                  height={image.width}
                  loading="lazy"
                />
              </picture>
            </LazyLoad>
          </div>
        )}
        <div className="SubfooterContact__textWrap">
          <p>
            <strong>{name}</strong>
          </p>
          <p>{number}</p>
          <p>{email}</p>
        </div>
      </div>
      {link && (
        <a
          href={link.url}
          className="Subfooter__link"
          dangerouslySetInnerHTML={{ __html: linkText }}
        />
      )}
    </section>
  );
};

export default SunFooterContact;
