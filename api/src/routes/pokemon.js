const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Pokemon, Tipo } = require("../db");
const { Op } = require("sequelize");

router.get("/", async function (req, res, next) {
  const { name } = req.query;

  try {
    if (!name) {
      let apiPoke = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=40&offset=0"
      );
      let urlPoke = apiPoke.data.results?.map((e) => axios.get(e.url));

      let pokeApiUrl = await axios.all(urlPoke);

      let pokemonApi = pokeApiUrl.map((e) => {
        let obj = {};
        obj = {
          id: e.data.id,
          name: e.data.name.charAt(0).toUpperCase() + e.data.name.slice(1),
          attack: e.data.stats[1].base_stat,
          image: e.data.sprites.front_default,
          createInDb: false,
          types:
            e.data.types.length > 0
              ? e.data.types.map((obj) => obj.type.name)
              : [],
        };
        return obj;
      });
      let pokemonDb = await Pokemon.findAll({
        include: { model: Tipo, attributes: ["name"] },
      });

      let pokemonBasDat = pokemonDb.map((e) => {
        let obj = {
          id: e.id,
          name: e.data.name.charAt(0).toUpperCase() + e.data.name.slice(1),
          attack: e.attack,
          image: e.image,
          createInDb: e.createInDb,
          types: e.Tipos?.map((obj) => obj.name),
        };
        return obj;
      });
      return res.json([...pokemonApi, ...pokemonBasDat]);
    } else {

      let pokeDb = await Pokemon.findall({
        where: { name: { [Op.like]: `${name}` } },
        include: { model: Tipo, attributes: ["name"] },
      });
      let pokemonDb = pokeDb.map((e) => {
        let obj = {
          id: e.id,
          name: e.name.charAt(0).toUpperCase() + e.name.slice(1).toLowerCase(), 
          image: e.image,
          createInDb: e.createInDb,
          types: e.tipos.map((obj) => obj.name),
        };
        return obj;
      })
      if (pokemonDb.length > 0) {
        return res.json(pokemonDb);
      }

      let resApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`)
      let pokeEncontrado = {
        id: resApi.data.id,
        name : resApi.data.namecharAt(0).toUpperCase() + resApi.data.name.slice(1),
        image: resApi.data.sprites.front_default,
        createInDb : false,
        types: resApi.data.tipos.length > 0 ? resApi.data.tipos.map((obj) => obj.type.name):[]
      }
      if(pokeEncontrado){
        return res.json(pokeEncontrado)
      } else {
        return next({message: 'Pokemon no encontrado', status: 400})
      }
    }
  } catch (e) {
    res.status(500).json({message: 'Error interno del servidor'});
    console.log(e)
  }
});

module.exports = router;
