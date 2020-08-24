import React, { Fragment } from 'react';
import ContentBlocksContent from './ContentBlocksContent/ContentBlocksContent';
import ContentBlocksContentSidebar from './ContentBlocksContentSidebar/ContentBlocksContentSidebar';
import ContentBlocksCode from './ContentBlocksCode/ContentBlocksCode';
import ContentBlocksImageFull from './ContentBlocksImageFull/ContentBlocksImageFull';
import { ContentBlocksProps } from './ContentBlocks.types';

/**
 * ContentBlocks Component
 */
const ContentBlocks: React.FC<ContentBlocksProps> = ({
  contentBlocks,
  tags,
  projectURL = '',
}) => (
  <div className="ContentBlocks">
    {contentBlocks.length > 0 &&
      contentBlocks.map((block) => (
        <Fragment key={block.id}>
          {block.type === 'content' && <ContentBlocksContent block={block} />}
          {block.type === 'contentSidebar' && (
            <ContentBlocksContentSidebar
              block={block}
              tags={tags}
              projectURL={projectURL}
            />
          )}
          {block.type === 'code' && <ContentBlocksCode block={block} />}
          {block.type === 'image' && <ContentBlocksImageFull block={block} />}
        </Fragment>
      ))}
  </div>
);

export default ContentBlocks;
