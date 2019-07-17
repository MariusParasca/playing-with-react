import React, { Component } from 'react';
import { BrowserRouter, Route, NavLink, Switch, Redirect } from "react-router-dom";

import Courses from './containers/Courses/Courses';
import Course from './containers/Course/Course'
import Users from './containers/Users/Users';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div className="App">
          <nav>
            <ul>
              <li>
                <NavLink to="/users" exact>
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/courses" exact>
                  Courses
                </NavLink>
              </li>
            </ul>
          </nav>
          <ol style={{ textAlign: "left" }}>
            <li>
              Add Routes to load "Users" and "Courses" on different pages
              (by entering a URL, without Links) -- Done
            </li>
            <li>
              Add a simple navigation with two links => One leading to
              "Users", one leading to "Courses" -- Done
            </li>
            <li>
              Make the courses in "Courses" clickable by adding a link and
              load the "Course" component in the place of "Courses" (without
              passing any data for now) -- Done
            </li>
            <li>
              Pass the course ID to the "Course" page and output it there --
              Done
            </li>
            <li>
              Pass the course title to the "Course" page - pass it as a
              param or score bonus points by passing it as query params (you
              need to manually parse them though!) -- Done
            </li>
            <li>
              Load the "Course" component as a nested component of "Courses"
              -- Done
            </li>
            <li>
              Add a 404 error page and render it for any unknown routes --
              Done
            </li>
            <li>
              Redirect requests to /all-courses to /courses (=> Your
              "Courses" page) -- Done
            </li>
          </ol>
        </div>
        <Switch>
          <Route path="/users" component={Users} />
          {/* <Route path={`/courses/:id`} component={Course} /> */}
          <Route path="/courses" component={Courses} />
          <Route render={() => <h1>Not found</h1>} />
          <Redirect from="/all-courses" to="/courses" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
