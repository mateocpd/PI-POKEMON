import React from "react";
import { Link } from "react-router-dom";

export default function Paginado ({pokemonsPage, allPokemons, paginado}) {
    const pageNumbers= [];
    for (let i=0; i<= Math.ceil(allPokemons/pokemonsPage);i++){
        pageNumbers.push(i)
    }
    return(
        <nav>
            <ul>
                {pageNumbers && pageNumbers.map(number =>(
                    <li key={number}>
                        <button onClick={()=>paginado(number)}>{number}</button>
                    </li>   
                ))}
            </ul>
        </nav>
    )
}