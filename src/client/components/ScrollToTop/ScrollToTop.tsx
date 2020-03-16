import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const ScrollToTop = ({
  history,
  location
}) => {
  useEffect(() => {
    // Prevent Scroll if navigating back or adjusting query parameters
    if (history.action === 'POP' || history.location.search) {
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
  }, [history, location]);

  return (
    <div />
  );
};

ScrollToTop.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};

export default withRouter(ScrollToTop);
