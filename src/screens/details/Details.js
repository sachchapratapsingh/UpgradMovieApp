
import Header from '../../common/header/Header';
import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from "react-router-dom";



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
	
    
   Movie1 = movies.filter( (moviee) => moviee.status === 'RELEASED');

      return (
        <div ><div>	
			<Header/>
    
	 <Typography className="back">
	 <Link to="/home">
            &#60; Back to Home
          </Link>
		  </Typography>
		  </div>	
		  <div className="outerPart">
		  <div className="part1">    
		  {Movie1.map((movie) => (
   
 <img srcSet={movie.poster_url} height='250px' 
          alt={movie.title}
          
        />
    
    ))}
 
	  </div>
		  <div className="part2"><h2>{this.props.id}</h2></div>
		  <div className="part3">{this.props.id}</div>
		  </div>

  </div>
      );
    }
  }

     
    