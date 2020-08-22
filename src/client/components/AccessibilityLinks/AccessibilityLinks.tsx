import React from 'react';

/**
 * AccessibilityLinks Component
 */
const AccessibilityLinks = () => (
  <div className="AccessibilityLinks visuallyHidden">
    <p id="intTop">
      <strong>Accessibility Links</strong>
    </p>
    <ul>
      <li>
        <a href="#intContent">Skip to Main Content</a>
      </li>
      <li>
        <a href="#intFooter">Skip to Footer Content</a>
      </li>
    </ul>
  </div>
);

export default AccessibilityLinks;
