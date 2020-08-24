import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const history = useHistory();
  const location = useLocation();
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

  return <div />;
};

export default ScrollToTop;
