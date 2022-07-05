import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postPoke, getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
import '../Styles/PokemonCreate.css'


export default function PokeCreate() {
  const dispatch = useDispatch();
  const navigate = useHistory();
  const allTypes = useSelector((state) => state.pokemonsTypes);
  const [errors, setErrors] = useState({});

  const [input, setInput] = useState({
    name: "",
    hp: 50,
    attack: 50,
    defense: 50,
    speed: 50,
    height: 50,
    weight: 50,
    types: [],
    image: "",
  });

  function validation(input) {
    let errors = {};
    if (!input.name || typeof input.name !== "string") {
      errors.name = "Que nombre le pondrás a tu pokemon?";
    } else if (
      !input.hp ||
      input.hp < 0 ||
      input.hp > 100 ||
      typeof input.hp !== "number"
    ) {
      errors.hp = "Por favor inserte un numero de vida valido entre 0 y 100";
    } else if (
      !input.attack ||
      input.attack < 0 ||
      input.attack > 100 ||
      typeof input.attack !== "number"
    ) {
      errors.attack = "Por favor inserte un ataque valido entre 0 y 100";
    } else if (
      !input.defense ||
      input.defense < 0 ||
      input.defense > 100 ||
      typeof input.defense !== "number"
    ) {
      errors.defense = "Por favor inserte una defensa valida entre 0 y 100";
    } else if (
      !input.speed ||
      input.speed < 0 ||
      input.speed > 100 ||
      typeof input.speed !== "number"
    ) {
      errors.speed = "Por favor inserte una velocidad valida entre 0 y 100";
    } else if (
      !input.height ||
      input.height < 0 ||
      input.height > 100 ||
      typeof input.height !== "number"
    ) {
      errors.height = "Por favor inserte una altura valida entre 0 y 100";
    } else if (
      !input.weight ||
      input.weight < 0 ||
      input.weight > 100 ||
      typeof input.weight !== "number"
    ) {
      errors.weight = "Por favor inserte un peso valid entre 0 y 100";
    } else if (!input.types || input.types.lenght > 3) {
      errors.types = "Seleccionar entre 1 y 3 tipos";
    } else if (!input.image) {
      errors.image = "Por favor inserte un URL valido";
    }
    return errors;
  }

  useEffect(() => {
    dispatch(getTypes());
  }, [dispatch]);

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validation({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
    console.log(input);
  }

  function handleSelect(e) {
    setInput({
      ...input,
      types: [...input.types, e.target.value],
    });
    setErrors(
      validation({
        ...input,
        [{...input.types}]:e.target.value
      })
    )
  }

  function handleSubmit(e) {
    console.log(input);
    if (!input.name) {
      e.preventDefault();
      return alert("No es posible crear un pokemon sin un nombre");
    } else if (!input.types.length) {
      e.preventDefault();
      return alert("aPor favor seleccione al menos 1 tipo");
    } else if (!input.image) {
      e.preventDefault();
      return alert("Por favor inserte un URL valido");
    }
    dispatch(postPoke(input));
    alert("Pokemon creado con exito!");
    setInput({
      name: "",
      hp: 0,
      attack: 0,
      defense: 0,
      speed: 0,
      height: 0,
      weight: 0,
      types: [],
      image: "",
    });
    navigate.push("/home");
  }

  let handleDelete = (type) => {
    setInput({
      ...input,
      types: input.types.filter((pk) => pk !== type),
    });
  };

  return (
    <div className='divForm'>
      <div >
        <h2 className='createTitle'>Creacion de Pokemons</h2>
      </div>
      <div>
        <button className='button'>
        <Link className='text'to="/home">Pokedex</Link>
        </button>
      </div>
      <form className='form' onSubmit={(e) => handleSubmit(e)}>
        <div className='leftCreate'>
          <div className='range'>
            <label className='textCreate'>Vida:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="1"
              value={input.hp}
              name="hp"
              onChange={(e) => handleChange(e)}
            />
            <h5 className='textCreate'>{input.hp}</h5>
            {errors.name && <span className='errors'>{errors.hp}</span>}
          </div>
          <br />
          <div className='range'>
            <label className='textCreate'>Ataque:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="2"
              value={input.attack}
              name="attack"
              onChange={(e) => handleChange(e)}
            />
            <h5 className='textCreate'>{input.attack}</h5>
            {<span>{errors.name && errors.attack}</span>}
          </div>
          <br />
          <div className='range'>
            <label className='textCreate'>Defensa:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="3"
              value={input.defense}
              name="defense"
              onChange={(e) => handleChange(e)}
            />
            <h5 className='textCreate'>{input.defense}</h5>
            {<label>{errors.name && errors.defense}</label>}
          </div>
        </div>
        <div className='center'>
          <div className='range'>
            <label className='textCreate'>Velocidad:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="4"
              value={input.speed}
              name="speed"
              onChange={(e) => handleChange(e)}
            />
            <h5 className='textCreate'>{input.speed}</h5>
            {<span>{errors.name && errors.speed}</span>}
          </div>
          <br />
          <div className='range'>
            <label className='textCreate'>Altura:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="5"
              value={input.height}
              name="height"
              onChange={(e) => handleChange(e)}
            />
            <h5 className='textCreate'>{input.height}</h5>
            {<span>{errors.name && errors.height}</span>}
          </div>
          <br />
          <div className='range'>
            <label className='textCreate'>Peso:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="6"
              value={input.weight}
              name="weight"
              onChange={(e) => handleChange(e)}
            />
            <h5 className='textCreate'>{input.weight}</h5>
            {<span>{errors.name && errors.weight}</span>}
          </div>
        </div>

        <div className='rightCreate'>
          <div>
            <label className='textCreate'>Nombre: </label>
            <input
              type="text"
              id="7"
              value={input.name}
              name="name"
              placeholder="PokeName"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p className='errors'>{errors.name}</p>}
          </div>

          <div>
            <label className='textCreate'>Seleccionar Tipos: </label>
            <select id="8" onChange={(e) => handleSelect(e)}>
              <option value="" hidden name="types">
                Seleccione Tipo
              </option>
              {allTypes?.map((pk) => {
                return (
                  <option value={pk.name} key={pk.id}>
                    {pk}
                  </option>
                );
              })}
            </select>
            
              
                {input.types.map((pt) => (
                  <div>
                    <h4 >{pt}</h4>
                    <h5 className='textCreate'>
                      {allTypes?.find((p) => p.name === pt)?.name}
                      <input type='button' className='deleteType'  onClick={() => handleDelete(pt)}value='X'/>
                    </h5>
                  </div>
                ))}
              
            
            {errors.name && <span>{errors.types}</span>}
          </div>
          <div>
            <label className='textCreate'>Imagen: </label>
            <input
              type="url"
              id="9"
              value={input.image}
              name="image"
              placeholder="Url imagen..."
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <span>{errors.image}</span>}
          </div>
        <h3>
          
          <button id="submit" className='titleCreate' type="submit" onClick={(e) => handleSubmit(e)} > Crear</button>
        </h3>
        </div>
      </form>
    </div>
  );
}
