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

function Search(){



        window.scrollTo(0, 0);
        const location = useLocation()
        const { fromNotifications } = location.state
        const [user, setUser] = React.useState(null)


        useEffect(() => {
            fetchColors();
        }, []);

        const [text, setText] = useState([]);
        const [items, setItems] = useState([]);
        const [more, setMore] = useState([]);
        const [status, setStatus] = useState([]);


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
          const bigData = await fetch(`http://${process.env.REACT_APP_ROUTER_HOST}:${process.env.REACT_APP_ROUTER_PORT}/keyword/${location.state.keyword}`,{
          method: 'get',
          headers:{
            'Content-Type': 'application/json'
          }}

        );



          const items = await bigData.json();
          const more = items.questions;
          const status = await bigData.status;
          setStatus(status)

          if(status==200){
            console.log(items);
            console.log(more);
            setItems(items);
            setMore(more);
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

        if(status == 200){
          return (
              <main>
                <section className="blur-banner">

                    <div className="search_links">
                    {more.map(el => (
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
                          <p>  {el.text} </p>
                        </Link>
                        </div>

                    ))}
                    </div>

                </section>
              </main>
          );
        }
        else{
          console.log("yaaas");
          return (
              <main>
                <section className="blur-banner">

                    <div className="search_links">

                        <div className="station-box">
                          <h2>  Oops, it seems this keyword does not exist! </h2>
                          <p>  Try searching for another keyword, or search without one to view all questions. </p>
                        </div>


                    </div>

                </section>
              </main>
          );
        }


}

export default observer(Search);
