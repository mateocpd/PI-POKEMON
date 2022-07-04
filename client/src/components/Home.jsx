import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons } from "../actions";
import Card from './Card';
import Paginado from './Paginado';
import {orderByAbc, filterByType, orderByAttack, filterApi, getTypes, reload} from '../actions'
import NavBar from './NavBar';
import SearchBar from './SearchBar';
import '../Styles/Card.css'
import '../Styles/Home.css'


export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.pokemonsTypes);

  const [current, setCurrent] = useState(1)
  const [pokemonsPage] = useState(12)
  const [order, setOrder] = useState("")
  const lastPoke = current * pokemonsPage
  const firstPoke = lastPoke - pokemonsPage
  const pokemons = allPokemons.slice(firstPoke, lastPoke)

  const paginado = (pageNumber) => {
    setCurrent(pageNumber)
}

  useEffect(() => {
    dispatch(getPokemons());
  }, [dispatch]);

  useEffect ( () => {
    dispatch(getTypes())
}, [dispatch] )

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  function handleReload(e) {
    e.preventDefault();
    dispatch(reload(e))
  }

  function handleOrderAsc(e) {
    e.preventDefault();
    dispatch(orderByAbc(e.target.value))
    setCurrent(1);
    setOrder(`Ordenado ${e.target.value}`);
  }

  function handleFilterType(e){
    e.preventDefault();
    dispatch(filterByType(e.target.value))
  }

  function handleOrderByAttack(e){
    e.preventDefault();
    dispatch(orderByAttack(e.target.value))
    setCurrent(1)
    setOrder(`Ordenado ${e.target.value}`)
  }

  function handleFilterApi(e){
    dispatch(filterApi(e.target.value))
}


  return (
    <div className= 'mainContainer'>
      <div className='sb'>
        <NavBar/>
      </div>
      <div className="left">
      <Paginado className='paginado' pokemonsPage= {pokemonsPage} allPokemons= {allPokemons.length} paginado={paginado}/>
        <SearchBar className='searchBar'/>
        <select className='select' onChange={e => handleOrderAsc(e)}>
            <option value="all">Orden Alfabetico</option>
            <option value="asc">A a Z</option>
            <option value="desc">Z a A</option>
        </select>
        <select className='select' onChange={e=> handleFilterType(e)}>
            <option value="all">Filtro por tipo</option>
            {
              allTypes?.map((fil) => {
                return <option value={fil.name} key={fil.id}>{fil}</option>
              })
            }
        </select>
            
        <select className='select' onChange={e => handleOrderByAttack(e)}>
            <option value = "all">Ordenar por ataque</option>
            <option value= "poderoso">Poderoso</option>
            <option value= "debil">Debil</option>
        </select>
        <select className='select' onChange={e =>handleFilterApi(e)}>
            <option value = "pokes">Existentes o Creados</option>
            <option value = "api">Existentes</option>
            <option value = "db">Creados</option>

        </select>
        <h4>
        <button className='button'
        onClick={(e) => {handleClick(e);}}>Volver a cargar pokemones</button>
        </h4>
      </div>

      <div className='cardscards'>
        {console.log(pokemons)}
        {   
          pokemons?.map( p => {
              return(
              <Card name={p.name} img={p.image} types={p.types} key={p.id} id = {p.id} />
          )})
        }
      </div>
    </div>
  );
}
