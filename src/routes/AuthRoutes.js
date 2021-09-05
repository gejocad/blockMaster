import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import Register from '../containers/register/Register'
import Login from '../containers/login/Login'

const AuthRoutes = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/auth/login' component={Login} />
                <Route exact path='/auth/register' component={Register} />
            </Switch>
        </Router>
    )
}

export default AuthRoutes
