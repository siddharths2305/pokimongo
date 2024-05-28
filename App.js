import React, { useState, useEffect } from 'react';
// import './App.css';

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20');
      const data = await response.json();
      setPokemonData(data.results);
    };
    fetchPokemon();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredPokemon = pokemonData.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokémon</h1>
      <input
        type="text"
        placeholder="Search Pokémon"
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="pokemon-container">
        {filteredPokemon.map((pokemon, index) => (
          <div key={index} className="pokemon-card">
            <img
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png`}
              alt={pokemon.name}
            />
            <p>{pokemon.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
