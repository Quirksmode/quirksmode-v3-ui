import React from 'react';
import ContentBlocks from 'components/ContentBlocks/ContentBlocks';
import RelatedContent from 'components/RelatedContent/RelatedContent';
import Hero from 'components/Hero/Hero';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import { useTypedSelector } from 'client/redux/types';

/**
 * Blog Single Page
 */
const PageBlogSingle: React.FC = () => {
  const pageBlogSingle = useTypedSelector((state) => state.pageBlogSingle);

  const { content, metadata, error } = pageBlogSingle;
  if (!content) return null;
  const { title, url, hero, contentBlocks, date, related, noRelated } = content;

  return (
    <PageWrapper error={error}>
      <div className="Page PageBlogSingle">
        {metadata && <Meta {...metadata} />}
        {hero && (
          <Hero
            hero={hero}
            title={title}
            subtitle={date}
            url={url}
            type="blog"
          />
        )}
        {contentBlocks && <ContentBlocks contentBlocks={contentBlocks} />}
        {related && (
          <RelatedContent related={related} type="blog" noRelated={noRelated} />
        )}
      </div>
    </PageWrapper>
  );
};

export default PageBlogSingle;
