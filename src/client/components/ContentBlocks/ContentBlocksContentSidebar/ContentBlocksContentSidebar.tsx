import React from 'react';
import Sidebar from 'components/Sidebar/Sidebar';
import { ContentBlockContentSidebarProps } from '../ContentBlocks.types';

/**
 * ContentBlocksContent Component
 */
const ContentBlocksContent: React.FC<ContentBlockContentSidebarProps> = ({
  block,
  tags = [],
  projectURL = '',
}) => {
  const { showTags, content } = block;

  return (
    <div className="content-blocks-content content-blocks-content-sidebar">
      <div className="Page__sectionInner content-blocks__inner grid grid--sidebar">
        <Sidebar tags={tags} showTags={showTags} projectURL={projectURL} />
        <div className="Page__content grid__content">
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default ContentBlocksContent;
