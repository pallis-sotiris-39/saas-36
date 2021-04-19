import './App.css';
import InputField from './InputField.js';
import SubmitButton from './SubmitButton.js';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Login() {
  return (
      <main>
        <section className="blank-banner">
            <div className="loginbox">
              <form>
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

                <br/>
                <SubmitButton
                    text='Log in'
                    className = 'test-button'
                />
                <br/>
                <a href="#">Forgot your password?</a>
              </form>
            </div>
        </section>
      </main>
  );
}

export default Login;
