import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import Frame from 'components/Frame/Frame';

const RelatedContent = ({
  related,
  noRelated,
  type
}) => (
  <section className="RelatedContent Page__section Page__section--greyFade">
    <div className="Page__sectionInner grid">
      <div className="Page__headingWrap">
        <h2>
          { `${noRelated ? 'Other ' : 'Related '}`}
          { `${type === 'portfolio' ? 'Work' : 'Posts'}`}
        </h2>
        <NavLink
          to={ `/${type}` }
          className="link--withHeading link--withIcon"
        >
          View All
        </NavLink>
      </div>
      <div className="grid--frames">
        {
          related.map((item) => {
            const {
              featuredImage,
              post_title: postTitle,
              post_name: postName,
              ID: postId,
              isNew
            } = item;

            return (
              <NavLink
                to={ `/${type}/${postName}/` }
                className="PagePortfolio__project"
                key={ postId }
              >
                <Frame featuredImage={ featuredImage } title={ postTitle } isNew={ isNew } size="Medium" />
              </NavLink>
            );
          })
        }
      </div>
    </div>
  </section>
);

RelatedContent.propTypes = {
  related: PropTypes.array,
  noRelated: PropTypes.bool,
  type: PropTypes.string
};

export default RelatedContent;
