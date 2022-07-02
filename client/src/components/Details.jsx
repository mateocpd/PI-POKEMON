import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getDetails} from '../actions';
import NavBar from './NavBar';


export default function Detail(){
    const dispatch = useDispatch()
    const pokeId = useParams();
    let pokemon = useSelector((state)=> state.pokemon)

    useEffect(()=>{
        dispatch(getDetails(pokeId))
    }, [dispatch])

    console.log(pokemon)
    return(
        <div>
            {
                pokemon.length > 0 ? 
                <div>
                    <p>Ocurrio un error</p>
                </div>
                :
                <div>
                    <div>
                        <h1>Pokemon: {pokemon.nombre.toUpperCase()}</h1>
                        <img src={pokemon.image} alt="Pokeimage" height="350px" width="350px"/>
                    </div>

                    <div>
                        <h3>ID: {pokemon.id}</h3>  
                        <h3>Vida: {pokemon.vida}</h3>  
                        <h3>Ataque: {pokemon.ataque}</h3>  
                        <h3>Defensa: {pokemon.defensa}</h3>  
                        <h3>Velocidad: {pokemon.velocidad}</h3>   
                        <h3>Altura: {pokemon.height}</h3>
                        <h3>Peso: {pokemon.weight}</h3>
                        <h3>Tipo/s: {pokemon.types.map(pk => (<li>{pk.name.toUpperCase()}</li>))}</h3>
                    </div>

                </div>
            }
        </div>
    )
}