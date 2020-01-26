import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
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
  match,
  title,
  slug,
  contentBlocks
}) => {
  useEffect(() => {
    if (slug !== match.params.slug) {
      fetchPageDataAction(match.params.slug);
    }
  }, [fetchPageDataAction, match.params.slug, slug]);

  return (
    <div className="page">
      <Helmet>
        <title>Page Helmet Test</title>
        <meta property="og:title" content="Home Page" />
      </Helmet>
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
  );
};

Page.propTypes = {
  fetchPageDataAction: PropTypes.func,
  match: PropTypes.object,
  title: PropTypes.string,
  slug: PropTypes.string,
  contentBlocks: PropTypes.array
};

const mapStateToProps = ({ page }) => ({
  title: page.title,
  slug: page.slug,
  content: page.content,
  contentBlocks: page.contentBlocks
});

const mapDispatchToProps = dispatch => ({
  fetchPageDataAction: (...args) => dispatch(fetchPageData(...args))
});

export default connect(mapStateToProps, mapDispatchToProps)(Page);
