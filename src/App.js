import { useEffect, useState } from "react";
import "./App.css";
import { getMovieList, searchMovie } from "./api";

const App = () => {
  const [popularMovies, setPopularMovies] = useState([]);

  useEffect(() => {
    getMovieList().then((result) => {
      setPopularMovies(result);
    });
  }, []);

  const PopularMovieList = () => {
    return popularMovies.map((movie, i) => {
      return (
        <div className="wrapper" key={i}>
          <img className="img" alt="img" src={`${process.env.REACT_APP_BASEIMGURL}/${movie.poster_path}`} />
          <div className="sub-title">
            <div className="title">{movie.title}</div>
            <div className="sub-wrapper">
              <div className="date">{movie.release_date}</div>
              <div className="rate">⭐{movie.vote_average}</div>
            </div>
          </div>
        </div>
      );
    });
  };

  const search = async (q) => {
    if (q.length > 3) {
      const query = await searchMovie(q);
      setPopularMovies(query.results);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="nav nav-container">
          <a href=".nav" className="logo">
            Film
          </a>
          <div className="search-container">
            <input type="text" className="search" placeholder="Search" onChange={({ target }) => search(target.value)} />
            <a href=".nav" className="login">
              Login
            </a>
          </div>
        </div>
        <div className="wallpaper">
          <h1 className="wallpaper-title">
            EXPLORE <span>THE AMAZING MOVIES</span>
          </h1>
        </div>
        <h1 className="judul">Featured Movies</h1>
        <div className="film-container container">
          <PopularMovieList />
        </div>
      </header>
    </div>
  );
};

export default App;
