import React from 'react'
import unsupported from './unsupported-browser-popup'

interface IHtml {
  styles?: any
  scripts?: any
}

class Html extends React.Component<IHtml> {
  render() {
    const { styles, scripts } = this.props
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="theme-color" content="#ffffff" />
          <script dangerouslySetInnerHTML={{ __html: unsupported }} />
          {scripts.map((script: any, i: number) => (
            <link key={script} rel="preload" href={script} as="script" />
          ))}
          {styles.map((style: any, i: number) => (
            <link key={style} rel="stylesheet" href={style} />
          ))}
        </head>
        <body>
          <div id="app" />
          {scripts.map((script: any, i: number) => (
            <script key={script} src={script} />
          ))}
        </body>
      </html>
    )
  }
}

export default Html
