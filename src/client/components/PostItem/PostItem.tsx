import React from 'react';
import LinkLoader from 'components/LinkLoader/LinkLoader';
import Frame from 'components/Frame/Frame';
import { PostItemProps } from './PostItem.types';

/**
 * PostItem Component
 */
const PostItem: React.FC<PostItemProps> = ({
  post,
  size,
  lineClamp = null,
}) => {
  const { featuredImage, postTitle, postName, postExcerpt, date, type } = post;

  return (
    <article className="PostItem__post">
      {featuredImage && (
        <div className={`PostItem__imgWrap PostItem__imgWrap--${size}`}>
          <LinkLoader
            key={postName}
            type={type}
            slug={postName}
            title={postTitle}
          >
            <Frame featuredImage={featuredImage} size={size} />
          </LinkLoader>
        </div>
      )}
      <div className="PostItem__textWrap">
        <header className="PostItem__textHeader">
          <h3 className="PostItem__postTitle">
            <LinkLoader key={postName} type={type} slug={postName}>
              {postTitle}
            </LinkLoader>
          </h3>
          <p className="PostItem__postDate">{date}</p>
        </header>
        <section>
          <p
            className={`PostItem__postExcerpt${
              lineClamp ? ` lineClamp lineClamp--${lineClamp}` : ''
            }`}
          >
            {postExcerpt}
          </p>
          <LinkLoader key={postName} type={type} slug={postName}>
            <span className="PostItem__postLink link--withHeading link--withIcon">
              Read More
            </span>
          </LinkLoader>
        </section>
      </div>
    </article>
  );
};

export default PostItem;
