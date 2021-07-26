import React,{Component} from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

export default class Header extends Component {
   constructor(props) {
      super(props);
      this.state = {
            
        movies: [],
        genres: [],
        artists:[],
        findByMovieName: '',
        findByMovieStartDate: '',
        findByMovieEndDate: '',
        findByMovieGenre: [],
        findByMovieArtists: [{}],
        releasedMovies:[]
      };
    }
  render() {
   const isAuthenticated = false;

     return (
     
        <div className='header'>
           <img className='logo-css' src={logo} alt="logo"></img>
           <div style={{float: "right"}}>
           
           <Link  to="/movie/BookShow">  
            <Button  variant="contained"  style={{color:"primary"}} >Book Show 
            </Button>
            </Link>    
         
            
            &nbsp;
            &nbsp;
           
           <Button  variant="contained" style={{color:"default"}} >{ isAuthenticated ? <span>Login</span> : <span>Logout</span>  } 
            </Button> 
            </div>
        </div>
       
     );
  }
}