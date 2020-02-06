import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Filter from 'components/Filter/Filter';
import Frame from 'components/Frame/Frame';
import LinkLoader from 'components/LinkLoader/LinkLoader';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import { fetchPortfolioSingleData } from 'pages/PagePortfolioSingle/PagePortfolioSingle.actions';
import { fetchPortfolioData } from './PagePortfolio.actions';

/**
 * Description
 *
 * @name PagePortfolio
 * @param  {object} props []
 */
const PagePortfolio = ({
  fetchPortfolioDataAction,
  content,
  metadata,
  error,
  projectCategories,
  projectTags,
}) => {
  const {
    title,
    projects
  } = content;

  return (
    <PageWrapper error={ error }>
      <div className="page PagePortfolio">
        { metadata && <Meta { ...metadata } /> }
        <div id="content">
          <section className="Page__section Page__section--greyFade Page__section--withFilter clearfix">
            <div className="Page__sectionInner PagePortfolio__sketch grid">
              <h1>{ title }</h1>
              <Breadcrumbs>
                <span className="Breadcrumbs__divider">&gt;</span>
                <span className="Breadcrumbs__active">{ title }</span>
              </Breadcrumbs>
              <Filter categories={ projectCategories } tags={ projectTags } fetchDataAction={ fetchPortfolioDataAction } type="portfolio" />
            </div>
          </section>

          { projects.length > 0 ? projects.map(projectCategory => (
            <section
              className="PagePortfolio__categoryWrap Page__section Page__section--greyFade"
              key={ projectCategory.term_id }
            >
              <div className="grid">
                <h2>{projectCategory.name}</h2>
                <div className="grid--frames">
                  {
                    projectCategory.projects.map((project) => {
                      const {
                        featuredImage,
                        post_title: postTitle,
                        post_name: postName,
                        isNew
                      } = project;
                      return (
                        <LinkLoader
                          key={ postName }
                          type="portfolio"
                          slug={ postName }
                        >
                          <Frame
                            featuredImage={ featuredImage }
                            title={ postTitle }
                            isNew={ isNew }
                            size="Medium"
                          />
                        </LinkLoader>
                      );
                    })
                  }
                </div>
              </div>
            </section>
          )) : (
            <section className="Page__section Page__section--greyFade">
              <div className="Page__sectionInner grid">
                <div className="Page__content">
                  <p>Sorry, no projects found.</p>
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </PageWrapper>
  );
};

PagePortfolio.propTypes = {
  fetchPortfolioDataAction: PropTypes.func,
  content: PropTypes.object,
  metadata: PropTypes.object,
  error: PropTypes.bool,
  projectCategories: PropTypes.array,
  projectTags: PropTypes.array,
};

const mapStateToProps = ({ pagePortfolio, app }) => ({
  content: pagePortfolio.content,
  metadata: pagePortfolio.metadata,
  error: pagePortfolio.error,
  projectCategories: app.projectCategories,
  projectTags: app.projectTags,
});

const mapDispatchToProps = dispatch => ({
  fetchPortfolioDataAction: (...args) => dispatch(fetchPortfolioData(...args)),
  fetchPortfolioSingleDataAction: (...args) => dispatch(fetchPortfolioSingleData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PagePortfolio);
