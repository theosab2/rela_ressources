import React from 'react'
import { NavLink } from 'react-router-dom'
import "../styles/header.css"

const Navigation = () => {
    return (
        <div >
            <NavLink exact to="/Home" activeClassName="nav-active" className="NavigationBody">
                Accueil
            </NavLink>
            <NavLink exact to="/Login" activeClassName="nav-active" className="NavigationBody">
                Login
            </NavLink>
            <NavLink exact to ='../Connexion' activeClassName="nav-active"  className="NavigationBody">
                Connexion
            </NavLink>
            <NavLink exact to ='../Inscription' activeClassName="nav-active"  className="NavigationBody">
                Inscription
            </NavLink>
        </div>
    )
}

export default Navigation
