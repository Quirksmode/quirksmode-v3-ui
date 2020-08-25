import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import IconArrowDown from 'icons/arrowdown.svg';
import { fetchAboutData } from './PageAbout.actions';
import { useTypedSelector } from 'client/redux/types';

/**
 * About Page
 */
const PageAbout: React.FC = () => {
  const dispatch = useDispatch();
  const pageAbout = useTypedSelector((state) => state.pageAbout);
  const app = useTypedSelector((state) => state.app);

  const { content, metadata, loading, error } = pageAbout;
  if (!content) return null;
  const { title, intro, skillsSections, cvSections } = content;

  if (!app.siteSettings) return null;
  const { cv } = app.siteSettings;

  /**
   * Fetch the About Page Data via Redux, but only if the data does not already exist
   */
  useEffect(() => {
    if (!title) dispatch(fetchAboutData());
  }, [fetchAboutData, title]);

  return (
    title && (
      <PageWrapper error={error} loading={loading}>
        <div className="Page PageAbout">
          <Meta {...metadata} />
          <section className="Page__section Page__section--greyFade">
            <div className="Page__sectionInner grid">
              <h1>{title}</h1>
              <Breadcrumbs>
                <span className="Breadcrumbs__divider">&gt;</span>
                <span className="Breadcrumbs__active">{title}</span>
              </Breadcrumbs>
              <div className="PageAbout__intro">
                <div
                  dangerouslySetInnerHTML={{ __html: intro }}
                  className="PageAbout__introText"
                />
                <a className="btn--submitIcon" href={cv.url}>
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
                  {skillsSections.skillsTitle}
                </h2>
                <div className="PageAbout__skillsWrap">
                  {skillsSections.skills.map((skillsItem, skillsItemIndex) => {
                    const {
                      add_skill: addSkill,
                      skills_category_name: skillsCategoryName,
                      skills_colour: skillsColour,
                    } = skillsItem;

                    return (
                      <div key={skillsItemIndex} className="PageAbout__skills">
                        <h3>{skillsCategoryName}</h3>
                        {addSkill.map((skillItem, skillItemIndex) => {
                          const {
                            skill_name: skillName,
                            skill_percentage: skillPercentage,
                          } = skillItem;

                          return (
                            <div
                              key={skillItemIndex}
                              className={`PageAbout__skillBox ${skillsColour} w${skillPercentage}`}
                            >
                              <p>{skillName}</p>
                            </div>
                          );
                        })}
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
                {cvSections.map((cvSection, index) => {
                  const {
                    add_class: addClass,
                    add_content: addContent,
                    add_title: addTitle,
                  } = cvSection;

                  return (
                    <div
                      key={index}
                      className={`PageAbout__cvSection PageAbout__cvSection--${addClass}`}
                    >
                      <h2 className="PageAbout__title">{addTitle}</h2>
                      <div
                        className="PageAbout__cvSection-content"
                        dangerouslySetInnerHTML={{ __html: addContent }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </div>
      </PageWrapper>
    )
  );
};

export default PageAbout;
