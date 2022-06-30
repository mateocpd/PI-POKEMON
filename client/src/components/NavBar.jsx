import React from "react";
import { Link } from "react-router-dom";

export default function NavBar(){
    return (
        <header>
            <Link to="/">
                <img src="https://tenor.com/blC2X.gif" alt=""/>
            </Link>
            <li><Link to="/home">Pokedex</Link></li>
            <li><Link to="/pokemon">Crear </Link></li>
        </header>
    )
}