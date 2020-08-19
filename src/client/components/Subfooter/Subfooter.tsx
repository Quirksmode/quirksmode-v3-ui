import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SubfooterAbout from './SubfooterAbout/SubfooterAbout';
import SubfooterLatestTweets from './SubfooterLatestTweets/SubfooterLatestTweets';
import SubfooterInstagram from './SubfooterInstagram/SubfooterInstagram';
import SubfooterContact from './SubfooterContact/SubfooterContact';

const Subfooter = ({ about, latestTweets, instagram, contact }) => (
  <section className="Subfooter">
    <p className="visuallyHidden" id="int_subfooter">
      <strong>Sub Footer</strong>
    </p>
    <div className="Subfooter__innerWrap grid">
      <div className="Subfooter__sectionsWrap">
        {about && <SubfooterAbout about={about} />}
        {latestTweets && <SubfooterLatestTweets latestTweets={latestTweets} />}
      </div>
      <div className="Subfooter__sectionsWrap Subfooter__sectionsWrap--last">
        {instagram && <SubfooterInstagram instagram={instagram} />}
        {contact && <SubfooterContact contact={contact} />}
      </div>
    </div>
  </section>
);

Subfooter.propTypes = {
  about: PropTypes.object,
  latestTweets: PropTypes.object,
  instagram: PropTypes.object,
  contact: PropTypes.object,
};

const mapStateToProps = ({ app }) => ({
  about: app.subfooter.about,
  latestTweets: app.subfooter.latestTweets,
  instagram: app.subfooter.instagram,
  contact: app.subfooter.contact,
});

export default connect(mapStateToProps, null)(Subfooter);
