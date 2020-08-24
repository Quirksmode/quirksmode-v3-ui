import React from 'react';
import IconTwitter from 'icons/twitter.svg';
import { SubfooterLatestTweetsProps } from '../Subfooter.types';

const SubfooterLatestTweets: React.FC<SubfooterLatestTweetsProps> = ({
  latestTweets,
}) => {
  const { title, tweets, link_text: linkText, link } = latestTweets;

  return (
    <section className="SubfooterLatestTweets Subfooter__section">
      <h2 className="Subfooter__sectionHeading">{title}</h2>
      <ul className="SubfooterLatestTweets__tweets">
        {tweets.length > 0 &&
          tweets.map((tweet) => (
            <li key={tweet.id} className="SubfooterLatestTweets__tweet">
              <IconTwitter className="SubfooterLatestTweets__tweetIcon" />
              <p
                className="SubfooterLatestTweets__tweetText"
                dangerouslySetInnerHTML={{ __html: tweet.text }}
              />
              <a
                className="SubfooterLatestTweets__tweetLink"
                href={`http://twitter.com/quirksmode_uk/statuses/${tweet.idStr}`}
              >
                {tweet.date}
              </a>
            </li>
          ))}
      </ul>
      {link && (
        <a
          href={link.url}
          className="Subfooter__link"
          dangerouslySetInnerHTML={{ __html: linkText }}
        />
      )}
    </section>
  );
};

export default SubfooterLatestTweets;
