import React, { useState, useEffect } from 'react';
    import { useParams, Link } from 'react-router-dom';

    function MovieDetails() {
      const { id } = useParams();
      const [movie, setMovie] = useState(null);
      const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';

      useEffect(() => {
        fetchMovie();
      }, [id]);

      const fetchMovie = async () => {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US&append_to_response=genres,runtime`
        );
        const data = await response.json();
        setMovie(data);
      };

      if (!movie) {
        return <div className="text-white">Loading...</div>;
      }

      return (
        <div className="container mx-auto px-4 py-8">
          <div className="movie-details-container">
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
            </div>
            <div>
              <h2 className="movie-title">{movie.title}</h2>
              <div className="flex items-center space-x-2 mb-4">
                <i className="bi bi-star-fill text-yellow-400"></i>
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
              <p className="movie-overview">{movie.overview}</p>
              <p className="text-gray-400">
                Release Date: {movie.release_date}
              </p>
              <p className="text-gray-400">
                Genres: {movie.genres ? movie.genres.map(genre => genre.name).join(', ') : 'N/A'}
              </p>
              <p className="text-gray-400">
                Runtime: {movie.runtime ? `${movie.runtime} minutes` : 'N/A'}
              </p>
            </div>
          </div>
          <Link to="/" className="back-to-home">
            &larr; Back to Home
          </Link>
        </div>
      );
    }

    export default MovieDetails;
