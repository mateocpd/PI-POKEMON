import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { postPoke, getTypes } from "../actions";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";

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
    img: "",
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
    } else if (!input.types) {
      errors.types = "Seleccionar entre 1 y 3 tipos";
    } else if (!input.img) {
      errors.img = "Por favor inserte un URL valido";
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
  }

  function handleSubmit(e) {
    console.log(input);
    if (!input.name) {
      e.preventDefault();
      return alert("No es posible crear un pokemon sin un nombre");
    } else if (!input.types.length) {
      e.preventDefault();
      return alert("Por favor seleccione al menos 1 tipo");
    } else if (!input.img) {
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
      img: "",
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
    <div>
      <div>
        <h2>Creacion de Pokemons</h2>
      </div>
      <div>
        <Link to="/home">Pokedex</Link>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div>
            <label>Vida:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="1"
              value={input.hp}
              name="hp"
              onChange={(e) => handleChange(e)}
            />
            <h5>{input.hp}</h5>
            {errors.name && <span>{errors.hp}</span>}
          </div>
          <br />
          <div>
            <label>Ataque:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="2"
              value={input.attack}
              name="attack"
              onChange={(e) => handleChange(e)}
            />
            <h5>{input.attack}</h5>
            {<span>{errors.name && errors.attack}</span>}
          </div>
          <br />
          <div>
            <label>Defensa:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="3"
              value={input.defense}
              name="defense"
              onChange={(e) => handleChange(e)}
            />
            <h5>{input.defense}</h5>
            {<label>{errors.name && errors.defense}</label>}
          </div>
        </div>
        <div>
          <div>
            <label>Velocidad:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="4"
              value={input.speed}
              name="speed"
              onChange={(e) => handleChange(e)}
            />
            <h5>{input.speed}</h5>
            {<span>{errors.speed && errors.speed}</span>}
          </div>
          <br />
          <div>
            <label>Altura:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="5"
              value={input.height}
              name="height"
              onChange={(e) => handleChange(e)}
            />
            <h5>{input.height}</h5>
            {<span>{errors.height && errors.height}</span>}
          </div>
          <br />
          <div>
            <label>Peso:</label>
            <input
              type="range"
              min="0"
              max="100"
              id="6"
              value={input.weight}
              name="weight"
              onChange={(e) => handleChange(e)}
            />
            <h5>{input.weight}</h5>
            {<span>{errors.weight && errors.weight}</span>}
          </div>
        </div>

        <div>
          <div>
            <label>Nombre:</label>
            <input
              type="text"
              id="7"
              value={input.name}
              name="name"
              placeholder="PokeName"
              onChange={(e) => handleChange(e)}
            />
            {errors.name && <p>{errors.name}</p>}
          </div>

          <div>
            <label>Seleccionar Tipos:</label>
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
            <ul>
              <li>
                {input.types.map((pt) => (
                  <div>
                    <h4>{pt}</h4>
                    <h5>
                      {allTypes?.find((p) => p.name === pt)?.name}
                      <button onClick={() => handleDelete(pt)}>X</button>
                    </h5>
                  </div>
                ))}
              </li>
            </ul>
            {errors.types && <span>{errors.types}</span>}
          </div>
          <div>
            <label>Imagen:</label>
            <input
              type="url"
              id="9"
              value={input.img}
              name="img"
              placeholder="Url imagen..."
              onChange={(e) => handleChange(e)}
            />
            {errors.img && <span>{errors.img}</span>}
          </div>
        <h3>
          
          <button id="submit" type="submit" onClick={(e) => handleSubmit(e)} > Crear</button>
        </h3>
        </div>
      </form>
    </div>
  );
}
