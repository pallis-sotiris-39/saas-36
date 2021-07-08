import './App.css';
import {observer} from 'mobx-react'
import {useState, useEffect} from 'react';
import React from 'react';
import InputField from './InputField.js';
import SubmitButton from './SubmitButton.js';
import TitleField from './TitleField';
import BodyField from './BodyField';
import moment from "moment";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';

function Question(){

        const location = useLocation()
        console.log(location)
        const { fromNotifications } = location.state
        const [user, setUser] = React.useState(null)


        useEffect(() => {
            fetchColors();
        }, []);

        const [text, setText] = useState([]);
        const [items, setItems] = useState([]);


        const fetchColors = async () => {
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
          const bigData = await fetch(`http://localhost:3001/answer`,{
          method: 'get',
          headers:{
            'Content-Type': 'application/json'
          }}

        );

          const items = await bigData.json();
          console.log(items);
          console.log("question id is", location.state.Q_id)
          setItems(items);
        }

        const askQuestion = async () => {
          const date_create =  moment().format("DD-MM-YYYY hh:mm:ss")
          const res = await fetch(`http://localhost:3001/answer`, {
              method: 'post',
              headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json'
              },
              body:JSON.stringify({
                  "text": text,
                  "user": {
                      "id" : x.user_id
                  } ,
                  "question":{
                      "id" : location.state.Q_id
                  },
                  "created": date_create
              })

          });
          console.log(res);

          let result = await res.json();
          let status = await res.status;
          console.log(result);
          console.log(status);
          console.log(text);
          if (status == 201){
            console.log('yaaass');
          }
          else{
              this.resetForm();
              alert(result.msg);
          }

        }


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

                    <div className = "Qbox">
                      <h2>  {location.state.Q_title} </h2>
                      <p> {location.state.Q_text} </p>
                      <form>
                        <div className = "A_test">
                          <textarea
                          cols="50"
                          rows="5"
                          placeholder="Contribute to the conversation!"
                          value={text}
                          onChange={e => setText(e.target.value)}
                          className = "body"
                        />
                        </div>
                      </form>
                      <div className = "form-button-2">
                          <SubmitButton
                              text='Submit'
                              className = 'test-button'
                              onClick= {askQuestion}
                          />
                      </div>
                    </div>

                    <div className="answer_links">
                    {items.map(el => (
                        <div className="answer_box">
                          <h2> {el.user.username} </h2>
                          <p> {el.text} </p>
                        </div>

                    ))}
                    </div>

                </section>
              </main>
          );


}

export default observer(Question);
