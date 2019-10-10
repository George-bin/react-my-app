import React, { Component } from 'react'
import { Button } from 'antd';

export default class Demo extends Component {
  render () {
    return (
      <div className="demo-main-component">
        <Button type="primary">Primary</Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
      </div>
    )
  }
}
