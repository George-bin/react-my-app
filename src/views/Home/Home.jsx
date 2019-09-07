import React, { Component } from 'react';
import LeftAside from '../../components/LeftAside';
import './css/home.scss';
import { Route, Switch } from "react-router";

let asideNav = {
  classify: {
    id: '1',
    label: '分类',
    list: []
  },
  jottings: {
    id: '2',
    label: '随笔',
    list: []
  },
  date: {
    id: '3',
    label: '日期',
    list: []
  }
};

export default class Home extends Component {
  render() {
    return (
      <div className="home-main-component">
        <aside >
          <LeftAside asideNav={asideNav} />
        </aside>
        <section className="main-screen-section">
          <Switch>
            {
              this.props.routes.map((route,key)=>{
                return <Route key={key} exact path={route.path} component={route.component} />
              })
            }
            {/*{*/}
              {/*routes.home.map((route, key) => {*/}
                {/*if(route.isExact){*/}
                  {/*return <Route key={key} exact path={route.path} component={route.component}/>*/}
                {/*}else{*/}
                  {/*return <Route  key={key}  path={route.path} component={route.component}/>*/}
                {/*}*/}
              {/*})*/}
            {/*}*/}
            {/*<Route path="/home/articleList/:classifyId/:type" component={ArticleList} />*/}
            {/*<Route path="/home/article/:articleId" component={ArticleComponent} />*/}
          </Switch>
        </section>
      </div>
    )
  }
}
