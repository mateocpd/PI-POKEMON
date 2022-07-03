import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {getDetails,resetDetails} from '../actions';
import NavBar from './NavBar';
import '../Styles/Details.css';

export default function Detail(){
    const dispatch = useDispatch()
    const {id} = useParams();
    let pokemon = useSelector((state)=> state.pokemon)
    console.log(pokemon)
    
    useEffect(()=>{
        dispatch(getDetails(id))
        dispatch(resetDetails())
    }, [dispatch])


    return(
        <div className='backgroundDetails'>
            {
                pokemon.length === 0 ? 
                <div>
                    <p>Cargando... </p>
                </div>
                :
                <div className='pokeDetails'>
                    <div className ='centerDetails'>
                        <h1>Pokemon: {pokemon.name.toUpperCase()}</h1>
                        <img className= 'pkimg' src={pokemon.image} alt="Pokeimage" height="350px" width="350px"/>
                    </div>

                    
                    <div className="leftDetails">
                        <h3>ID: {pokemon.id}</h3>  
                        <h3>Vida: {pokemon.life}</h3>  
                        <h3>Ataque: {pokemon.attack}</h3>  
                        <h3>Defensa: {pokemon.defense}</h3>  
                        <h3>Velocidad: {pokemon.speed}</h3>  
                    </div>
                    <div className="rightDetails">
                        <h3>Altura: {pokemon.height}</h3>
                        <h3>Peso: {pokemon.weight}</h3>
                        <h3>Tipo/s: {pokemon.types.map(pk => (<li>{pk.name.toUpperCase()}</li>))}</h3>
                    </div>
                

                </div>
            }
        </div>
    )
}