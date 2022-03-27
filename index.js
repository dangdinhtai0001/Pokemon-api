import express from "express";
import cors from "cors";
import { PokedexInstance, getPokemonList, getPokemonByName } from "./Pokedex.js";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/ping", (request, response) => {
  response.send("PONG");
});

app.post("/getPokemonsList", async (request, response) => {
  console.log("============== POKEMON LIST ==============");
  let start = new Date().getTime();

  const page = request.body.page || 1;
  const pageSize = request.body.pageSize || 100;
  let res = await getPokemonList(pageSize, page);

  let execution_time = new Date().getTime() - start;
  console.log(`${res.data.length} pokemons found in ${execution_time}ms`);

  response.set("execution_time", execution_time);
  response.send(res);
});

app.post("/getPokemonDetails", async (request, response) => {
  console.log("============== POKEMON DETAILS ==============");
  let start = new Date().getTime();

  const name = request.body.name;
  let res = await getPokemonByName(name);

  let execution_time = new Date().getTime() - start;
  response.set("execution_time", execution_time);

  response.send(res);
});

app.get("/getEndpointsList", async (request, response) => {
  console.log("============== getEndpointsList ==============");

  let res = await PokedexInstance.getEndpointsList();

  response.send(res);
});

// Start the server
const server = app.listen(8080, (error) => {
  if (error) return console.log(`Error: ${error}`);

  console.log(`Server listening on port ${server.address().port}`);
});
