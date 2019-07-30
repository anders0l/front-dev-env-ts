import React from 'react'
import './_reset.scss'
import './_defaults.scss'
import Footer from '../footer/index'
import Header from '../header/index'

class Layout extends React.Component<ILayout> {
  render() {
    return (
      <div className={this.props.className}>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

interface ILayout {
  className: string
}

export default Layout
