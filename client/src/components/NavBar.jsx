import React from "react";
import { Link } from "react-router-dom";
import '../Styles/NavBar.css'

export default function NavBar(){
    return (
        <header>
            <Link to="/">
                <img className='logo' src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Pokebola-pokeball-png-0.png/481px-Pokebola-pokeball-png-0.png" alt="" width="40px" height="40px"/>
            </Link>
            <br/>
            <div className='pokedex'>
            <button className='button'>
            <Link className="title" to="/home">Pokedex</Link>
            </button>
            </div>
            <button className='button'>
            <Link className="text2" to="/pokemon">Crear </Link>
            </button>
        </header>
    )
}