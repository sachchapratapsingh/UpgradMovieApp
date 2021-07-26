
import Header from '../../common/header/Header';
import './Home.css';
import ImageList from '@material-ui/core/ImageList'
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";




export default class Home extends React.Component {
  
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

  componentDidMount() {
    fetch("http://localhost:8085/api/v1/movies?page=1&limit=17")
    
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
           
            movies: result.movies
          });
        },
      )
      fetch("http://localhost:8085/api/v1/genres")     
      
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            
            genres: result.genres
          });
        },

      )
      fetch("http://localhost:8085/api/v1/artists")
    
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
           
            artists: result.artists
          });
        },

      )
      fetch("http://localhost:8085/api/v1/movies?page=1&limit=17&status=released")     
      
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            
            releasedMovies: result.movies
          });
        }

      )
  }

  render() {
    const{movies}=this.state;
    var { genres, artists, findByMovieName,findByMovieGenre, findByMovieArtists,findByMovieStartDate,findByMovieEndDate, releasedMovies } = this.state;
    const upcomingMovies = movies.filter( (movie) => movie.status === 'PUBLISHED');
    var Movies1 = movies.filter( (moviee) => moviee.status === 'RELEASED');

   
    
    
    const handleChangeName= (evt) => {  
      this.setState({ findByMovieName: evt.target.value});
    };
    const handleChangeGenre= (evt) => {  
     
      this.setState({  findByMovieGenre:evt.target.value });
    };
    const handleChangeStartDate= (evt) => {  
      this.setState({  findByMovieStartDate:evt.target.value });
    };
    const handleChangeEndDate= (evt) => {  
      this.setState({  findByMovieEndDate:evt.target.value });
    };
    const handleChangeArtists= (evt) => {  
      this.setState({ findByMovieArtists:evt.target.value });
    };
    
    const applyHandler = () => { 
  
     if(findByMovieName.length>0)
     Movies1=Movies1.filter((moviee) =>moviee.title===findByMovieName);
     if(findByMovieGenre.length>0)
     Movies1=Movies1.filter((moviee) =>moviee.genres.some(x=>findByMovieGenre.includes(x)));
     if(findByMovieArtists.length>0)
     Movies1=Movies1.filter((moviee) =>moviee.artists.some(x=>findByMovieArtists.includes(x.id)));
     if(findByMovieStartDate.length>0)
     Movies1=Movies1.filter((moviee) =>moviee.release_date>findByMovieStartDate);
    
     if(findByMovieEndDate.length>0){
     Movies1=Movies1.filter((moviee) =>moviee.release_date<findByMovieEndDate);
    
    }
     this.setState({ releasedMovies: Movies1 });
     };

      return (
      
        <div >
          <Header/>
            <div className="UpcomingMovies">Upcoming Movies</div>
            <div >
  
        <ImageList className="HorizontalScroll"  rowHeight={250}  rows={1} cols={6} gap={8} >
    
    {upcomingMovies.map((movie) => (
      <ImageListItem key={movie.poster_url} >
 <img srcSet={movie.poster_url} height='250px' 
          alt={movie.title}
          
        />
        <ImageListItemBar
          title={movie.title}
                   
          
        />
      </ImageListItem>
    ))}
  </ImageList>
  </div>
  <div className="flex-container">
   <div className="ReleasedMovies" >
     
   <ImageList cols={4} gap={18} >
      
      { releasedMovies.map((movie) => (
        
        <ImageListItem style={{cursor: 'pointer',height:'350px'}} key={movie.poster_url} >
         <Link to={"/movie/"+movie.id}> <img srcSet={movie.poster_url} height='350px'
            alt={movie.title}
            
          /></Link>
          <ImageListItemBar
            title={movie.title}
            subtitle={<span>Release Date: {movie.release_date}</span>}          
            
          />
        </ImageListItem>
      ))}
    </ImageList>

      </div>
   <div className="FindMoviesBy " >
  
   <Card>
       <CardHeader className='FindMoviesByComponents' style={{color:'#a6d4fa'}}
          
          title="FIND MOVIES BY:" 
          
        />
      
    <FormControl>
    <InputLabel >Movie Name</InputLabel>
    <Input value={findByMovieName} className='FindMoviesByComponents' onChange={handleChangeName} />
    </FormControl>
 
    <br />
    <br />
    <FormControl >
  <InputLabel className='FindMoviesByComponents'>Genres</InputLabel>
  <Select multiple value={findByMovieGenre} onChange={handleChangeGenre} className='FindMoviesByComponents' >
  <MenuItem value={''}>
  <span> </span>
  </MenuItem>
   {genres.map((genre) => (

    <MenuItem key={genre.genre} value={genre.genre}><Checkbox  ></Checkbox>
     <span> {genre.genre}</span>
     </MenuItem>
))}
                    
                    </Select>
                    </FormControl>
 <br />
 <br />
  <FormControl>
  <InputLabel className='FindMoviesByComponents' >Artists</InputLabel>
  <Select multiple className='FindMoviesByComponents' value={findByMovieArtists} onChange={handleChangeArtists} >
  <MenuItem value={''} >
<span> </span>
</MenuItem>
 {artists.map((artist) => (
<MenuItem key={artist.id} value={artist.id} ><Checkbox  ></Checkbox>
<span>{artist.first_name} {artist.last_name}</span>
</MenuItem>
   ))}
    </Select>
 </FormControl>
  <br />
 <br />
 
    <FormControl>
    <TextField style={{maxWidth:'240px',minWidth:'240px', margin:'8px'}}
   
    label="Release Date Start"
    type="date"
    defaultValue="dd-mm-yyyy"
    value={findByMovieStartDate} 
    onChange={handleChangeStartDate} 
    InputLabelProps={{
      shrink: true,
    }}
  />

</FormControl>
<br />
 <br />
    <FormControl >
    <TextField style={{maxWidth:'240px',minWidth:'240px', margin:'8px'}}
    
    label="Release Date End"
    type="date"
    defaultValue="dd-mm-yyyy"
    value={findByMovieEndDate} onChange={handleChangeEndDate} 
    InputLabelProps={{
      
      shrink: true,
    }}
  />

</FormControl>
<br />
<br />

<Button  style={{maxWidth:'240px',minWidth:'240px', margin:'8px'}} variant="contained" color="primary" onClick={applyHandler}>
  APPLY
</Button>

       </Card>
   
   </div>
   </div>
 
      </div>
     
      );
    }
  }     
    