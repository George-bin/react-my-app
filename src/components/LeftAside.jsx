import React, { Component } from 'react';
import { Link, Route} from 'react-router-dom';
import '../assets/style/leftAside.scss';

export default class LeftAside extends Component {
  constructor (props) {
    super(props);
    this.handlePushRoute = this.handlePushRoute.bind(this)
  }
  handlePushRoute (route) {
    // this.context.router.history.push(`/home/${route.id}`)
    // this.props.history.push(`/home/${route.id}`)
  }
  render() {
    console.log(this.props.asideNav)
    let { classify, jottings, date } = this.props.asideNav
    return (
      <div className="aside-nav-main-component">
        <div className="aside-nav-package-el">
          {/*分类*/}
          <fieldset className="classify-section aside-nav-item">
            <legend>分类</legend>
            <ul>
              {
                classify.list.map((item) => {
                  return (
                    <li key={item.id} onClick={this.handlePushRoute(item)}>
                      <Link to={`/home/classify/${item.id}`}>{item.label}</Link>
                      {/*<Link to={`/life`}>{item.label}</Link>*/}
                    </li>
                  )
                })
              }
            </ul>
          </fieldset>
          {/*随笔*/}
          <fieldset className="jottings-section aside-nav-item">
            <legend>随笔</legend>
            <ul>
              {
                jottings.list.map((item) => {
                  return (
                    <li key={item.id}>
                      <Link to="/articleInfo/:id">{item.label}</Link>
                    </li>
                  )
                })
              }
            </ul>
          </fieldset>
          {/*日期*/}
          <fieldset className="date-section aside-nav-item">
            <legend>日期</legend>
            <ul>
              {
                date.list.map((item) => {
                  return (
                    <li key={item.id}>
                      <Link to="/classifyList/:articleName">{item.label}</Link>
                    </li>
                  )
                })
              }
            </ul>
          </fieldset>
        </div>
        {/*<Route path="/home/:classifyId" component={ArticleList}></Route>*/}
      </div>
    )
  }
}
