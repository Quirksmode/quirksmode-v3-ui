import React, { PureComponent } from 'react';
import { ErrorBoundaryState, ErrorBoundaryProps } from './ErrorBoundary.types';

/**
 * ErrorBoundary Component
 *
 * @description
 * Catch errors in components and display error message.
 * Note: there is just no functional equivalent for componentDidCatch and
 * deriveStateFromError yet, which is why this has to be a class component
 */
export default class ErrorBoundary extends PureComponent<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }): void {
    this.setState({ error, errorInfo });
  }

  render() {
    const { children } = this.props;
    const { errorInfo, error } = this.state;

    return errorInfo ? (
      <div className="ErrorBoundary">
        <section className="Page__section Page__section--greyFade">
          <div className="Page__sectionInner grid">
            <h1>Something went wrong.</h1>
            <details className="ErrorBoundary__details">
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
