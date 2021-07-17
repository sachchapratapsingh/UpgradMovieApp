

import React, { useState, useEffect } from 'react';

import './Details.css';


import SearchBox from './SearchBox';
const MovieList = (props) => {
	return (
		<div>
			{props.movies.map((movie, index) => (
				<div className='image-container d-flex justify-content-start m-3'>
					<img src={movie.Poster} alt='movie'></img>
					<div className='overlay d-flex align-items-center justify-content-center'>
						{movie.title}
					</div>
				</div>
			))}
		</div>
	);
};

const Details = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	return (
		<div className='container-fluid movie-app'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
			<MovieList
					movies={movies}
		
				/>
			</div>
		</div>
	);
};

export default Details;