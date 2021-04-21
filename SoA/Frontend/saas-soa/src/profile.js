import './App.css';
import {observer} from 'mobx-react'
import React from 'react';
import InputField from './InputField.js';
import SubmitButton from './SubmitButton.js';
import TitleField from './TitleField';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { Redirect, useHistory } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';

class Profile extends React.Component{

  constructor(props){
    console.log(document.cookie);
      super(props);
      this.state={
          title:'',
          tags:''
        }
  }

 setInputValue(property, val){
    this.setState({
         [property]: val
    })
  }


  render(){
          return (
              <main>
                <section className="blur-banner">
                    <div className ="profilebox">

                    </div>
                </section>
              </main>
          );
  }

}

export default observer(Profile);
