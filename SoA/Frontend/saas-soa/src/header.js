import './App.css';
import React from 'react';
import { Redirect, useHistory } from "react-router-dom";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import ama from './images/AmA.png';
import SubmitButton from './SubmitButton'

class Header extends React.Component {


    render(){
      return(
        <header>
              <Link to = '/'>
              <a href="">
                <img src={ama} alt="" width="90" height="50" class="header-brand"/>
              </a>
              </Link>
            <nav>
              <ul>

                  <div className='login'>
                  <Link to = '/login'>
                      <SubmitButton

                          text='Log in'

                      />
                  </Link>
                  </div>

                  <div className='sign'>
                    <Link to ='signup'>
                      <SubmitButton

                          text='Sign up'

                      />
                    </Link>
                  </div>
                  <div className='searchbar'>
                    <input
                      type="text"
                      className='search'
                      placeholder="search for a keyword"
                    />

                  </div>
                  </ul>
            </nav>
        </header>
      );

    }
}

export default withRouter(Header);
