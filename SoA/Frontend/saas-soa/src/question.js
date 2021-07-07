import './App.css';
import {observer} from 'mobx-react'
import {useState, useEffect} from 'react';
import React from 'react';
import InputField from './InputField.js';
import SubmitButton from './SubmitButton.js';
import TitleField from './TitleField';
import BodyField from './BodyField';
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
          const bigData = await fetch('http://localhost:3001/answer',{
          method: 'get',
          headers:{
            'Content-Type': 'application/json'
          }}

        );

          const items = await bigData.json();
          console.log(items);
          setItems(items);
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
                        <BodyField
                        />
                        </div>
                      </form>
                      <div className = "form-button-2">
                          <SubmitButton
                              text='Submit'
                              className = 'test-button'
                          />
                      </div>
                    </div>

                    <div className="answer_links">
                    {items.map(el => (
                        <div className="answer_box">
                          <h2> username </h2>
                          <p> {el.text} </p>
                        </div>

                    ))}
                    </div>

                </section>
              </main>
          );


}

export default observer(Question);
