import React from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch
} from 'react-router-dom'
import NavBar from '../components/sideBar/NavBar'
import AddMovie from '../containers/addmovie/AddMovie'
import Home from '../containers/home/Home'

const NavRoutes = () => {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path='/home' component={Home} />
                <Route path='/addmovies' component={AddMovie} />
            </Switch>
        </>
    )
}

export default NavRoutes
