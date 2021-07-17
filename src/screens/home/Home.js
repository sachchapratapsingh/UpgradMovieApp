
import Header from '../../common/header/Header';
import './Home.css';
//import GridList from '@material-ui/core/GridList';
import ImageList from '@material-ui/core/ImageList'
//import Box from '@material-ui/core/Box';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
//import MovieList from '../../common/MovieList/MovieList';
import React from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Genres from './findMoviesBy';
import Details from '../details/Details';
import Button from '@material-ui/core/Button';


export default class Home extends React.Component {
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
      findByMovieGenre: '',
      findByMovieArtists: {},
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
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
            
            error
          });
        }
      )
      fetch("http://localhost:8085/api/v1/genres")     
      
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            
            genres: result.genres
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
           
            error
          });
        }
      )
      fetch("http://localhost:8085/api/v1/artists")
    
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
           
            artists: result.artists
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
           
            error
          });
        }
      )
      fetch("http://localhost:8085/api/v1/movies?page=1&limit=17&status=released")     
      
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            
            releasedMovies: result.movies
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          this.setState({
           
            error
          });
        }
      )
  }

  render() {
    const{movies}=this.state;
    var { error,  genres, artists, findByMovieName,findByMovieGenre, findByMovieArtists,findByMovieStartDate,findByMovieEndDate, releasedMovies } = this.state;
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
      // alert("event clicked")
    
     if(findByMovieName.length>0)
     Movies1=Movies1.filter((moviee) =>moviee.title===findByMovieName);
     if(findByMovieGenre.length>0)
     Movies1=Movies1.filter((moviee) =>moviee.genres.includes(findByMovieGenre));
     if(findByMovieArtists.length>0)
     Movies1=Movies1.filter((moviee) =>moviee.artists.some(x=>findByMovieArtists.id===x.id));
     if(findByMovieStartDate.length>0)
     Movies1=Movies1.filter((moviee) =>moviee.release_date>findByMovieStartDate);
    
     if(findByMovieEndDate.length>0){
     Movies1=Movies1.filter((moviee) =>moviee.release_date<findByMovieEndDate);
     
    
    }
     this.setState({ releasedMovies: Movies1 });
     };

    if (error) {
      return <div>Error: {error.message}</div>;
    } else {
      return (

        <div>
          <Header/>
            <div className="UpcomingMovies">Upcoming Movies</div>
            <div >
  
        <ImageList className="HorizontalScroll"  rowHeight={250}  rows={1} cols={6} gap={8} >
    
    {upcomingMovies.map((movie) => (
      <ImageListItem className="ImageListItemUpcommingMovies"  key={movie.poster_url} >
 <img className="ImageListItemUpcommingMovies" srcSet={movie.poster_url}
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
   <div className="ReleasedMovies " >
     
   <ImageList cols={4} gap={18} >
      
      { releasedMovies.map((movie) => (
        <ImageListItem style={{cursor: 'pointer',height:'350px'}} key={movie.poster_url} >
          <img srcSet={movie.poster_url}
            alt={movie.title}
            
          />
          <ImageListItemBar
            title={movie.title}
            subtitle={<span>Release Date: {movie.release_date}</span>}          
            
          />
        </ImageListItem>
      ))}
    </ImageList>

      </div>
   <div className="FindMoviesBy ">
   <Card>
       <CardHeader style={{color :'theme.palette.primary.light'}}
          
          title="FIND MOVIES BY:" 
          
        />
  <FormControl>
    <InputLabel htmlFor="my-input">Movie Name</InputLabel>
    <Input value={findByMovieName} onChange={handleChangeName} id="findByMovieName" />
    </FormControl>
    <br />
    <br />
    <FormControl >
  <InputLabel  id="label">Genres</InputLabel>

  <Select value={findByMovieGenre} name="findByMovieGenre" onChange={handleChangeGenre} style={{margin:'20px', width:'240px'}} >
  <MenuItem value={''}>
                   <span> </span>
                  </MenuItem>
              {genres.map((genre) => (

                <MenuItem key={genre.genre} value={genre.genre}>
                   <span> {genre.genre}</span>
                  </MenuItem>
                    
                    
                      ))}
                    
                    </Select>
                    </FormControl>
 <br />
 <br />
    <FormControl  >
  <InputLabel id="label">Artists</InputLabel>
  <Select value={findByMovieArtists} onChange={handleChangeArtists} name="findByMovieArtists">
  <MenuItem value={''} >

<span> </span>
</MenuItem>

 {artists.map((artist) => (
          
<MenuItem key={artist} value={artist}>  
<span>{artist.first_name} {artist.last_name}</span>
</MenuItem>
   ))}
    </Select>
 </FormControl>
  <br />
 <br />
    <FormControl>
                    <TextField 
    id="findByMovieStartDate"
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
    <TextField 
    id="findByMovieEndDate"
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
<Button   variant="contained" color="primary" onClick={applyHandler}>
  APPLY
</Button>
       </Card>
   </div>
   </div>
 
      </div>
      
      );
    }
  }

     
    }
  

/*

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('');

	const getMovieRequest = async (searchValue) => {
		const url = `http://www.omdbapi.com/?s=star wars&apikey=263d22d8`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setMovies(responseJson.Search);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);

	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);

	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	return (
		<div className='container-fluid movie-app'>

			<div className='row'>
				<MovieList
					movies={movies}
				/>
			</div>
		
			</div>
	);
};




/*
export default class Home extends React.Component {
 

   render() {
    const classes = useStyles();
      return (
         <div>
            <Header/>
            <div className="UpcomingMovies">Upcoming Movies</div>
            <div >
            <ImageList style={{height:250,overflowX:'auto', flexWrap:'nowrap'}} rowHeight={250}  rows= {1} cols={6} gap={8} >
      
      {itemData.map((item) => (
        <ImageListItem rows={1} key={item.img} >



          	
          <img srcSet={`${item.img}?h=250px&fit=fill`}
            alt={item.title}
            
          />
          <ImageListItemBar
            title={item.title}
                     
            
          />
        </ImageListItem>
      ))}
    </ImageList>

   </div>
   <div className="flex-container">
   <div className="ReleasedMovies " >
     
   <ImageList cols={4} gap={18} >
      
      {itemData.map((item) => (
        <ImageListItem style={{cursor: 'pointer',height:'350px'}} key={item.img} >
          <img srcSet={`${item.img}?h=350px&fit=fill`}
            alt={item.title}
            
          />
          <ImageListItemBar
            title={item.title} 
            subtitle={<span>Release Date: {item.date}</span>}          
            
          />
        </ImageListItem>
      ))}
    </ImageList>

      </div>
   <div className="FindMoviesBy ">
     <Card>
     <CardHeader style={{color:'#a6d4fa'}}
        
        title="FIND MOVIES BY:" 
        
      />
<FormControl>
  <InputLabel htmlFor="my-input">Email address</InputLabel>
  <Input id="my-input" aria-describedby="my-helper-text" margin='theme.spacing.unit'/>


</FormControl>
<InputLabel id="label">Age</InputLabel>
<Select labelId="label" id="select" value="20">
  <MenuItem value="10"><Checkbox
  value="checkedA"
  inputProps={{ 'aria-label': 'Checkbox A' }}
/>Ten</MenuItem>
  <MenuItem value="20">Twenty</MenuItem>
</Select>
     </Card>
   </div>
   </div>             
         </div>
      );
   }
}
const itemData = [
  {
    img: 'https://i.pinimg.com/originals/3a/6a/2b/3a6a2bd9a83283cd6ef230ab6a1df4dc.jpg',
    title: 'Breakfast',
    date: '12-12-2021',
  },
  {
    img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
    title: 'Burger',
    author: '@rollelflex_graphy726',
  },
  {
    img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
    title: 'Camera',
    author: '@helloimnik',
  },
  {
    img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
    title: 'Coffee',
    author: '@nolanissac',
  },
  {
    img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
    title: 'Hats',
    author: '@hjrc33',
  },
  {
    img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
    title: 'Honey',
    author: '@arwinneil',
    
  },
  {
    img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
    title: 'Basketball',
    author: '@tjdragotta',
  },
  {
    img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
    title: 'Fern',
    author: '@katie_wasserman',
  },
  {
    img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
    title: 'Mushrooms',
    author: '@silverdalex',
  },
  {
    img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
    title: 'Tomato basil',
    author: '@shelleypauls',
  },
  {
    img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
    title: 'Sea star',
    author: '@peterlaster',
  },
  {
    img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
    title: 'Bike',
    author: '@southside_customs',
  },
];
*/