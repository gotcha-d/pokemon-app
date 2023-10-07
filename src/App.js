import { useEffect, useState } from 'react';
import './App.css';
import PokemonThumbnails from './PokemonThumbnails';

function App() {

  const [allPokemons, setAllPokemons] = useState([]);

  // 仮でポケモンデータを配列にする
  const pokemons = [
    {
      id : 1,
      image : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png",
      type: "くさ"
    },
    {
      id : 2,
      image : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png",
      type: "くさ"
    },
    {
      id : 3,
      image : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
      type: "くさ"
    },
  ];

  // APIからデータを取得する
  // パラメータにlimitを設定し、20件取得する
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");

  const getAllPokemons = () => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log(data.results);
      setAllPokemons(data);
      createPokemonObject(data.results);
      // 次の20件セット
      setUrl(data.next)
    })
  }

  const createPokemonObject = (results) => {
    results.forEach(pokemon => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      console.log(pokemon)
      fetch(pokemonUrl)
      .then(res => res.json())
      .then(data => {
        // 画像
        console.log(data.sprites.other["official-artwork"].front_default);
        // ポケモンのタイプ
        console.log(data.types[0].type.name);
      })     
    });
  }
  useEffect(()=> {
    getAllPokemons();
  }, [])

  return (
    <div className="app-container">
        <h1>ポケモン図鑑</h1>
        <div className='pokemon-container'>
          <div className='all-container'>
            {
              pokemons.map((pokemon, index)=> (
                <PokemonThumbnails 
                  id = {pokemon.id}
                  name = {allPokemons[index]?.name}
                  image = {pokemon.image}
                  type = {pokemon.type}
                />
              ))
            }

          </div>
        </div>
    </div>
  );
}

export default App;
