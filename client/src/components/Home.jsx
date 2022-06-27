import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons } from "../actions";
import Paginado from './Paginado';
import {orderByAbc, filterByType} from '../actions'


export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);
  const allTypes = useSelector((state) => state.pokemonsTypes);

  const [current, setCurrent] = useState(1)
  const [pokemonsPage, setPokemonsPage] = useState(12)
  const [order, setOrder] = useState("")
  const lastPoke = current * pokemonsPage
  const firstPoke = lastPoke - pokemonsPage
  const pokemons = allPokemons.slice(firstPoke, lastPoke)

  const paginado = (pageNumber) => {
    setCurrent(pageNumber)
}

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
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

  return (
    <div >
      <div>
        <NavBar/>
      </div>
      <Link to="/pokemon">Crear Pokemon</Link>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar pokemones
      </button>
      <Paginado pokemonsPage= {pokemonsPage} allPokemons= {allPokemons.length} paginado={paginado}/>
      <div>
        <select onChange={e => handleOrderAsc(e)}>
            <option value="all">Orden Alfabetico</option>
            <option value="asc">A a Z</option>
            <option value="desc">Z a A</option>
        </select>
        <select onChange={e=> handleFilterType(e)}>
            <option value="all">Filtro por tipo</option>
            {
              allTypes?.map(fil => {
                return <option value={fil.name} key={fil.id}>{fil.name}</option>
              })
            }
        </select>
      </div>
    </div>
  );
}
