import React from 'react';
import PropTypes from 'prop-types';
import LinkLoader from 'components/LinkLoader/LinkLoader';
import Frame from 'components/Frame/Frame';

/**
 * PostItem Component
 *
 * @name PostItem
 * @param  {boolean} props.isNew [Show/Hide the New indicator]
 */
const PostItem = ({
  post,
  size,
  lineClamp = null
}) => {
  const {
    featuredImage,
    postTitle,
    postName,
    postExcerpt,
    date,
    type
  } = post;

  return (
    <article className="PostItem__post">
      { featuredImage && (
      <div className={ `PostItem__imgWrap PostItem__imgWrap--${size}` }>
        <LinkLoader
          key={ postName }
          type={ type }
          slug={ postName }
        >
          <Frame
            featuredImage={ featuredImage }
            size={ size }
          />
        </LinkLoader>
      </div>
      )}
      <div className="PostItem__textWrap">
        <header className="PostItem__textHeader">
          <h3 className="PostItem__postTitle">
            <LinkLoader
              key={ postName }
              type={ type }
              slug={ postName }
            >
              { postTitle }
            </LinkLoader>
          </h3>
          <p className="PostItem__postDate">
            { date }
          </p>
        </header>
        <section>
          <p className={ `PostItem__postExcerpt${lineClamp ? ` lineClamp lineClamp--${lineClamp}` : ''}` }>
            { postExcerpt }
          </p>
          <LinkLoader
            key={ postName }
            type={ type }
            slug={ postName }
          >
            <span className="PostItem__postLink link--withHeading link--withIcon">Read More</span>
          </LinkLoader>
        </section>
      </div>
    </article>
  );
};

PostItem.propTypes = {
  post: PropTypes.object,
  size: PropTypes.string,
  lineClamp: PropTypes.string
};

export default PostItem;
