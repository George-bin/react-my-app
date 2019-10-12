import React from "react";
// import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { HashRouter as Router, Route, Link, Switch } from "react-router-dom";
import { BackTop } from "antd";
import MainHeader from "./components/MainHeader";
import "./App.scss";
import routes from "./router";

// import TodoList from './views/TodoList'
// 引入antd css
import "antd/dist/antd.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // 显示滚动到顶部按钮
      showGoTopBtn: false
    };
  }
  // 组件挂载完成
  componentDidMount() {
    window.addEventListener("scroll", () => {
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
    });
  }

  render() {
    // console.log(process.env.NODE_ENV)
    return (
      <Router>
        <div className="app" id="app">
          {/* 头部 */}
          <MainHeader />
          {/* 内容区域 */}
          <div className="content-container">
            <div className="content-container-package-el">
              <Switch>
                {routes.map((route, key) => {
                  if (route.isExact) {
                    return (
                      <Route
                        key={key}
                        exact
                        path={route.path}
                        render={props => (
                          // pass the sub-routes down to keep nesting
                          <route.component {...props} routes={route.routes} />
                        )}
                      ></Route>
                    );
                  } else {
                    return (
                      <Route
                        key={key}
                        path={route.path}
                        render={props => (
                          // pass the sub-routes down to keep nesting
                          <route.component {...props} routes={route.routes} />
                        )}
                      ></Route>
                    );
                  }
                })}
              </Switch>
            </div>
          </div>
          {/*滚动到顶部*/}
          <BackTop />
        </div>
      </Router>
    );
  }
}

// export default App;
export default App;
