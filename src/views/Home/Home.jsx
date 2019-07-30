import React, { Component } from 'react';
import LeftAside from '../../components/LeftAside'

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <aside>
          <LeftAside />
        </aside>
        <h1>Home</h1>
      </div>
    )
  }
}
