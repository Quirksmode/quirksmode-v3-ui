import { Helmet } from 'react-helmet';
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContentBlocks from 'components/ContentBlocks/ContentBlocks';
import RelatedContent from 'components/RelatedContent/RelatedContent';
import Hero from 'components/Hero/Hero';
import Meta from 'components/Meta/Meta';
import { fetchPortfolioSingleData } from './PagePortfolioSingle.actions';
import PagePortfolioSingleContent from './PagePortfolioSingleContent/PagePortfolioSingleContent';

/**
 * Description
 *
 * @name PagePortfolioSingle
 * @param  {object} props []
 */
const PagePortfolioSingle = ({
  title,
  url,
  hero,
  content,
  related,
  noRelated,
  contentBlocks,
  metadata
}) => title && (
  <div className="Page PagePortfolioSingle">
    <Meta { ...metadata } />
    <Hero hero={ hero } title={ title } subtitle={ content.projectRole } url={ url } type="Portfolio" />
    <ContentBlocks
      contentBlocks={ contentBlocks }
      tags={ content.projectTags }
      projectURL={ content.projectURL }
    />
    { content.projectScreenshots.length > 0
        && <PagePortfolioSingleContent content={ content } /> }
    { related && <RelatedContent related={ related } type="portfolio" noRelated={ noRelated } /> }
  </div>
);
PagePortfolioSingle.propTypes = {
  fetchPortfolioSingleDataAction: PropTypes.func,
  match: PropTypes.object,
  title: PropTypes.string,
  slug: PropTypes.string,
  url: PropTypes.string,
  featuredImage: PropTypes.object,
  content: PropTypes.object,
  related: PropTypes.array,
  noRelated: PropTypes.bool,
  metadata: PropTypes.object
};

const mapStateToProps = ({ pagePortfolioSingle }) => ({
  title: pagePortfolioSingle.title,
  slug: pagePortfolioSingle.slug,
  url: pagePortfolioSingle.url,
  featuredImage: pagePortfolioSingle.featuredImage,
  hero: pagePortfolioSingle.hero,
  content: pagePortfolioSingle.content,
  related: pagePortfolioSingle.related,
  noRelated: pagePortfolioSingle.noRelated,
  contentBlocks: pagePortfolioSingle.contentBlocks,
  metadata: pagePortfolioSingle.metadata
});

const mapDispatchToProps = dispatch => ({
  fetchPortfolioSingleDataAction: (...args) => dispatch(fetchPortfolioSingleData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PagePortfolioSingle);
