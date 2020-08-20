import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import ContentBlocks from 'components/ContentBlocks/ContentBlocks';
import { fetchPageData } from './Page.actions';
import { useTypedSelector } from 'client/redux/types';
import { useParams } from 'react-router-dom';

interface RouteParams {
  slug: string;
}

/**
 * Default Page Component
 */
const Page: React.FC = () => {
  // Redux Hooks
  const dispatch = useDispatch();
  const params: RouteParams = useParams();
  const page = useTypedSelector((state) => state.page);

  const { content, metadata, loading, error } = page;
  if (!content) return null;
  const { title, slug, contentBlocks } = content;

  /**
   * Fetch the Page Data via Redux using the routes slug param
   */
  useEffect(() => {
    if (slug !== params.slug) {
      dispatch(fetchPageData(params.slug));
    }
  }, [fetchPageData, params.slug, slug]);

  return (
    <PageWrapper error={error} loading={loading}>
      <div className="page">
        {metadata && <Meta {...metadata} />}
        <section className="Page__section Page__section--greyFade Page__hero">
          <div className="Page__sectionInner grid">
            <h1>{title}</h1>
            <Breadcrumbs>
              <span className="Breadcrumbs__divider">&gt;</span>
              <span className="Breadcrumbs__active">{title}</span>
            </Breadcrumbs>
          </div>
        </section>
        <ContentBlocks contentBlocks={contentBlocks} />
      </div>
    </PageWrapper>
  );
};

export default Page;
