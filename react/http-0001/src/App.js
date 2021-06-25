import React, { useState } from 'react';

import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = async () => {
    setIsLoading(true);
    const response = await fetch('https://swapi.dev/api/films');
    console.log(response);
    const data = await response.json();

    const lst = data.results.map((mv) => {
      return {
        id: mv.episode_id,
        title: mv.title,
        releaseDate: mv.release_date,
        openingText: mv.opening_crawl,
      };
    });
    setMovies(lst);
    setIsLoading(false);
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
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {!isLoading && movies.length === 0 && <p>Found no movies</p>}
        {isLoading && <div className="lds-hourglass"></div>}
      </section>
    </React.Fragment>
  );
}

export default App;
