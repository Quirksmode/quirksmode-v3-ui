import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const ScrollToTop = ({
  history,
  location
}) => {
  useEffect(() => {
    // Keep default behavior of restoring scroll position when user:
    // - clicked back button
    // - clicked on a link that programmatically calls `history.goBack()`
    // - manually changed the URL in the address bar (here we might want
    // to scroll to top, but we can't differentiate it from the others)
    if (history.action === 'POP') {
      return;
    }
    // In all other cases, check fragment/scroll to top
    const { hash } = location;
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ block: 'start', behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  });

  return (
    <div />
  );
};

ScrollToTop.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};

export default withRouter(ScrollToTop);
