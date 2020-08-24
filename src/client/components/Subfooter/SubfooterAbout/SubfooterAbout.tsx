import React from 'react';
import { SubfooterAboutProps } from '../Subfooter.types';

const SubfooterAbout: React.FC<SubfooterAboutProps> = ({ about }) => {
  const { title, content, link_text: linkText, link } = about;

  return (
    <section className="SubfooterAbout Subfooter__section">
      <h2 className="Subfooter__sectionHeading">{title}</h2>
      <div dangerouslySetInnerHTML={{ __html: content }} />
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

export default SubfooterAbout;
