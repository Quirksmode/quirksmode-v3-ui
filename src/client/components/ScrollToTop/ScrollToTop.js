import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const ScrollToTop = ({
  history,
  location
}) => {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (history.action === 'POP' || currentUrl === location.pathname) {
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

    setCurrentUrl(location.pathname);
  }, [history, currentUrl, location]);

  return (
    <div />
  );
};

ScrollToTop.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object
};

export default withRouter(ScrollToTop);
