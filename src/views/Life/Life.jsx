import React, { Component } from 'react';
import LeftAside from '../../components/LeftAside';

let asideNav = [
  {
    id: '1',
    label: '分类',
    list: [{
      id: '1-1',
      label: 'Vue'
    }, {
      id: '1-2',
      label: 'React'
    }, {
      id: '1-3',
      label: 'Electron'
    }, {
      id: '1-4',
      label: '微信小程序'
    }]
  }, {
    id: '2',
    label: '随笔',
    list: [{
      id: '2-1',
      label: 'undefined和null的区别?'
    }, {
      id: '2-2',
      label: 'JS继承?'
    }]
  }, {
    id: '3',
    label: '日期',
    list: [{
      id: '3-1',
      label: '2018-080-12'
    }, {
      id: '3-2',
      label: '2018-080-14'
    }]
  }
]

export default class Life extends Component {
  render() {
    return (
      <div>
        <LeftAside asideNav={asideNav} />
        <h3>Life</h3>
      </div>
    )
  }
}
