import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Navbar from './component/layout/Navbar'
import Landing from './component/layout/Landing'
import Login from './component/layout/auth/Login'
import Register from './component/layout/auth/Register'
import { Provider } from 'react-redux'
import store from './store'
import Alert from './component/layout/Alert'
import setAuthToken from './utils/setAuthToken'
import { loadUser } from './actions/auth.actions'
import Dashboard from './component/dashboard/Dashboard'
import PrivateRoute from './component/routing/PrivateRoute'
import CreateProfile from './component/profile-forms/create-profile'
import EditProfile from './component/profile-forms/EditProfile'
import AddExperience from './component/expereince-forms/AddExperience'
import AddEducation from './component/education-forms/AddEducation'

if(localStorage.token) {
  setAuthToken(localStorage.token);
} //Applying global header => 'x-auth-token' for any requests.

function App() {
  useEffect(() => {
    store.dispatch(loadUser()); //Direct method of calling dispatch
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
