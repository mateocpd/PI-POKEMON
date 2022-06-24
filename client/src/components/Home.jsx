import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons } from "../actions";


export default function Home() {
  const dispatch = useDispatch();
  const allPokemons = useSelector((state) => state.pokemons);

  useEffect(() => {
    dispatch(getPokemons());
  }, []);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getPokemons());
  }

  return (
    <div >
      <Link to="/pokemon">Crear Pokemon</Link>
      <h1>Pokemones buenosxd</h1>
      <button
        onClick={(e) => {
          handleClick(e);
        }}
      >
        Volver a cargar pokemones
      </button>
      <div>
        <select className="filtroAsc" >
            <option value="">Todos</option>
            <option value="asc">A a Z</option>
            <option value="desc">Z a A</option>
        </select>
        <select>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
        </select>
      </div>
    </div>
  );
}
