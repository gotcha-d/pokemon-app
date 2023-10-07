import { useEffect, useState } from 'react';
import './App.css';
import PokemonThumbnails from './PokemonThumbnails';
import pokemonJson from './pokemon.json';
import pokemonTypeJson from './pokemonType.json';

function App() {

  const [isLoading, setIsLoading] = useState(false);
  const [allPokemons, setAllPokemons] = useState([]);

  // APIからデータを取得する
  // パラメータにlimitを設定し、20件取得する
  const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?limit=20");

  const getAllPokemons = () => {
    setIsLoading(true);
    fetch(url)
    .then(res => res.json())
    .then(data => {
      // 次の20件セット
      createPokemonObject(data.results);
      setUrl(data.next)
    })
    .finally(()=>{
      setIsLoading(false);
    })
  }

  const createPokemonObject = (results) => {
    results.forEach(pokemon => {
      const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      fetch(pokemonUrl)
        .then(res => res.json())
        .then(async data => {
          // 画像
          const _image = data.sprites.other["official-artwork"].front_default;
          const _iconImage = data.sprites.other.dream_world.front_default
          // ポケモンのタイプ
          const _type = data.types[0].type.name;
          // 日本語へ変換
          const japanese = await translateToJapanese(data.name, _type);
          const newItem = {
            id: data.id,
            name: data.name,
            image: _image,
            iconImage: _iconImage,
            type : _type,
            jpName : japanese.name,
            jpType : japanese.type
          };
          // 既存のデータを展開し、新しいデータを追加する
          setAllPokemons(currentList => [...currentList, newItem].sort((a, b) => a.id - b.id));
        });
    });
  }

  const translateToJapanese = async (name, type) => {
    const jpName = await pokemonJson.find(
      pokemon => pokemon.en.toLocaleLowerCase() === name
    ).ja;
    const jpType = await pokemonTypeJson[type]
    return { name: jpName, type: jpType }
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
              allPokemons.map((pokemon, index)=> (
                <PokemonThumbnails 
                  id = {pokemon.id}
                  name = {pokemon.jpName}
                  image = {pokemon.image}
                  iconImage = {pokemon.iconImage}
                  type = {pokemon.type}
                  jptype = {pokemon.jpType}
                  key = {index}
                />
              ))
            }
          </div>
        </div>
        {
          isLoading ? (
            <div className='load-more'>now loading ...</div>
          ) : (
            <button className='load-more' onClick={getAllPokemons}>
              もっと見る
            </button>
          )
        }
    </div>
  );
}

export default App;
