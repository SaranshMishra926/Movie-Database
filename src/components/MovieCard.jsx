import React from 'react';
    import { Link } from 'react-router-dom';

    function MovieCard({ movie }) {
      return (
        <Link to={`/movie/${movie.id}`} className="movie-card">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <div className="movie-rating">
              <i className="bi bi-star-fill"></i>
              <span>{movie.vote_average.toFixed(1)} / 10</span>
              <i className="bi bi-star-fill"></i>
            </div>
            <p className="movie-date">{movie.release_date}</p>
          </div>
        </Link>
      );
    }

    export default MovieCard;
