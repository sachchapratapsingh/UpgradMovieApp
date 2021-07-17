import React,{Component} from 'react';
import './Header.css';
import logo from '../../assets/logo.svg';
import Button from '@material-ui/core/Button';
import BookShow from '../../screens/bookshow/BookShow';
import ReactDOM from 'react-dom';
export default class Header extends React.Component {
 
  render() {
   const isAuthenticated = false;
   // var myWindow = window.open("", "MsgWindow", "width=200,height=100");
   // myWindow.document.write(ReactDOM.render(<BookShow />, document.getElementById('root')););
   // // ReactDOM.render(<Controller />, document.getElementById('root'));
   const handleClick= (evt) => {  
    //  ReactDOM.render(<BookShow />, document.getElementById('root'));
   //  <script src='../../screens/bookshow/BookShow'/>
    };

    var newWindow = window.open('');
newWindow.document.createE