import React from 'react';
import SVGInline from 'react-svg-inline';
import IconQuirksmode from '!!raw-loader!icons/quirksmode.svg';

const Loading = () => (
  <div className="Loading">
    <div className="grid">
      <div className="Loading__spinnerWrap">
        <SVGInline svg={ IconQuirksmode } />
      </div>
    </div>
  </div>
);

export default Loading;
