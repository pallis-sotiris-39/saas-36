import './App.css';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function Footer() {
  return (
      <footer>
          <div className="wrapper">
            <ul>
              <li><a href="#">Home</a></li>
              <li><a href="#">About us</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>
      </footer>
      );
}

export default Footer;
