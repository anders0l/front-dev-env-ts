import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Route } from 'react-router'
import { hydrate, render } from 'react-dom'

import 'lazysizes/plugins/attrchange/ls.attrchange'
import 'lazysizes/plugins/bgset/ls.bgset.js'
import 'lazysizes'

import App from './app/App'
import routes from './routes'

const Main = () => (
  <BrowserRouter>
    <App>
      {routes.map((route, i) => (
        <Route
          key={i}
          path={route.path}
          exact={route.exact}
          render={props => {
            const ComponentView: any = route.component
            return <ComponentView {...props} route={route} />
          }}
        />
      ))}
    </App>
  </BrowserRouter>
)

const renderMethod = !!module.hot ? render : hydrate

renderMethod(<Main />, document.getElementById('app'))
