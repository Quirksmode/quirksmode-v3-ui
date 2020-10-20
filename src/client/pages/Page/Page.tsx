import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Breadcrumbs from 'components/Breadcrumbs/Breadcrumbs';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import ContentBlocks from 'components/ContentBlocks/ContentBlocks';
import { fetchPageData } from './Page.actions';
import { useTypedSelector } from 'client/redux/types';
import { useParams } from 'react-router-dom';
import { RouteParams } from './Page.types';

/**
 * Default Page
 */
const Page: React.FC = () => {
  const dispatch = useDispatch();
  const params: RouteParams = useParams();
  const page = useTypedSelector((state) => state.page);

  const { content, metadata, loading, error } = page;
  const { title, contentBlocks } = content;

  // Fetch the Page Data via Redux using the routes slug param
  useEffect(() => {
    dispatch(fetchPageData(params.slug));
  }, [params.slug]);

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
