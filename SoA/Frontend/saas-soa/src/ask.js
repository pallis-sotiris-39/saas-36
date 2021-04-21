import './App.css';
import {observer} from 'mobx-react'
import React from 'react';
import InputField from './InputField.js';
import SubmitButton from './SubmitButton.js';
import TitleField from './TitleField';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { Redirect, useHistory } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';

class Ask extends React.Component{

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
                            <textarea className = "body" cols="50" rows="10"></textarea>
                          </div>
                          <p className="email">Keywords</p>
                          <TitleField
                              type='text'
                              value={this.state.tags ? this.state.tags: ''}
                              onChange={(val) => this.setInputValue('tags', val)}
                          />
                          <p className = "desc">*Add up to 5 keywords to describe your question</p>
                          <SubmitButton
                              text='Submit'
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

export default observer(Ask);
