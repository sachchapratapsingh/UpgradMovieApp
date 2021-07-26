
import Header from '../../common/header/Header';
import React from 'react';
import { Typography } from '@material-ui/core';
//import StarBorderIcon from '@material-ui/core/StarBorderIcon ';
import { Link } from "react-router-dom";
import './Details.css';
import YouTube from 'react-youtube';



export default class Details extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
        
    movies: [],
	  Movie1:{}
  
    };
  }

  componentDidMount() {
    fetch("http://localhost:8085/api/v1/movies?page=1&limit=17")
    
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
           
            movies: result.movies,
			
          });
        }
      )
      
  }

  render() {
	let { movies, Movie1 } = this.state;
	
    
   Movie1 = movies.filter( (moviee) => moviee.status === 'RELEASED'&&moviee.id===this.props.id);

      return (
        <div ><div>	
			<Header/>
    
	 <Typography className="back">
	 <Link to="/home">
            &#60; Back to Home
          </Link>
		  </Typography>
		  </div>	
      {Movie1.map((movie) => (
		  <div className="outerPart">
       
		  <div className="part1">    
		 
   
 <img srcSet={movie.poster_url} 
          alt={movie.title}
          
        />
    	  </div>
		  <div className="part2">
      <Typography variant='headline'>
         <h2>{movie.title}</h2>
        </Typography>
        <Typography ><b>Genre: </b>
         {movie.genres.map((Genre) => (<span>{Genre}, </span>))}
        </Typography>
        <Typography><span>
        <b>Duration: </b>{movie.duration}
        </span>
        </Typography>
        <Typography><span>
        <b>Release Date: </b>{movie.release_date}
        </span>
        </Typography>
        <Typography><span>
        <b>Rating: </b>{movie.rating}</span>
        </Typography>
        <Typography marginTop='16px'><span>
        <b>Plot: </b><a href={movie.wiki_url}>(Wiki Link) </a>{movie.storyline}</span>
        </Typography>
        <Typography marginTop='16px'>
        <b>Trailer: </b>
        <YouTube url={movie.trailer_url}           

/>
        </Typography>
      </div>
		  <div className="part3">  
      <Typography>
        <b>Rate this movie: </b>
        {/* <StarBorderIcon /> */}
 
 
        </Typography></div>
		  </div>
  ))}
  </div>
      );
    }
  }

     
    