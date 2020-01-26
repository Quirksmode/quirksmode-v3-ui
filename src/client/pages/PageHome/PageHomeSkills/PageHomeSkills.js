import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import IconQuirksmode from '!!raw-loader!icons/quirksmode.svg';

/**
 * Description
 *
 * @name PageHomeSkills
 * @param  {array} props.skills []
 */
const PageHomeSkills = ({
  skills
}) => (
  <div className="PageHomeSkills">
    <div className="Page__headingWrap">
      <h2>Erm, so what do i actually do?</h2>
      <NavLink
        to="/about-me"
        className="link--withHeading link--withIcon"
      >
        Skills Breakdown
      </NavLink>
    </div>
    <ul className="PageHomeSkills__skills">
      { skills.map((skill) => {
        const {
          term_id: termId
        } = skill;

        return (
          <li
            key={ termId }
            className="PageHomeSkills__skill"
          >
            <SVGInline
              svg={ IconQuirksmode }
              className="PageHomeSkills__skillIcon"
              aria-hidden="true"
            />
            <NavLink
              to={ `/${skill.taxonomy}/${skill.slug}/` }
              className="PageHomeSkills__skillLink"
              title={ `Link to all Projects featuring tag: ${skill.name}` }
              rel="tag"
            >
              { skill.name }
            </NavLink>
          </li>
        );
      })}
    </ul>
  </div>
);

PageHomeSkills.propTypes = {
  skills: PropTypes.array
};

export default PageHomeSkills;
