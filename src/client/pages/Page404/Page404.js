import React from 'react';
import { Helmet } from 'react-helmet';
/**
 * 404 Page Component
 *
 * @name Page404
 */
const Page404 = () => (
  <div className="page page404">
    <Helmet>
      <title>Error - 404</title>
      <meta property="og:title" content="Error - 404" />
      <meta name="description" content="404 Page" />
    </Helmet>
    <section className="Page__section Page__section--greyFade Page__hero">
      <div className="Page__sectionInner grid">
        <h1>Error - 404</h1>
      </div>
    </section>
    <div className="Page__sectionInner ContentBlocks__inner grid">
      <div className="Page__content grid__content">
        <p>Oops, looks like this page cannot be found.</p>
      </div>
    </div>
  </div>
);

export default Page404;
