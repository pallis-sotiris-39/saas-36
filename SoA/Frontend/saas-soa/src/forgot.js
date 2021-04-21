import './App.css';
import {observer} from 'mobx-react'
import React from 'react';
import InputField from './InputField.js';
import SubmitButton from './SubmitButton.js';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { Redirect, useHistory } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';

class Forgot extends React.Component {

  constructor(props){
    console.log(document.cookie);
      super(props);
      this.state={
          username:'',
          password:'',
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
            username:'',
            password:'',
            buttonDisabled: false
        })
  }



  async doLogin(){
      console.log(this.state.username);
      if(!this.state.username) return;
      if(!this.state.password) return;

      this.setState({
          buttonDisabled: true
      })

      try{

          let res = await fetch(`http://localhost:8765/signin?username=${this.state.username}&password=${this.state.password}`, {
              mode: 'cors',
              method: 'post',
              headers:{
                 'Content-Type': 'application/x-www-form-urlencoded'
              }
          });

          console.log(res);
          console.log(this.state.password);

          let result = await res.json();
          let status = await res.status;
          console.log(result);
          console.log(status);
          if (status == 200){
            console.log('yaaass');
            document.cookie=`username = ${result.username}`;
            document.cookie='flag=true';
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
            console.log(x);
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
                  <div className="recoverybox">
                    <form>
                      <div className = "space">
                      <p className="email"> Forgot your password or <br/>  having trouble logging in? <br/> Enter your email and we’ll  <br/>send you a recovery link.</p>
                      </div>
                      <p className="email">Email</p>

                      <InputField
                          className="input-field"
                          type='text'
                          value={this.state.username ? this.state.username: ''}
                          onChange={(val) => this.setInputValue('username', val)}
                      />
                      <br/>
                      <SubmitButton
                          text='Send'
                          className = 'test-button'
                          disabled={this.state.buttonDisabled}
                          onClick={() => this.doLogin()}
                      />


                    </form>
                  </div>
              </section>
            </main>
        );
}
}
export default observer(Forgot);
