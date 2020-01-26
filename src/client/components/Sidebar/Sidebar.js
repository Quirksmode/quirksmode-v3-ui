import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const Sidebar = ({
  tags,
  showTags,
  projectURL = ''
}) => (
  <div className="Sidebar">
    { showTags && tags.length > 0 && (
      <section className="Sidebar__section Sidebar__section--tags">
        <h3 className="Sidebar__sectionTitle">Tech</h3>
        <div className="Sidebar__tags">
          { tags.map(tag => (
            <NavLink key={ tag.term_id } to={ `/portfolio?tag=${tag.slug}` } rel="tag">
              { tag.name }
            </NavLink>
          ))}
        </div>
      </section>
    )}
    { projectURL && (
      <section className="Sidebar__section Sidebar__section--role">
        <h3 className="Sidebar__sectionTitle">Project Link</h3>
        <a href={ projectURL } className="Sidebar__projectLink" target="_blank" rel="noopener noreferrer">Launch Project</a>
      </section>
    )}
  </div>
);

Sidebar.propTypes = {
  tags: PropTypes.array,
  showTags: PropTypes.bool,
  projectURL: PropTypes.string
};

export default Sidebar;
