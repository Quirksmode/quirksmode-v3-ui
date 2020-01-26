import React from 'react';
import PropTypes from 'prop-types';
import Sidebar from 'components/sidebar/sidebar';

/**
 * Description
 *
 * @name ContentBlocksContent
 * @param  {object} props []
 */
const ContentBlocksContent = ({
  block,
  tags = [],
  projectURL = ''
}) => (
  <div className="content-blocks-content content-blocks-content-sidebar">
    <div className="Page__sectionInner content-blocks__inner grid grid--sidebar">
      <Sidebar tags={ tags } showTags={ block.showTags } projectURL={ projectURL } />
      <div className="Page__content grid__content">
        <div dangerouslySetInnerHTML={ { __html: block.content } } />
      </div>
    </div>
  </div>
);

ContentBlocksContent.propTypes = {
  block: PropTypes.object,
  tags: PropTypes.array,
  projectURL: PropTypes.string
};

export default ContentBlocksContent;
