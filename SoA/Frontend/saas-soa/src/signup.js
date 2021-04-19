import './App.css';
import InputField from './InputField.js';
import SubmitButton from './SubmitButton.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Signup() {
  return (
    <main>
      <section className="blank-banner">
          <div className="signup-box">
            <form>
              <p className="email">Username</p>
              <input
                  className="input-field"
                  type='text'
              />
              <p className="email">Email</p>
              <input
                  className="input-field"
                  type='text'
              />
              <p className="email">Password</p>
              <input
                  className="input-field"
                  type="password"
              />
              <p className="email">Repeat Password</p>
              <input
                  className="input-field"
                  type="password"
              />
              <br/>
              <SubmitButton
                  text='Sign up'
                  className = 'test-button'
              />
              <br/>
            </form>
          </div>
      </section>
    </main>
  );
}

export default Signup;
