import React from 'react'
import { Helmet } from 'react-helmet'
import NotFound from './not-found'

export default (props: any) => [
  <Helmet key="NotFoundPageHelmet">
    <title>Not Found</title>
    <meta name="description" content="Not Found" />
  </Helmet>,
  <NotFound key="NotFoundPageComponent" {...props} />
]
