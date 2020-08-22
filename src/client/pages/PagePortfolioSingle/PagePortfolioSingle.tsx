import React from 'react';
import ContentBlocks from 'components/ContentBlocks/ContentBlocks';
import RelatedContent from 'components/RelatedContent/RelatedContent';
import Hero from 'components/Hero/Hero';
import Meta from 'components/Meta/Meta';
import PageWrapper from 'components/PageWrapper/PageWrapper';
import PagePortfolioScreenshots from './PagePortfolioScreenshots/PagePortfolioScreenshots';
import { useTypedSelector } from 'client/redux/types';

/**
 * Portfolio Single Page
 */
const PagePortfolioSingle = () => {
  // Redux Hooks
  const pagePortfolioSingle = useTypedSelector(
    (state) => state.pagePortfolioSingle
  );

  const { content, metadata, error } = pagePortfolioSingle;
  if (!content) return null;
  const {
    title,
    url,
    hero,
    contentBlocks,
    projectTags,
    projectRole,
    projectURL,
    screenshots,
    related,
    noRelated,
  } = content;

  return (
    <PageWrapper error={error}>
      <div className="Page PagePortfolioSingle">
        {metadata && <Meta {...metadata} />}
        {hero && (
          <Hero
            hero={hero}
            title={title}
            subtitle={projectRole}
            url={url}
            type="Portfolio"
          />
        )}
        {contentBlocks.length > 0 && (
          <ContentBlocks
            contentBlocks={contentBlocks}
            tags={projectTags}
            projectURL={projectURL}
          />
        )}
        {screenshots.length > 0 && (
          <PagePortfolioScreenshots screenshots={screenshots} />
        )}
        {related && (
          <RelatedContent
            related={related}
            type="portfolio"
            noRelated={noRelated}
          />
        )}
      </div>
    </PageWrapper>
  );
};

export default PagePortfolioSingle;
