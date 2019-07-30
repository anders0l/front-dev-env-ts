import React from 'react'
import { Switch, withRouter, RouteComponentProps } from 'react-router'
import { observer } from 'mobx-react'
import Layout from '../components/layout/index'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './page-transitions.scss'
import './App.scss'

import ErrorBoundary from '../components/error-boundary/index'

@(withRouter as any)
@observer
export default class App extends React.Component<IApp> {
  componentDidUpdate(prevProps: any) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    const { location, children } = this.props
    const currentKey = location.pathname.split('/')[1] || '/'
    return (
      <ErrorBoundary>
        <Layout className={`page page-${currentKey}`}>
          <TransitionGroup component="main" className={`page-main`} style={{ paddingTop: 10 }}>
            <CSSTransition key={currentKey} timeout={{ enter: 500, exit: 0 }} classNames="fade">
              <Switch location={location}>{children}</Switch>
            </CSSTransition>
          </TransitionGroup>
        </Layout>
      </ErrorBoundary>
    )
  }
}

interface IApp {
  location?: any
  history?: any
  children?: any
  type?: any
  props?: any
  key?: any
}
