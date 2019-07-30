import React from 'react'

import ErrorBlock from '../error-block'

class ErrorBoundary extends React.Component {
  state = {
    hasAppError: false
  }

  componentDidCatch() {
    this.setState({ hasAppError: true })
  }

  refresh = () => {
    location.reload()
  }

  render() {
    if (this.state.hasAppError) {
      return (
        <ErrorBlock
          title="Oops"
          subtitle="Something went wrong"
          text=""
          href="/"
          btntext="Refresh page"
          onClick={this.refresh}
        />
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
