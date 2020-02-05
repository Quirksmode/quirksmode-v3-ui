import React, { PureComponent } from 'react';

export default class ErrorBoundary extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({ error, errorInfo });

    // You can also log error messages to an error reporting service here
  }

  render() {
    const { children } = this.props;
    const { errorInfo, error } = this.state;

    // If there's an error, render error path
    return errorInfo ? (
      // ".error-view" used by unit testing
      <div className="ErrorBoundary">
        <section className="Page__section Page__section--greyFade">
          <div className="Page__sectionInner grid">
            <h1>Something went wrong.</h1>
            <details style={ { whiteSpace: 'pre-wrap' } }>
              {error && error.toString()}
              <br />
              {errorInfo.componentStack}
            </details>
          </div>
        </section>
      </div>
    ) : (
      children || null
    );
  }
}
