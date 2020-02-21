import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContentBlocks from 'components/ContentBlocks/ContentBlocks';
import RelatedContent from 'components/RelatedContent/RelatedContent';
import Hero from 'components/Hero/Hero';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import PagePortfolioScreenshots from './PagePortfolioScreenshots/PagePortfolioScreenshots';

/**
 * Portfolio Single Page
 *
 * @name PagePortfolioSingle
 * @param {object} props.content - The content for this Page
 * @param {object} props.metadata - The metadata for this Page
 * @param {boolean} props.error - Flag for if there is an error fetching the data
 * @return {JSXElement}
 */
const PagePortfolioSingle = ({
  content,
  metadata,
  error
}) => {
  /**
   * @type {Object}
   * @property {string} content.title - The Page Title
   * @property {string} content.url - The Project's full URL, used for the Social Sharing Component
   * @property {object} content.hero - The Projects Hero
   * @property {array} content.contentBlocks - The flexible content blocks passed from the CMS
   * @property {array} content.projectTags - The Project Tags that are passed to the content blocks
   * @property {string} content.projectRole - My Role on this project
   * @property {string} content.projectURL - The Projects live URL
   * @property {array} content.screenshots - The Projects screenshots
   * @property {array} content.related - Related Projects
   * @property {boolean} content.noRelated - Flag to indicate if there was no related Projects
   */
  const {
    title,
    url,
    hero,
    contentBlocks,
    projectTags,
    projectRole,
    projectURL,
    screenshots,
    related,
    noRelated
  } = content;

  return (
    <PageWrapper error={ error }>
      <div className="Page PagePortfolioSingle">
        { metadata && <Meta { ...metadata } /> }
        { hero && <Hero hero={ hero } title={ title } subtitle={ projectRole } url={ url } type="Portfolio" /> }
        {contentBlocks.length > 0 && (
        <ContentBlocks
          contentBlocks={ contentBlocks }
          tags={ projectTags }
          projectURL={ projectURL }
        />
        ) }
        { screenshots.length > 0
            && <PagePortfolioScreenshots screenshots={ screenshots } /> }
        { related && <RelatedContent related={ related } type="portfolio" noRelated={ noRelated } /> }
      </div>
    </PageWrapper>
  );
};

PagePortfolioSingle.propTypes = {
  fetchPortfolioSingleDataAction: PropTypes.func,
  content: PropTypes.object,
  metadata: PropTypes.object,
  error: PropTypes.bool
};

const mapStateToProps = ({ pagePortfolioSingle }) => ({
  content: pagePortfolioSingle.content,
  metadata: pagePortfolioSingle.metadata,
  error: pagePortfolioSingle.error
});

export default connect(mapStateToProps, null)(PagePortfolioSingle);
