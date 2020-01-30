import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Prism from 'prismjs';
import ContentBlocks from 'components/ContentBlocks/ContentBlocks';
import RelatedContent from 'components/RelatedContent/RelatedContent';
import Hero from 'components/Hero/Hero';
import Meta from 'components/Meta/Meta';
import { fetchBlogSingleData } from './PageBlogSingle.actions';

/**
 * Description
 *
 * @name PageBlogSingle
 * @param  {object} props []
 */
const PageBlogSingle = ({
  fetchBlogSingleDataAction,
  match,
  title,
  slug,
  url,
  contentBlocks,
  date,
  related,
  noRelated,
  hero,
  metadata
}) => {
  useEffect(() => {
    if (slug !== match.params.slug) {
      fetchBlogSingleDataAction(match.params.slug);
    }
  }, [fetchBlogSingleDataAction, match.params.slug, slug]);

  useEffect(() => {
    Prism.highlightAll();
  });

  return title && (
    <div className="Page PageBlogSingle">
      <Meta { ...metadata } />
      <Hero hero={ hero } title={ title } subtitle={ date } url={ url } type="Portfolio" />
      <ContentBlocks contentBlocks={ contentBlocks } />
      { related && <RelatedContent related={ related } type="blog" noRelated={ noRelated } /> }
    </div>
  );
};

PageBlogSingle.propTypes = {
  fetchBlogSingleDataAction: PropTypes.func,
  match: PropTypes.object,
  title: PropTypes.string,
  slug: PropTypes.string,
  url: PropTypes.string,
  featuredImage: PropTypes.object,
  introContent: PropTypes.string,
  contentBlocks: PropTypes.array,
  date: PropTypes.string,
  related: PropTypes.array,
  noRelated: PropTypes.bool,
  hero: PropTypes.object,
  metadata: PropTypes.object
};

const mapStateToProps = ({ pageBlogSingle }) => ({
  title: pageBlogSingle.title,
  slug: pageBlogSingle.slug,
  url: pageBlogSingle.url,
  contentBlocks: pageBlogSingle.contentBlocks,
  date: pageBlogSingle.date,
  related: pageBlogSingle.related,
  noRelated: pageBlogSingle.noRelated,
  hero: pageBlogSingle.hero,
  metadata: pageBlogSingle.metadata
});

const mapDispatchToProps = dispatch => ({
  fetchBlogSingleDataAction: (...args) => dispatch(fetchBlogSingleData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(PageBlogSingle);
