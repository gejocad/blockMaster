import React from 'react'
import NavBar from '../../components/sideBar/NavBar'

const ContenedorNav = ({ children }) => {
    return (
        <div style={{color: 'white'}}>
            <NavBar />
            { children }
        </div>
    )
}

export default ContenedorNav
