import React from 'react'
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import { Icon } from 'antd';
import './App.scss';
import routes from './router'

// import TodoList from './views/TodoList'
// 引入antd css
import 'antd/dist/antd.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoute: 'Home',
      activeTitle: '首页',
      // 显示滚动到顶部按钮
      showGoTopBtn: false
    }
  }
  handleChangeRoute(item, event) {
    this.setState({
      activeRoute: item.name,
      activeTitle: item.label
    })
  }
  // 组件挂载完成
  componentDidMount() {
    window.addEventListener('scroll', () => {
      let height = document.documentElement.scrollTop;
      if (height >= 100) {
        this.setState({
          showGoTopBtn: true
        });
      } else {
        this.setState({
          showGoTopBtn: false
        });
      }
    })
  }

  render() {
    return (
      <Router>
        <div className="app" id="app">
          <header className="header-container" id="main-header">
            <div className="header-container-package-el">
              <div className="main-title">
                <img src={[require("./assets/img/icon.jpg")]} alt="头像"/>
                <h1>码小鸟<span>前端开发爱好者</span></h1>
              </div>
              <nav className="main-nav">
                <ul className="aside-nav-list-section">
                  <li
                    className="aside-nav-list-item"
                    onClick={this.handleChangeRoute.bind(this, {name: 'Life', label: '生活'})}
                    style={{background: this.state.activeRoute === 'Life' ? '#F7F7F7' : '#d8d8d8'}}>
                    <Link to="/life">生活</Link>
                  </li>
                  <li
                    className="aside-nav-list-item"
                    onClick={this.handleChangeRoute.bind(this, {name: 'Home', label: '首页'})}
                    style={{background: this.state.activeRoute === 'Home' ? '#F7F7F7' : '#d8d8d8'}}>
                    <Link to="/">首页</Link>
                  </li>
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
                  routes.map((route, key) => {
                    if(route.isExact){
                      // return <Route key={key} exact path={route.path} component={route.component}/>
                      return <Route
                        key={key}
                        exact
                        path={route.path}
                        render={props => (
                          // pass the sub-routes down to keep nesting
                          <route.component {...props} routes={route.routes} />
                        )}></Route>
                    }else{
                      // return <Route  key={key}  path={route.path} component={route.component}/>
                      return <Route
                        key={key}
                        path={route.path}
                        render={props => (
                          // pass the sub-routes down to keep nesting
                          <route.component {...props} routes={route.routes} />
                        )}></Route>
                    }
                  })
                }
                {/*<Route path="/home/articleList/:classifyId/:type" component={ArticleList} />*/}
                {/*<Route path="/home/article/:articleId" component={ArticleComponent} />*/}
              </Switch>
            </div>
          </div>
          {/*滚动到顶部*/}
          {/*eslint-disable*/}
          {
            this.state.showGoTopBtn ?
              (<div className="go-top-btn" title="返回顶部">
                <a href="javascript:window.scrollTo(0,0)">
                  <Icon type="up-circle" />
                </a>
              </div>)
              : null
          }
        </div>
      </Router>
    )
  }
}

// export default App;
export default App;

