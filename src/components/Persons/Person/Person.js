import React, { Component } from "react";
import classes from "./Person.module.css";

class Person extends Component {
  // static getDervideStateFromProps(props, state) {
  //   console.log("[Person.js] getDervideStateFromProps");
  // }

  // componentWillReceiveProps(props) {
  // }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[Person.js] shoudlComponentUdpate");
    return true;
  }

  getSnapshotBeforeUpdate() {
    console.log("[Person.js] getSnapshotBeforeUpdate");
    return { message: "Snapshot!" };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("[Person.js] componentDidUpadate");
    console.log(snapshot);
  }

  render() {
    console.log("[Person.js] rendering...");
    return (
      <div className={classes.Person}>
        <p onClick={this.props.click}>
          I'm {this.props.name} and I am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
        />
      </div>
    );
  }
}

export default Person;
