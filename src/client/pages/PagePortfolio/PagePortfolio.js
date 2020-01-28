import React, {
  useEffect,
  Fragment
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { NavLink } from 'react-router-dom';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Filter from 'components/Filter/Filter';
import Frame from 'components/Frame/Frame';
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
  fetchPortfolioSingleDataAction,
  projects,
  projectCategories,
  projectTags,
  title,
  loading
}) => {
  useEffect(() => {
    if (!title) fetchPortfolioDataAction();
  }, [fetchPortfolioDataAction, title]);

  const handleClick = (e, slug, href) => {
    e.preventDefault();
    fetchPortfolioSingleDataAction(slug, href);
  };

  return title && (
    <div className="page PagePortfolio">
      <Helmet>
        <title>Portfolio Helmet Test</title>
        <meta property="og:title" content="Portfolio Page" />
      </Helmet>
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

        { projects.length ? projects.map(projectCategory => (
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
                      <Fragment key={ postName }>
                        <NavLink
                          to={ `/portfolio/${postName}/` }
                          className={ `PagePortfolio__project${loading === postName ? ' PagePortfolio__project--loading' : ''}` }
                          onClick={ e => handleClick(e, postName, `/portfolio/${postName}/`) }
                        >
                          <Frame featuredImage={ featuredImage } title={ postTitle } isNew={ isNew } size="Medium" />
                        </NavLink>
                      </Fragment>
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
  );
};

PagePortfolio.propTypes = {
  loading: PropTypes.string,
  fetchPortfolioDataAction: PropTypes.func,
  title: PropTypes.string,
  projects: PropTypes.array,
  projectCategories: PropTypes.array,
  projectTags: PropTypes.array
};

const mapStateToProps = ({ pagePortfolio, pagePortfolioSingle, app }) => ({
  loading: pagePortfolioSingle.loading,
  title: pagePortfolio.title,
  projects: pagePortfolio.projects,
  projectCategories: app.projectCategories,
  projectTags: app.projectTags
});

const mapDispatchToProps = dispatch => ({
  fetchPortfolioDataAction: (...args) => dispatch(fetchPortfolioData(...args)),
  fetchPortfolioSingleDataAction: (...args) => dispatch(fetchPortfolioSingleData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PagePortfolio);
