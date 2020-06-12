import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from './redux/user/user.selector';
import Navbar from './components/Navbar/navbar.component';

import TaskDirectory from './Pages/TaskDirectory/TaskDirectory.component';
import Homepage from './Pages/Homepage/Homepage.page';
import Register from './Pages/Register/Register.Page';
import Login from './Pages/Login/Login.page';

function App({ user }) {
    return (
        <div className='App'>
            <Navbar />

            <Switch>
                <Route
                    exact
                    path='/'
                    render={() => (
                        <Route
                            exact
                            path='/'
                            render={() =>
                                user ? <TaskDirectory /> : <Homepage />
                            }
                        />
                    )}
                />
                <Route
                    exact
                    path='/register'
                    render={() => (user ? <Redirect to='/' /> : <Register />)}
                />
                <Route
                    exact
                    path='/login'
                    render={() => (user ? <Redirect to='/' /> : <Login />)}
                />
            </Switch>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    user: selectCurrentUser
});

export default connect(mapStateToProps)(App);
