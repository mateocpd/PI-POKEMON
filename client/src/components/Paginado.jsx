import React from "react";
import { Link } from "react-router-dom";

export default function Paginado ({pokemonsPage, allPokemons, paginado}) {
    const pageNumbers= [];
    for (let i=1; i<= Math.ceil(allPokemons/pokemonsPage);i++){
        pageNumbers.push(i)
    }
    return(
        <nav>
            <ul className='paginado'>
                {pageNumbers && pageNumbers.map(number =>(
                    
                        <button className='pageNumber' onClick={()=>paginado(number)}>{number}</button>
                ))}
            </ul>
        </nav>
    )
}