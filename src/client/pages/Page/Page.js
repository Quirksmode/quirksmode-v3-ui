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
 * Description
 *
 * @name Page
 * @param  {object} props.cv []
 */
const Page = ({
  fetchPageDataAction,
  content,
  metadata,
  error,
  match
}) => {
  const {
    title,
    slug,
    contentBlocks
  } = content;

  useEffect(() => {
    if (slug !== match.params.slug) {
      fetchPageDataAction(match.params.slug);
    }
  }, [fetchPageDataAction, match.params.slug, slug]);

  return (
    <PageWrapper error={ error }>
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
  error: PropTypes.bool,
  match: PropTypes.object
};

const mapStateToProps = ({ page }) => ({
  content: page.content,
  metadata: page.metadata,
  error: page.error
});

const mapDispatchToProps = dispatch => ({
  fetchPageDataAction: (...args) => dispatch(fetchPageData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
