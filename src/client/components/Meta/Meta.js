import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const Meta = ({
  metaTitle,
  metaDesc,
  metaUrl,
  metaSiteName,
  metaImage,
  metaImageWidth,
  metaImageHeight,
}) => (
  <Helmet>
    <title>{ metaTitle }</title>
    <meta property="og:title" content={ metaTitle } />
    <meta name="description" content={ metaDesc } />
    <meta property="og:description" content={ metaDesc } />
    <link rel="canonical" href={ process.env.UI_URL + metaUrl } />
    <meta property="og:url" content={ process.env.UI_URL + metaUrl } />
    <meta property="og:site_name" content={ metaSiteName } />
    <meta property="og:image" content={ metaImage } />
    <meta property="og:image:secure_url" content={ metaImage } />
    <meta property="og:image:width" content={ metaImageWidth } />
    <meta property="og:image:height" content={ metaImageHeight } />
    <meta name="twitter:description" content={ metaDesc } />
    <meta name="twitter:title" content={ metaTitle } />
    <meta name="twitter:image" content={ metaImage } />
  </Helmet>
);

Meta.propTypes = {
  metaTitle: PropTypes.string,
  metaDesc: PropTypes.string,
  metaUrl: PropTypes.string,
  metaSiteName: PropTypes.string,
  metaImage: PropTypes.string,
  metaImageWidth: PropTypes.number,
  metaImageHeight: PropTypes.number
};

export default Meta;
