import React from 'react';
import {Link} from 'react-router-dom';



export default function Card({id,key, img, name, types}){
    return(
        <div>
            <h4> Pokemon: {name}</h4>
            <Link to={"/pokemon/" + id}>
                <img src={img} alt="PokeImagen no encontrada" width="175px" height="160px"/>
            </Link>
            <h5>Tipo/s: {types?.map(type => "-" + type + " ")}</h5>
        </div>
    )
}  