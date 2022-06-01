import Pokedex from "pokedex-promise-v2";
const options = {
  protocol: "https",
  versionPath: "/api/v2/",
  cacheLimit: 100 * 1000, // 100s
  timeout: 5 * 1000, // 5s
};
const PokedexInstance = new Pokedex(options);

const getPokemonList = async (limit, offset) => {
  const pokemonList = await PokedexInstance.getPokemonsList({
    limit,
    offset,
  });

  let count = pokemonList.count;
  let list = pokemonList.results;

  let res = await Promise.all(
    list.map(async (pokemon) => {
      let pokemonData = await PokedexInstance.getPokemonByName(pokemon.name);

      return {
        name: pokemonData.name,
        base_experience: pokemonData.base_experience,
        height: pokemonData.height,
        weight: pokemonData.weight,
        id: pokemonData.id,
        is_default: pokemonData.is_default,
        order: pokemonData.order,
        gender: "female",
      };
    })
  );

  return {
    total: count,
    data: res,
    // data: pokemonList,
    page: offset,
    pageSize: limit,
  };
};

const getPokemonByName = async (name) => {
  const pokemon = await PokedexInstance.getPokemonByName(name);
  return pokemon;
};

const getGendersList = async () => {
  const gendersList = await PokedexInstance.getGendersList();
  return gendersList;
};

export { PokedexInstance, getPokemonList, getPokemonByName, getGendersList };
