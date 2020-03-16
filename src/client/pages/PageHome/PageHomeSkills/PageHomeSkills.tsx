import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import IconQuirksmode from 'icons/quirksmode.svg';

/**
 * Home Page Skills Component
 *
 * @name PageHomeSkills
 * @param {array} props.skills - My skills list
 * @return {JSXElement}
 */
const PageHomeSkills = ({
  skills
}) => (
  <div className="PageHomeSkills">
    <div className="Page__headingWrap">
      <h2>This is some of what I do</h2>
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
          skill_name: skillName
        } = skill;

        return (
          <li
            key={ skillName }
            className="PageHomeSkills__skill"
          >
            <span className="PageHomeSkills__skillLink">
              <IconQuirksmode
                className="PageHomeSkills__skillIcon"
                aria-hidden="true"
              />
              <span>{ skillName }</span>
            </span>
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
