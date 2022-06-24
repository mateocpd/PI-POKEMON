import React from 'react';
import {Link} from 'react-router-dom';
import '../Styles/LandingPage.css';

export default function LandingPage(){
    return (
        <div className="background">
            <h1 font color="white">Página de Kokemones</h1>
            <Link to='/home'> 
                <button>Ingresar</button>
            </Link>
        </div>
    )
}