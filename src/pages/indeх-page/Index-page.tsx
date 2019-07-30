import React from 'react'
import { observer } from 'mobx-react'
import { withRouter } from 'react-router'
import { appStore } from '../../stores/app-store'

import './Index-page.scss'

enum Translation {
  Page = 'Index Page',
  Ip = 'your ip'
}

@(withRouter as any)
@observer
class IndexPage extends React.Component {
  async componentDidMount() {
    await appStore.getIp({ format: 'json' })
  }

  render() {
    return (
      <div className={'index-page'}>
        {Translation.Page}, {Translation.Ip} = {appStore.ip ? appStore.ip : '... waiting!'}
      </div>
    )
  }
}

export default IndexPage
