import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ContentBlocks from 'components/ContentBlocks/ContentBlocks';
import RelatedContent from 'components/RelatedContent/RelatedContent';
import Hero from 'components/Hero/Hero';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';

/**
 * Description
 *
 * @name PageBlogSingle
 * @param  {object} props []
 */
const PageBlogSingle = ({
  content,
  metadata,
  error
}) => {
  const {
    title,
    url,
    contentBlocks,
    date,
    related,
    noRelated,
    hero,
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
  match: PropTypes.object,
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
