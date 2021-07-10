import './App.css';
import {observer} from 'mobx-react'
import React from 'react';
import InputField from './InputField.js';
import SubmitButton from './SubmitButton.js';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { Redirect, useHistory } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';

class Signup extends React.Component {


  constructor(props){
    window.scrollTo(0, 0);
    console.log(document.cookie);
      super(props);
      this.state={
          email:'',
          username:'',
          password:'',
          repeat:'',
          buttonDisabled: false
        }
  }

 setInputValue(property, val){
    this.setState({
         [property]: val
    })
  }

  resetForm(){
        this.setState({
          email:'',
          username:'',
          password:'',
          repeat:'',
          buttonDisabled: false
        })
  }





  async doLogin(){
      console.log(this.state.username);
      if(!this.state.username) return;
      if(!this.state.password) return;
      if(!this.state.email) return;
      if(!this.state.repeat) return;
      if(this.state.password != this.state.repeat) return;

      this.setState({
          buttonDisabled: true
      })

      try{

          let res = await fetch(`http://${process.env.REACT_APP_ROUTER_HOST}:${process.env.REACT_APP_ROUTER_PORT}/signup`, {
              mode: 'cors',
              method: 'post',
              headers:{
                 'Content-Type': 'application/json',
                 'Accept': 'application/json'
              },
              body:JSON.stringify({
                "first_name" : "forename",
                "last_name" : "surname",
                "birthday" : "12/12/1999",
                "email" : `${this.state.email}`,
                "username" : `${this.state.username}`,
                "password" : `${this.state.password}`
              })
          });

          console.log(res);
          console.log(this.state.password);
          console.log(this.state.email);

          let result = await res.json();
          let status = await res.status;
          console.log(result);
          console.log(status);
          if (status == 201 ){
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

  async componentDidMount(){

      try{
          let res = await fetch('/isLoggedIn',{
              method: 'post',
              headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          });

          let result = await res.json();

          if (result && result.success){

          }
          else{

          }
      }

      catch(e){

      }
  }

  async doLogout(){

      try{
          let res = await fetch('https://localhost:8765/evcharge/api/logout',{
              method: 'post',
              headers:{
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          });

          let result = await res.json();

          if (result && result.success){

          }
      }

      catch(e){
          console.log(e);
      }
  }


  render(){
        return (
          <main>
            <section className="blur-banner">
                <div className="signup-box">
                  <form>
                    <p className="email">Username</p>
                    <InputField
                        className="input-field"
                        type='text'
                        value={this.state.username ? this.state.username: ''}
                        onChange={(val) => this.setInputValue('username', val)}
                    />
                    <p className="email">Email</p>
                    <InputField
                        className="input-field"
                        type='text'
                        value={this.state.email ? this.state.email: ''}
                        onChange={(val) => this.setInputValue('email', val)}
                    />
                    <p className="email">Password</p>
                    <InputField
                        className="input-field"
                        type="password"
                        value={this.state.password ? this.state.password: ''}
                        onChange={(val) => this.setInputValue('password', val)}
                    />
                    <p className="email">Repeat Password</p>
                    <InputField
                        className="input-field"
                        type="password"
                        value={this.state.repeat ? this.state.repeat: ''}
                        onChange={(val) => this.setInputValue('repeat', val)}
                    />
                    <br/>
                    <SubmitButton
                        text='Sign up'
                        className = 'test-button'
                        onClick={() => this.doLogin()}
                    />
                    <br/>
                    <Link to = '/login'>
                      <a href="#">Already have an account?</a>
                    </Link>
                  </form>
                </div>
            </section>
          </main>
        );
      }
}

export default observer(Signup);
