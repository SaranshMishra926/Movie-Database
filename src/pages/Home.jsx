import React, { useState, useEffect } from 'react';
    import MovieCard from '../components/MovieCard';
    import SearchBar from '../components/SearchBar';
    import { Swiper, SwiperSlide } from 'swiper/react';
    import { Autoplay } from 'swiper/modules';
    import { Link } from 'react-router-dom';

    import 'swiper/css';
    import 'swiper/css/autoplay';

    function Home() {
      const [movies, setMovies] = useState([]);
      const [category, setCategory] = useState('popular');
      const [searchTerm, setSearchTerm] = useState('');
      const API_KEY = '3fd2be6f0c70a2a598f084ddfb75487c';

      useEffect(() => {
        fetchMovies();
      }, [category, searchTerm]);

      const fetchMovies = async () => {
        let url = `https://api.themoviedb.org/3/movie/${category}?api_key=${API_KEY}&language=en-US&page=1`;
        if (searchTerm) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}&page=1`;
        }
        const response = await fetch(url);
        const data = await response.json();
        setMovies(data.results);
      };

      const handleSearch = (term) => {
        setSearchTerm(term);
      };

      return (
        <div className="home-page">
          <div className="container">
            <div className="flex justify-between items-center">
              <div className="flex items-center w-full">
                <div className="w-1/2 flex justify-start">
                  <nav className="py-6">
                    <ul className="flex justify-start space-x-4">
                      <li>
                        <button
                          className={`text-lg font-semibold ${category === 'popular' ? 'text-blue-500 active' : 'text-white'}`}
                          onClick={() => { setCategory('popular'); setSearchTerm('') }}
                        >
                          Popular
                        </button>
                      </li>
                      <li>
                        <button
                          className={`text-lg font-semibold ${category === 'top_rated' ? 'text-blue-500 active' : 'text-white'}`}
                          onClick={() => { setCategory('top_rated'); setSearchTerm('') }}
                        >
                          Top Rated
                        </button>
                      </li>
                      <li>
                        <button
                          className={`text-lg font-semibold ${category === 'upcoming' ? 'text-blue-500 active' : 'text-white'}`}
                          onClick={() => { setCategory('upcoming'); setSearchTerm('') }}
                        >
                          Upcoming
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="w-1/2 flex justify-end">
                  <SearchBar onSearch={handleSearch} />
                </div>
              </div>
            </div>

            {movies.length > 0 ? (
              <Swiper
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                autoplay={{
                  delay: 3000,
                  disableOnInteraction: false,
                }}
                modules={[Autoplay]}
                className="mySwiper swiper-container"
              >
                {movies.map((movie) => (
                  <SwiperSlide key={movie.id} className="swiper-slide">
                    <Link to={`/movie/${movie.id}`}>
                      <img src={`https://image.tmdb.org/t/p/original${movie.backdrop_path || movie.poster_path}`} alt={movie.title} />
                      <div className="movie-info-overlay">
                        <h3 className="movie-title">{movie.title}</h3>
                        <div className="movie-rating">
                          <i className="bi bi-star-fill"></i>
                          <span>{movie.vote_average.toFixed(1)}</span>
                        </div>
                      </div>
                    </Link>
                  </SwiperSlide>
                ))}
              </Swiper>
            ) : (
              <p>No movies found.</p>
            )}

            <div className="movie-grid">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </div>
        </div>
      );
    }

    export default Home;
