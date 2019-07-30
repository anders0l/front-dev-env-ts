import React from 'react'

const moduleDefautExport = (module: any) => module.default || module

export default function asyncRoute(getComponent: any) {
  return class AsyncRoute extends React.Component {
    state = {
      Component: React.Component
    }

    UNSAFE_componentWillMount() {
      if (!this.state.Component) {
        getComponent()
          .then(moduleDefautExport)
          .then((Component: React.Component) => {
            this.setState(() => ({
              Component,
              loadFailed: null
            }))
          })
      }
    }

    render() {
      const { Component } = this.state

      return Component ? <Component {...this.props} /> : null
    }
  }
}
