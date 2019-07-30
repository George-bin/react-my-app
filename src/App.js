import React from 'react'
// import TodoList from './views/TodoList'
// import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.scss'
import Home from './views/Home/Home'
import Life from './views/Life/Life'
// import Inbox from './views/demo/Inbox'
// import Topics from './views/demo/Topics'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoute: 'Home',
      activeTitle: '首页',
      routeList: [
        {
          path: '/life',
          name: 'Life',
          label: '生活',
          component: Life,
          isExact: false
        }, {
          path: '/',
          name: 'Home',
          label: '首页',
          component: Home,
          isExact: true
        }
      ]
    }
  }
  handleChangeRoute(item, event) {
    // debugger
    this.setState({
      activeRoute: item.name,
      activeTitle: item.label
    })
  }
  render() {
    return (
      <Router>
        <div className='app'>
          {/* 把 <a> 变成 <Link> */}
          <header className="header-container">
            <div className="header-container-package-el">
              <div className="main-title">
                <img src={[require("./assets/img/icon.jpg")]} alt="头像"/>
                <h1>码小鸟<span>前端开发爱好者</span></h1>
              </div>
              <nav className="main-nav">
                <ul className="aside-nav-list-section">
                  {
                    this.state.routeList.map(item => {
                      return (
                        <li
                          className="aside-nav-list-item"
                          onClick={this.handleChangeRoute.bind(this, item)}
                          key={item.name}
                          style={{background: item.name === this.state.activeRoute ? '#F7F7F7' : '#D5D5D5'}}>
                          <Link to={item.path}>{item.label}</Link>
                        </li>
                      )
                    })
                  }
                </ul>
              </nav>
            </div>
          </header>
          <section className="active-main-title">
            <div className="active-main-title-package-el">
              <h2>{this.state.activeTitle}</h2>
            </div>
          </section>
          <div className="content-container">
            <div className="content-container-package-el">
              <Switch>
                {
                  this.state.routeList.map(item => {
                    return (
                      <Route path={item.path} exact={item.isExact} component={item.component} key={item.name}></Route>
                    )
                  })
                }
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App

// function AppRouter() {
//   return (
//     <TodoList />
//   );
// }
//
// export default AppRouter;

