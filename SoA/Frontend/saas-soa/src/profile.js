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

  async askme(){
      console.log(this.state.title);
      console.log(this.state.tags);
      console.log(this.state.body);
      try{

          let res = await fetch(`http://localhost:3002/question`, {
              method: 'get',
              headers:{
                'Content-Type': 'application/json'
              }

          });

          console.log(res);

          let result = await res.json();
          let status = await res.status;
          console.log(result);
          console.log(status);
          if (status == 201){
            console.log('yaaass');
            this.props.history.push("/");
            window.location.reload(false);
          }
          else{
              this.resetForm();
              alert(result.msg);
          }

      }
      catch(e){
          console.log(e);
          this.resetForm();
      }



}

  render(){

      let x = document.cookie
            .split(';')
            .reduce((res, c) => {
              const [key, val] = c.trim().split('=').map(decodeURIComponent)
              const allNumbers = str => /^\d+$/.test(str);
              try {
                return Object.assign(res, { [key]: allNumbers(val) ?  val : JSON.parse(val) })
              } catch (e) {
                return Object.assign(res, { [key]: val })
              }
            }, {});
          console.log(x.username);
          return (
              <main>
                <section className="blur-banner">
                    <div className ="profilebox">
                            <p className="profilename">{x.username}</p>
                            <Link to = '/profile'>
                              <button className="questions">All activity</button>
                            </Link>
                            <Link to = '/profile_q'>
                              <button className="questions">Questions asked</button>
                            </Link>
                            <Link to = '/profile_a'>
                              <button className="questions">Questions answered</button>
                            </Link>
                              <button className="questions">Profile settings</button>

                    </div>
                </section>
              </main>
          );
  }

}

export default observer(Profile);
