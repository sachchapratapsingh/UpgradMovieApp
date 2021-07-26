import React from 'react';
import Home from './home/Home';
import { Switch,Link, Route } from "react-router-dom";
import BookShow from './bookshow/BookShow';
import Details from './details/Details';

export default class Controller extends React.Component {
   constructor(props) {
      super(props);
      this.state = {

      };
    }
   render() {
      return (
         <div>       
             <div>    
             
            <Link to="/home"></Link>
                </div>
               <Switch>
                  <div>
                     <Route path="/home" component={Home}></Route>
            
                     <Route exact path="/movie/BookShow"  component={BookShow}
></Route>
                     <Route exact path="/movie/:id" render={(props)=>{return(
    <Details id={props.match.params.id}/>)
}}></Route>
                        </div>
                        </Switch>
         </div>
      );
   }
}

