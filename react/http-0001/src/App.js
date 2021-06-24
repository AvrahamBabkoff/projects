import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);

  const fetchMoviesHandler = async () => {

    const response = await fetch('https://swapi.dev/api/films');
    console.log(response);
    const data = await response.json();

      const lst = data.results.map(mv => {
        return {id: mv.episode_id, title: mv.title, releaseDate: mv.release_date, openingText : mv.opening_crawl};
      });
          setMovies(lst);
    };
     
  //   fetch('https://swapi.dev/api/films').then(response => {
  //     return response.json();
  //   }).then(data => {
  //     const lst = data.results.map(mv => {
  //       return {id: mv.episode_id, title: mv.title, releaseDate: mv.release_date, openingText : mv.opening_crawl};
  //     });
  //     setMovies(lst);
  //   });
  // };
  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        <MoviesList movies={movies} />
      </section>
    </React.Fragment>
  );
};

export default App;
