import React from 'react';
import PropTypes from 'prop-types';

/**
 * Description
 *
 * @name ContentBlocksContent
 * @param  {object} props []
 */
const ContentBlocksContent = ({
  block
}) => (
  <div className="ContentBlocksContent">
    <div className="Page__sectionInner ContentBlocks__inner grid">
      <div className={ `Page__content grid__content${block.fullWidth ? ' grid__content--full' : ''}${block.centerAlign ? ' grid__content--center' : ''}` }>
        <div dangerouslySetInnerHTML={ { __html: block.content } } />
      </div>
    </div>
  </div>
);

ContentBlocksContent.propTypes = {
  block: PropTypes.object
};

export default ContentBlocksContent;
