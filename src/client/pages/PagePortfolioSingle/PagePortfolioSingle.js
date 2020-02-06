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
 * Description
 *
 * @name PagePortfolioSingle
 * @param  {object} props []
 */
const PagePortfolioSingle = ({
  content,
  metadata,
  error
}) => {
  const {
    title,
    url,
    hero,
    projectTags,
    projectRole,
    projectURL,
    screenshots,
    related,
    noRelated,
    contentBlocks
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
  match: PropTypes.object,
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
