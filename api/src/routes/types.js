const { Router } = require("express");
const router = Router();
const axios = require("axios");
const { Tipo } = require("../db.js");


router.get("/", async function (req, res, next) {
  try {
    let tiposApi = await axios.get("https://pokeapi.co/api/v2/type");
    tiposApi = tiposApi.data.results.filter((e) => e.name !== "unknown");
    tiposApi = tiposApi.map((e) => e.name).sort((a, b) => (a.toLowerCase() > b.toLowerCase() ? 1 : -1));
    return res.json(tiposApi);
  } catch (e) {
    next(e);
  }
});

module.exports = router;