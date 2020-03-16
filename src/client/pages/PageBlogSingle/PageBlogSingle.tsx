import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContentBlocks from 'components/ContentBlocks/ContentBlocks';
import RelatedContent from 'components/RelatedContent/RelatedContent';
import Hero from 'components/Hero/Hero';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';

/**
 * Blog Single Page
 *
 * @name PageBlogSingle
 * @param {object} props.content - The content for this Page
 * @param {object} props.metadata - The metadata for this Page
 * @param {boolean} props.error - Flag for if there is an error fetching the data
 * @return {JSXElement}
 */
const PageBlogSingle = ({
  content,
  metadata,
  error
}) => {
  /**
   * @type {Object}
   * @property {string} content.title - The Page Title
   * @property {string} content.url - The Blog Posts full URL, used for the Social Sharing Component
   * @property {object} content.hero - The Blog Posts Hero
   * @property {array} content.contentBlocks - The flexible content blocks passed from the CMS
   * @property {string} content.date - The Blog Posts Date
   * @property {array} content.related - Related Blog Posts
   * @property {boolean} content.noRelated - Flag to indicate if there was no related Blog Posts
   */
  const {
    title,
    url,
    hero,
    contentBlocks,
    date,
    related,
    noRelated
  } = content;

  return (
    <PageWrapper error={ error }>
      <div className="Page PageBlogSingle">
        { metadata && <Meta { ...metadata } /> }
        { hero && <Hero hero={ hero } title={ title } subtitle={ date } url={ url } type="Portfolio" /> }
        { contentBlocks && <ContentBlocks contentBlocks={ contentBlocks } /> }
        { related && <RelatedContent related={ related } type="blog" noRelated={ noRelated } /> }
      </div>
    </PageWrapper>
  );
};

PageBlogSingle.propTypes = {
  content: PropTypes.object,
  metadata: PropTypes.object,
  error: PropTypes.bool
};

const mapStateToProps = ({ pageBlogSingle }) => ({
  content: pageBlogSingle.content,
  metadata: pageBlogSingle.metadata,
  error: pageBlogSingle.error
});

export default connect(mapStateToProps, null)(PageBlogSingle);
