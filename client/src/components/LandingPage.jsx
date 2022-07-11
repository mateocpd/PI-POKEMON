import React from 'react';
import {Link} from 'react-router-dom';
import '../Styles/LandingPage.css';


export default function LandingPage(){
    return (
        <div className="background">
            <div className="container">
            <h1>Página de Pokemones</h1>
            </div>
            <Link to='/home'> 
                <button>Ingresar</button>
            </Link>
        </div>
    )
}