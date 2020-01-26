import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const SubfooterAbout = ({
  about
}) => {
  const {
    title,
    content,
    link_text: linkText,
    link
  } = about;

  return (
    <section className="SubfooterAbout Subfooter__section">
      <h2 className="Subfooter__sectionHeading">{ title }</h2>
      <div dangerouslySetInnerHTML={ { __html: content } } />
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

SubfooterAbout.propTypes = {
  about: PropTypes.object
};

export default SubfooterAbout;
