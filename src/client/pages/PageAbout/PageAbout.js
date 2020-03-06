import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import IconArrowDown from 'icons/arrowdown.svg';
import { fetchAboutData } from './PageAbout.actions';

/**
 * About Page
 *
 * @name PageAbout
 * @param {function} props.fetchAboutDataAction - Redux action to Fetch the About Page Data
 * @param {object} props.content - The content for this Page
 * @param {object} props.metadata - The metadata for this Page
 * @param {boolean} props.loading - Flag for while the data is being fetched
 * @param {boolean} props.error - Flag for if there is an error fetching the data
 * @param {object} props.siteSettings - The Global Site Settings
 * @return {JSXElement}
 */
const PageAbout = ({
  fetchAboutDataAction,
  content,
  metadata,
  loading,
  error,
  siteSettings,
}) => {
  /**
   * @type {Object}
   * @property {string} content.title - The Page Title
   * @property {object} content.intro - Intro content
   * @property {array} content.skillsSections - The Skills Sections
   * @property {array} content.cvSections - The CV Sections
   */
  const {
    title,
    intro,
    skillsSections,
    cvSections
  } = content;

  /**
   * @type {Object}
   * @property {object} siteSettings.cv - CV data from the Global Site Settings
   */
  const {
    cv
  } = siteSettings;

  /**
   * Fetch the About Page Data via Redux, but only if the data does not already exist
   */
  useEffect(() => {
    if (!title) fetchAboutDataAction();
  }, [fetchAboutDataAction, title]);

  return title && (
    <PageWrapper error={ error } loading={ loading }>
      <div className="Page PageAbout">
        <Meta { ...metadata } />
        <section className="Page__section Page__section--greyFade">
          <div className="Page__sectionInner grid">
            <h1>{ title }</h1>
            <Breadcrumbs>
              <span className="Breadcrumbs__divider">&gt;</span>
              <span className="Breadcrumbs__active">{ title }</span>
            </Breadcrumbs>
            <div className="PageAbout__intro">
              <div
                dangerouslySetInnerHTML={ { __html: intro } }
                className="PageAbout__introText"
              />
              <a
                className="btn--submitIcon"
                href={ cv.url }
              >
                DOWNLOAD MY CV
                <IconArrowDown />
              </a>
            </div>
          </div>
        </section>
        <section className="Page__section Page__section--greyFade">
          <div className="Page__sectionInner PageAbout__sketch grid">
            <div className="PageAbout__col">
              <h2 className="PageAbout__title">
                { skillsSections.skillsTitle }
              </h2>
              <div className="PageAbout__skillsWrap">
                { skillsSections.skills.map((skillsItem, skillsItemIndex) => {
                  const {
                    add_skill: addSkill,
                    skills_category_name: skillsCategoryName,
                    skills_colour: skillsColour
                  } = skillsItem;

                  return (
                    <div
                      key={ skillsItemIndex }
                      className="PageAbout__skills"
                    >
                      <h3>{ skillsCategoryName }</h3>
                      {
                          addSkill.map((skillItem, skillItemIndex) => {
                            const {
                              skill_name: skillName,
                              skill_percentage: skillPercentage
                            } = skillItem;

                            return (
                              <div
                                key={ skillItemIndex }
                                className={ `PageAbout__skillBox ${skillsColour} w${skillPercentage}` }
                              >
                                <p>
                                  { skillName }
                                </p>
                              </div>
                            );
                          })
                        }
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
        <section className="Page__section Page__section--whiteOverlay clearfix">
          <div className="Page__sectionInner grid clearfix">
            <div className="PageAbout__col first clearfix">
              { cvSections.map((cvSection, index) => {
                const {
                  add_class: addClass,
                  add_content: addContent,
                  add_title: addTitle
                } = cvSection;

                return (
                  <div
                    key={ index }
                    className={ `PageAbout__cvSection PageAbout__cvSection--${addClass}` }
                  >
                    <h2 className="PageAbout__title">
                      { addTitle }
                    </h2>
                    <div
                      className="PageAbout__cvSection-content"
                      dangerouslySetInnerHTML={ { __html: addContent } }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

PageAbout.propTypes = {
  fetchAboutDataAction: PropTypes.func,
  content: PropTypes.object,
  metadata: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  siteSettings: PropTypes.object,
};

const mapStateToProps = ({ pageAbout, app }) => ({
  content: pageAbout.content,
  metadata: pageAbout.metadata,
  loading: pageAbout.loading,
  error: pageAbout.error,
  siteSettings: app.siteSettings,
});

const mapDispatchToProps = dispatch => ({
  fetchAboutDataAction: (...args) => dispatch(fetchAboutData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageAbout);
