import React, { Component } from "react";
import { Route, Switch } from "react-router";
// import { Spin, Alert } from 'antd';
import LeftAside from "../../components/LeftAside";
import "../../assets/style/home.scss";

let asideNav = {
  classify: {
    id: "1",
    label: "分类",
    list: []
  },
  jottings: {
    id: "2",
    label: "随笔",
    list: []
  },
  date: {
    id: "3",
    label: "日期",
    list: []
  }
};

interface IProps {
  routes: any;
}
interface IState {}

export default class Home extends Component<IProps, IState> {
  render() {
    return (
      <div className="home-main-component">
        <section className="main-screen-section">
          <Switch>
            {this.props.routes.map((route: any, key: number) => {
              return (
                <Route
                  key={key}
                  exact
                  path={route.path}
                  component={route.component}
                />
              );
            })}
          </Switch>
        </section>
        <aside className="aside-nav-section">
          <LeftAside asideNav={asideNav} />
        </aside>
      </div>
    );
  }
}
