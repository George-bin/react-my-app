import React from 'react'
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { HashRouter as Router, Route, Link, Switch } from 'react-router-dom';
import './App.scss';
import Home from './views/Home/Home';
import Life from './views/Life/Life';
import ArticleList from "./components/ArticleList";
import LeftAside from './components/LeftAside';
import ArticleComponent from './components/ArticleContent';
// import TodoList from './views/TodoList'

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

const router = [
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
];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeRoute: 'Home',
      activeTitle: '首页'
    }
  }
  handleChangeRoute(item, event) {
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
                    router.map(item => {
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
              <aside>
                <LeftAside asideNav={asideNav} />
              </aside>
              <section className="main-screen-section">
                <Switch>
                  <Route path="/" exact component={Home} />
                  <Route path="/life" component={Life} />
                  <Route path="/home/articleList/:id" component={ArticleList} />
                  <Route path="/home/article/:articleId" component={ArticleComponent} />
                </Switch>
              </section>
            </div>
          </div>
        </div>
      </Router>
    )
  }
}

export default App;

