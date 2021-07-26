import React,{Component} from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import BookShow from '../../screens/bookshow/BookShow';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch,Link, Route } from "react-router-dom";

export default class Header extends Component {
   constructor(props) {
      super(props);
      this.state = {
        error: null,      
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
// {!isAuth ? (
//    <button className="button is-white" onClick={loginUser}>
//      Log in
//    </button>
//  ) : (
//    <button className="button is-black" onClick={logoutUser}>
//      Log out
//    </button>
//  )}
     return (
     
        <div className='header'>
           <img className='logo-css' src={logo}></img>
           <div style={{float: "right"}}>
           
           
           {/* <Link to="/bookshow/BookShow">   */}
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