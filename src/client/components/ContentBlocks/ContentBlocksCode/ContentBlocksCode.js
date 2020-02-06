import React, {
  useEffect
} from 'react';
import PropTypes from 'prop-types';
import Prism from 'prismjs';

/**
 * Description
 *
 * @name ContentBlocksCode
 * @param  {object} props []
 */
const ContentBlocksCode = ({
  block
}) => {
  useEffect(() => {
    Prism.highlightAll();
  }, []);
  return (
    <div className="ContentBlocksCode">
      { block.intro && (
      <div className="ContentBlocksCode__intro">
        <div className="Page__content grid__content grid__content--center grid">
          <div dangerouslySetInnerHTML={ { __html: block.intro } } />
        </div>
      </div>
      )}
      <div className="ContentBlocksCode__code Page__section">
        <div className="ContentBlocks__inner grid__content grid__content--center grid">
          <pre>
            <code className={ `language-${block.language}` }>{ block.code }</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

ContentBlocksCode.propTypes = {
  block: PropTypes.object
};

export default ContentBlocksCode;
