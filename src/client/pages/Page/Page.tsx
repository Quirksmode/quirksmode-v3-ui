import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import ContentBlocks from 'components/ContentBlocks/ContentBlocks';
import { fetchPageData } from './Page.actions';

/**
 * Default Page
 *
 * @name PageAbout
 * @param {function} props.fetchPageDataAction - Redux action to Fetch the About Page Data
 * @param {object} props.content - The content for this Page
 * @param {object} props.metadata - The metadata for this Page
 * @param {boolean} props.loading - Flag for while the data is being fetched
 * @param {boolean} props.error - Flag for if there is an error fetching the data
 * @param {object} props.match - The matched route properties
 * @return {JSXElement}
 */
const Page = ({
  fetchPageDataAction,
  content,
  metadata,
  loading,
  error,
  match
}) => {
  /**
   * @type {Object}
   * @property {string} content.title - The Page Title
   * @property {string} content.slug - The Page Slug
   * @property {array} content.contentBlocks - The flexible content blocks passed from the CMS
   */
  const {
    title,
    slug,
    contentBlocks
  } = content;

  /**
   * Fetch the Page Data via Redux using the routes slug param
   */
  useEffect(() => {
    if (slug !== match.params.slug) {
      fetchPageDataAction(match.params.slug);
    }
  }, [fetchPageDataAction, match.params.slug, slug]);

  return (
    <PageWrapper error={ error } loading={ loading }>
      <div className="page">
        { metadata && <Meta { ...metadata } /> }
        <section className="Page__section Page__section--greyFade Page__hero">
          <div className="Page__sectionInner grid">
            <h1>{ title }</h1>
            <Breadcrumbs>
              <span className="Breadcrumbs__divider">&gt;</span>
              <span className="Breadcrumbs__active">{ title }</span>
            </Breadcrumbs>
          </div>
        </section>
        <ContentBlocks contentBlocks={ contentBlocks } />
      </div>
    </PageWrapper>
  );
};

Page.propTypes = {
  fetchPageDataAction: PropTypes.func,
  content: PropTypes.object,
  metadata: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.bool,
  match: PropTypes.object
};

const mapStateToProps = ({ page }) => ({
  content: page.content,
  metadata: page.metadata,
  loading: page.loading,
  error: page.error
});

const mapDispatchToProps = dispatch => ({
  fetchPageDataAction: (...args) => dispatch(fetchPageData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
