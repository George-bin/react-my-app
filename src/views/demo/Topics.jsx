import React from "react";
import { Route, Link } from "react-router-dom";

class Topic extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  componentDidMount() {
    console.log(this.props.match)
    // debugger
  }

  render() {
    return (
      <h3>Requested Param: {this.props.match.params.id}</h3>
    )
  }
}

export default class Topics extends React.Component {
  render() {
    return (
      <div className="topics-main-component">
        <div className="">
          <h1>Topics</h1>
          <ul>
            <li>
              <Link to={`${this.props.match.url}/components`}>Component</Link>
            </li>
            <li>
              <Link to={`${this.props.match.url}/props-v-state`}>Props v. State</Link>
            </li>
          </ul>
        </div>
        <div>
          <Route path={`${this.props.match.path}/:id`} component={Topic}></Route>
          <Route exact path={`${this.props.match.path}`} render={() => <h3>Please select a topic.</h3>}></Route>
        </div>
      </div>
    )
  }
}
