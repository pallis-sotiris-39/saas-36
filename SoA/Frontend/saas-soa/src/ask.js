import './App.css';
import {observer} from 'mobx-react'
import React from 'react';
import InputField from './InputField.js';
import SubmitButton from './SubmitButton.js';
import TitleField from './TitleField';
import BodyField from './BodyField';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { Redirect, useHistory } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';

class Ask extends React.Component{

  constructor(props){
    console.log(document.cookie);
      super(props);
      this.state={
          title:'',
          tags:'',
          body:''
        }
  }

 setInputValue(property, val){
    this.setState({
         [property]: val
    })
  }

  resetForm(){
        this.setState({
            title:'',
            tags:'',
            body:''
        })
  }


  async askme(){
      console.log(this.state.title);
      console.log(this.state.tags);
      console.log(this.state.body);
      try{

          let res = await fetch(`http://localhost:3002/question`, {
              method: 'post',
              headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body:JSON.stringify({
                "title": `${this.state.title}`,
              "body": `${this.state.body}`,
              "tags": `${this.state.tags}`
              })

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
          return (
              <main>
                <section className="blur-banner">
                    <div className ="addbox">
                      <form>
                            <p className="email">Title</p>
                            <TitleField
                                type='text'
                                value={this.state.title ? this.state.title: ''}
                                onChange={(val) => this.setInputValue('title', val)}
                            />
                            <p className="email">Body</p>
                            <div className ="bodymass">
                              <BodyField
                                value={this.state.body ? this.state.body: ''}
                                onChange={(val) => this.setInputValue('body', val)}
                              />
                            </div>
                            <p className="email">Keywords</p>
                            <TitleField
                                type='text'
                                placeholder="e.g. (Code JavaScript React)"
                                value={this.state.tags ? this.state.tags: ''}
                                onChange={(val) => this.setInputValue('tags', val)}
                            />
                            <p className = "desc">*Add up to 5 keywords to describe your question</p>



                      </form>
                      <div className = "form-button">
                          <SubmitButton
                              text='Submit'
                              className = 'test-button'
                              disabled={this.state.buttonDisabled}
                              onClick={() => this.askme()}
                          />
                      </div>
                    </div>
                </section>
              </main>
          );
  }

}

export default observer(Ask);
