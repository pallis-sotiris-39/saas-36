import './App.css';
import {observer} from 'mobx-react'
import React from 'react';
import InputField from './InputField.js';
import SubmitButton from './SubmitButton.js';
import TitleField from './TitleField';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';

class Profileq extends React.Component{

  constructor(props){
    window.scrollTo(0, 0);
      super(props);
      this.state={
          data: []
        }
  }


 setInputValue(property, val){
    this.setState({
         [property]: val
    })
  }

  async componentDidMount(){
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
          let res = await fetch(`http://${process.env.REACT_APP_ROUTER_HOST}:${process.env.REACT_APP_ROUTER_PORT}/user/${x.user_id}`, {
              method: 'get',
              headers:{
                'Content-Type': 'application/json'
              }

          });
          const json = await res.json();
          this.setState({data: json.questions});
          console.log("HELLOOOO");
          console.log(this.state.data);
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
                    <div className="profile_links">
                    {this.state.data.map(el => (
                        <div className="station-box">

                        <Link to ={{
                              pathname: `Question_${el.id}`,
                              state: {
                                  Q_title: el.title,
                                  Q_text: el.text,
                                  Q_id: el.id
                              }
                            }} className="Link_Style">
                          <h2>  {el.title} </h2>
                          <p><b>Asked:</b> {el.text} </p>
                        </Link>
                        </div>

                    ))}
                    </div>
                </section>
              </main>
          );
  }

}

export default observer(Profileq);
