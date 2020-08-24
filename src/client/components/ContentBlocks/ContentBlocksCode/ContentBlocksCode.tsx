import React, { useEffect } from 'react';
import Prism from 'prismjs';
import { ContentBlockCodeProps } from '../ContentBlocks.types';

/**
 * ContentBlocksCode Component
 */
const ContentBlocksCode: React.FC<ContentBlockCodeProps> = ({ block }) => {
  const { intro, language, code } = block;

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="ContentBlocksCode">
      {block.intro && (
        <div className="ContentBlocksCode__intro">
          <div className="Page__content grid__content grid__content--center grid">
            <div dangerouslySetInnerHTML={{ __html: intro }} />
          </div>
        </div>
      )}
      <div className="ContentBlocksCode__code Page__section">
        <div className="ContentBlocks__inner grid__content grid__content--center grid">
          <pre>
            <code className={`language-${language}`}>{code}</code>
          </pre>
        </div>
      </div>
    </div>
  );
};

export default ContentBlocksCode;
