import React from "react";
import { Link } from "react-router-dom";
import '../Styles/NavBar.css'

export default function NavBar(){
    return (
        <header>
            <Link to="/">
                <img src="../logo/pokemon-pokeball.gif" alt=""/>
            </Link>
            <Link className="title" to="/home">Pokedex</Link>
            <br/>
            <Link className="text2"to="/pokemon">Crear </Link>
        </header>
    )
}