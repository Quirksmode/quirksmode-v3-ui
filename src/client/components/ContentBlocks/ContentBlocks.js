import React, {
  Fragment
} from 'react';
import PropTypes from 'prop-types';
import ContentBlocksContent from './ContentBlocksContent/ContentBlocksContent';
import ContentBlocksContentSidebar from './ContentBlocksContentSidebar/ContentBlocksContentSidebar';
import ContentBlocksCode from './ContentBlocksCode/ContentBlocksCode';
import ContentBlocksImageFull from './ContentBlocksImageFull/ContentBlocksImageFull';

/**
 * Description
 *
 * @name ContentBlocks
 * @param  {object} props []
 */
const ContentBlocks = ({
  contentBlocks,
  tags,
  projectURL = ''
}) => (
  <div className="ContentBlocks">
    { contentBlocks.length > 0 && contentBlocks.map(block => (
      <Fragment key={ block.id }>
        { block.type === 'content' && <ContentBlocksContent block={ block } /> }
        { block.type === 'contentSidebar' && <ContentBlocksContentSidebar block={ block } tags={ tags } projectURL={ projectURL } /> }
        { block.type === 'code' && <ContentBlocksCode block={ block } /> }
        { block.type === 'image' && <ContentBlocksImageFull block={ block } /> }
      </Fragment>
    ))}
  </div>
);

ContentBlocks.propTypes = {
  contentBlocks: PropTypes.array,
  tags: PropTypes.array,
  projectURL: PropTypes.string
};

export default ContentBlocks;
