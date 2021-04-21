import './App.css';
import React from 'react';
import { Redirect, useHistory } from "react-router-dom";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import {withRouter} from "react-router-dom";
import ama from './images/AmA1.png';
import SubmitButton from './SubmitButton'

class Header extends React.Component {


  constructor(props) {
   super(props);
   this.state={

     }
 }

  async doLogout(){
    document.cookie ="token=";
    document.cookie ="flag=false";
    this.props.history.push('/');
    window.location.reload(false);
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


      if(x.flag == true){

      return(
        <header>
              <Link to = '/'>
              <a href="">
                <img src={ama} alt="" width="90" height="50" class="header-brand"/>
              </a>
              </Link>
            <nav>
              <ul>
                    <div className='add'>
                    <Link to = '/AmA'>
                        <button>+</button>
                    </Link>
                    </div>

                  <div className='login'>
                  <Link to = '/profile'>
                      <button>Profile</button>
                  </Link>
                  </div>

                  <div className='sign'>
                  <SubmitButton

                      text='Log out'
                      onClick={() => {this.doLogout();
                      }}
                  />


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
  else{
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
                    <button>Log in</button>
                </Link>
                </div>

                <div className='sign'>
                  <Link to ='signup'>
                    <button>Sign up</button>
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
}

export default withRouter(Header);
