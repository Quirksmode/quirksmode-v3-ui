import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Filter from 'components/Filter/Filter';
import Frame from 'components/Frame/Frame';
import LinkLoader from 'components/LinkLoader/LinkLoader';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import { fetchPortfolioData } from './PagePortfolio.actions';
import { useHistory } from 'react-router-dom';
import { useTypedSelector } from 'client/redux/types';
import { RouteHistory } from './PagePortfolio.types';

/**
 * Portfolio Page
 */
const PagePortfolio: React.FC = () => {
  const dispatch = useDispatch();
  const history: RouteHistory = useHistory();
  const pagePortfolio = useTypedSelector((state) => state.pagePortfolio);
  const app = useTypedSelector((state) => state.app);

  const { content, metadata, error } = pagePortfolio;
  if (!content) return null;
  const { title, projects } = content;
  const { projectCategories, projectTags } = app;

  /**
   * Fetch the Portfolio Page Data via Redux, this will trigger each time the filter
   * updates the URL
   */
  useEffect(() => {
    dispatch(fetchPortfolioData(history.location.search));
  }, [fetchPortfolioData, history.location.search]);

  return (
    <PageWrapper error={error}>
      <div className="page PagePortfolio">
        {metadata && <Meta {...metadata} />}
        <section className="Page__section Page__section--greyFade Page__section--withFilter clearfix">
          <div className="Page__sectionInner PagePortfolio__sketch grid">
            <h1>{title}</h1>
            <Breadcrumbs>
              <span className="Breadcrumbs__divider">&gt;</span>
              <span className="Breadcrumbs__active">{title}</span>
            </Breadcrumbs>
            <Filter
              categories={projectCategories}
              tags={projectTags}
              type="portfolio"
            />
          </div>
        </section>
        {projects.length > 0 ? (
          projects.map(
            (projectCategory) =>
              projectCategory.projects.length > 0 && (
                <section
                  className="PagePortfolio__categoryWrap Page__section Page__section--greyFade"
                  key={projectCategory.term_id}
                >
                  <div className="grid">
                    <h2>{projectCategory.name}</h2>
                    <div className="grid--frames">
                      {projectCategory.projects.length > 0 &&
                        projectCategory.projects.map((project) => {
                          const {
                            featuredImage,
                            postTitle,
                            postName,
                            isNew,
                          } = project;
                          return (
                            <LinkLoader
                              key={postName}
                              type="portfolio"
                              slug={postName}
                            >
                              <Frame
                                featuredImage={featuredImage}
                                title={postTitle}
                                isNew={isNew}
                                size="Medium"
                              />
                            </LinkLoader>
                          );
                        })}
                    </div>
                  </div>
                </section>
              )
          )
        ) : (
          <section className="Page__section Page__section--greyFade">
            <div className="Page__sectionInner grid">
              <div className="Page__content">
                <p>Sorry, no projects found.</p>
              </div>
            </div>
          </section>
        )}
      </div>
    </PageWrapper>
  );
};

export default PagePortfolio;
