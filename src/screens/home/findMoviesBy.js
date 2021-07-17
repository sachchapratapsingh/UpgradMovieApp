
import React, { useState, useEffect } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Details from '../details/Details';
//import { withStyles } from "@material-ui/core/styles";

// const styles = (theme) => ({
//   formComponent: {
//     margin: theme.spacing.unit,
//     minWidth: 240,
//     maxWidth: 240,

//   },
//   success: {
//     color:'red',
//   },
// });



/*
const FindMoviesBy = () => {
  const [genres, setGenres] = useState([]);
  const [artists, setArtists] = useState([]);
  const [searchValue, setSearchValue] = useState('artists')

  const getMovieRequest = async (searchValue) => {
		const url = `http://localhost:8085/api/v1/${searchValue}`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			setGenres(responseJson.Search);

		}
	};

  useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);


  return (

<Card>
       <CardHeader style={{color :'theme.palette.primary.light'}}
          
          title="FIND MOVIES BY:" 
          
        />
  <FormControl>
    <InputLabel htmlFor="my-input">Movie Name</InputLabel>
    <Input id="my-input" aria-describedby="my-helper-text" />
    </FormControl>
    <br />
    <br />
    <FormControl >
  <InputLabel  id="label">Genres</InputLabel>
  <Select searchValue="genres" style={{margin:'20px', width:'240px'}} >
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
  <Select searchValue={searchValue} setSearchValue="artists">
              {artists.map((artist) => (

                
<MenuItem key={artist.id} value={artist.id}>
 {artist.first_name} {artist.last_name}
</MenuItem>
                    
                    
                      ))}
                    
                    </Select>
                    </FormControl>


                    <br />
 <br />
    <FormControl>
                    <TextField 
    id="date"
    label="Release Date Start"
    type="date"
    defaultValue="dd-mm-yyyy"
    
    InputLabelProps={{
      shrink: true,
    }}
  />

</FormControl>
<br />
 <br />
    <FormControl >
    <TextField 
    id="date"
    label="Release Date End"
    type="date"
    defaultValue="dd-mm-yyyy"
    
    InputLabelProps={{
      shrink: true,
    }}
  />

</FormControl>
<br />
<br />
<Button  variant="contained" color="primary" onClick={this.applyHandler}>
  APPLY
</Button>
       </Card>

	);

}


export default FindMoviesBy;


*/


export default class FindMoviesBy extends React.Component {


    constructor(props) {
      super(props);
      this.state = {
        error: null,
        isLoaded: false,
        genres: [],
        artists:[]
      };
    }
  
    componentDidMount() {
      fetch("http://localhost:8085/api/v1/genres")     
      
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              genres: result.genres
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
        fetch("http://localhost:8085/api/v1/artists")
      
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              isLoaded: true,
              artists: result.artists
            });
          },
          // Note: it's important to handle errors here
          // instead of a catch() block so that we don't swallow
          // exceptions from actual bugs in components.
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        )
    }
  
  
     

    
            
    render() {
      
      let applyHandler = () => { 

       };


      const { error, isLoaded, genres, artists } = this.state;
      if (error) {
        return <div>Error: {error.message}</div>;
      } else if (!isLoaded) {
        return <div>Loading...</div>;
      } else {
        const { classes } = this.props;
        return (
  
     <Card>
       <CardHeader style={{color :'theme.palette.primary.light'}}
          
          title="FIND MOVIES BY:" 
          
        />
  <FormControl>
    <InputLabel htmlFor="my-input">Movie Name</InputLabel>
    <Input id="my-input" aria-describedby="my-helper-text" />
    </FormControl>
    <br />
    <br />
    <FormControl >
  <InputLabel  id="label">Genres</InputLabel>
  <Select style={{margin:'20px', width:'240px'}} >
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
  <Select >
              {artists.map((artist) => (

                
<MenuItem key={artist.id} value={artist.id}>
 {artist.first_name} {artist.last_name}
</MenuItem>
                    
                    
                      ))}
                    
                    </Select>
                    </FormControl>


                    <br />
 <br />
    <FormControl>
                    <TextField 
    id="date"
    label="Release Date Start"
    type="date"
    defaultValue="dd-mm-yyyy"
    
    InputLabelProps={{
      shrink: true,
    }}
  />

</FormControl>
<br />
 <br />
    <FormControl >
    <TextField 
    id="date"
    label="Release Date End"
    type="date"
    defaultValue="dd-mm-yyyy"
    
    InputLabelProps={{
      shrink: true,
    }}
  />

</FormControl>
<br />
<br />
<Button  variant="contained" color="primary" onClick={applyHandler}>
  APPLY
</Button>
       </Card>
  

        
        );
      }
    }
  
}
      