import React from 'react';
    import { Routes, Route } from 'react-router-dom';
    import Home from './pages/Home';
    import MovieDetails from './pages/MovieDetails';
    import Header from './components/Header';
    import Footer from './components/Footer';

    function App() {
      return (
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
          <Footer />
        </div>
      );
    }

    export default App;
