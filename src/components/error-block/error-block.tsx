import React from 'react'
import './error-block.scss'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'

@(withRouter as any)
class ErrorBlock extends React.Component<IErrorBlock> {
  render() {
    const { title, subtitle, text, btntext, href } = this.props
    return (
      <div className="error-block">
        <div className="error-block__title">{title}</div>
        <div className="error-block__subtitle">{subtitle}</div>
        <div className="error-block__text">{text}</div>
        <div className="error-block__button">
          <Link to={href}>{btntext}</Link>
        </div>
      </div>
    )
  }
}

interface IErrorBlock {
  title: string
  subtitle: string
  text: string
  btntext: string
  href: string
  onClick?: () => void
}

export default ErrorBlock
