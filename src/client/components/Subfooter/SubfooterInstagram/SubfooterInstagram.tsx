import React from 'react';
import LazyLoad from 'components/LazyLoad/LazyLoad';
import { SubfooterInstagramProps } from '../Subfooter.types';

const SubfooterInstagram: React.FC<SubfooterInstagramProps> = ({
  instagram,
}) => {
  const { title, link_text: linkText, images, link } = instagram;

  return (
    <section className="SubfooterInstagram Subfooter__section">
      <h2 className="Subfooter__sectionHeading">{title}</h2>
      <div className="SubfooterInstagram__imgWrap">
        {images &&
          images.length > 0 &&
          images.map((image, index) => (
            <LazyLoad key={index}>
              <picture>
                <source
                  type="image/webp"
                  srcSet={`${image.sizes.image}.webp 1x,
                    ${image.sizes.image2x}.webp 1.5x,
                    ${image.sizes.image2x}.webp 2x`}
                />
                <img
                  className="SubfooterInstagram__img img--responsive"
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
          ))}
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

export default SubfooterInstagram;
