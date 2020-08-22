import React from 'react';
import PropTypes from 'prop-types';
import IconTwitter from 'icons/twitter.svg';
import IconFacebook from 'icons/facebook.svg';
import IconLinkedIn from 'icons/linkedin.svg';
import IconContact from 'icons/contact.svg';

/**
 * Share Component
 *
 * @name Share
 * @param {string} title [The title]
 * @param {string} url [The url]
 */
const Share = ({ title, url }) => {
  /**
   * Open a window for the Share Component
   *
   * @method openWindow
   * @param {String} shareUrl
   */
  const openWindow = (shareUrl) => {
    const winWidth = 650;
    const winHeight = 450;
    const winLeft = (window.innerWidth - winWidth) / 2;
    const winTop = (window.innerHeight - winHeight) / 2;
    const winOptions = `width=${winWidth},height=${winHeight},top=${winTop},left=${winLeft}`;
    window.open(shareUrl, 'Share', winOptions);
  };

  /**
   * Click Event Handler
   *
   * @method handleClick
   * @param {Event} e [Event]
   */
  const handleClick = (e) => {
    e.preventDefault();
    openWindow(e.target.href);
  };

  return (
    <div className="Share" data-test="Share">
      <a
        onClick={(e) => handleClick(e)}
        className="Share__icon"
        href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share this on Facebook"
      >
        <span className="visuallyHidden">Share this on Facebook</span>
        <IconFacebook />
      </a>
      <a
        onClick={(e) => handleClick(e)}
        className="Share__icon"
        href={`https://twitter.com/intent/tweet?text=${title}&url=${url}"`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share this on Twitter"
      >
        <span className="visuallyHidden">Share this on Twitter</span>
        <IconTwitter />
      </a>
      <a
        onClick={(e) => handleClick(e)}
        className="Share__icon"
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share this on Linked In"
      >
        <span className="visuallyHidden">Share this on Linked In</span>
        <IconLinkedIn />
      </a>
      <a
        className="Share__icon"
        href={`mailto:?subject=${title}&body=Hey, check this out!: ${url}`}
        target="_blank"
        rel="noopener noreferrer"
        title="Share this by Email"
      >
        <span className="visuallyHidden">Share this by Email</span>
        <IconContact />
      </a>
    </div>
  );
};

Share.propTypes = {
  title: PropTypes.string,
  url: PropTypes.string,
};

export default Share;
