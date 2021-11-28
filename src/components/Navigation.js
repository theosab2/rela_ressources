import React from 'react'
import { NavLink } from 'react-router-dom'
import "../styles/header.css"

const Navigation = () => {
    return (
        <div className="NavigationBody">
            <NavLink exact to="/Home" activeClassName="nav-active" className="NavLink">
                Gouv-Info
            </NavLink>
            <NavLink exact to="/Home" activeClassName="nav-active" className="NavLink">
                Accueil
            </NavLink>
            <NavLink exact to="/Login" activeClassName="nav-active" className="NavLink">
                Inscription / Connexion
            </NavLink>
            <NavLink exact to="/Admin" activeClassName="nav-active" className="NavLink">
                Administration
            </NavLink>
            <NavLink exact to="/Profil" activeClassName="nav-active" className="NavLink">
               Profil
            </NavLink>
        </div>
    )
}

export default Navigation
