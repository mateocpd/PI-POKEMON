const { Router } = require("express");
const router = Router();
const axios = require("axios");

router.get("/", async function (req, res) {
  try {
    let tiposApi = await axios.get("https://pokeapi.co/api/v2/type");
    return res.json(tiposApi)
  } catch (e) {
    console.log(e);
  }
});
