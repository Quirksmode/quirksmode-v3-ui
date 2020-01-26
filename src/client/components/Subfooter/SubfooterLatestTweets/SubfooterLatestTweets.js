import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import SVGInline from 'react-svg-inline';
import IconTwitter from '!!raw-loader!icons/twitter.svg';

const SubfooterLatestTweets = ({
  latestTweets
}) => {
  const {
    title,
    tweets,
    link_text: linkText,
    link
  } = latestTweets;

  return (
    <section className="SubfooterLatestTweets Subfooter__section">
      <h2 className="Subfooter__sectionHeading">{ title }</h2>
      <ul className="SubfooterLatestTweets__tweets">
        { tweets.length > 0 && tweets.map(tweet => (
          <li
            key={ tweet.id }
            className="SubfooterLatestTweets__tweet"
          >
            <SVGInline
              className="SubfooterLatestTweets__tweetIcon"
              svg={ IconTwitter }
            />
            <p
              className="SubfooterLatestTweets__tweetText"
              dangerouslySetInnerHTML={ { __html: tweet.text } }
            />
            <a
              className="SubfooterLatestTweets__tweetLink"
              href={ `http://twitter.com/quirksmode_uk/statuses/${tweet.idStr}` }
            >
              { tweet.date }
            </a>
          </li>
        ))
        }
      </ul>
      { link && (
        <NavLink
          className="Subfooter__link"
          to={ link.url }
          dangerouslySetInnerHTML={ { __html: linkText } }
        />
      )}
    </section>
  );
};

SubfooterLatestTweets.propTypes = {
  latestTweets: PropTypes.object
};

export default SubfooterLatestTweets;
