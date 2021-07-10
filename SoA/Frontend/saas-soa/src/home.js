import './App.css';
import {observer} from 'mobx-react';
import React from 'react';
import InputField from './InputField.js';
import SubmitButton from './SubmitButton.js';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { Redirect, useHistory } from "react-router-dom";
import { withCookies, Cookies } from 'react-cookie';
import {Bar} from 'react-chartjs-2';
import "aos/dist/aos.css";
import Aos from "aos";

class Home extends React.Component {

  constructor(props){
    window.scrollTo(0, 0);
      super(props);
      this.state={
          data: [],
          keywords:[],
          lengths:[]
        }
  }


 setInputValue(property, val){
    this.setState({
         [property]: val
    })
  }

  async componentDidMount(){

          let res = await fetch(`http://${process.env.REACT_APP_ROUTER_HOST}:${process.env.REACT_APP_ROUTER_PORT}/keyword`, {
              method: 'get',
              headers:{
                'Content-Type': 'application/json'
              }

          });
          const json = await res.json();
          this.setState({data: json});
          console.log("HELLOOOO");
          console.log(this.state.data);
          console.log(this.state.data.length);

}




render(){
  window.scrollTo(0, 0);
  for(let i=0; i<this.state.data.length; i++){
    console.log(this.state.data[i].questions.length);
    this.state.data[i].length = this.state.data[i].questions.length;
  }
  console.log(this.state.data);
  let x = this.state.data.sort((a, b) => (a.length > b.length ? -1 : 1));
  console.log(x);
  for(let i=0; (i<this.state.data.length && i<10); i++){
    this.state.keywords[i]=this.state.data[i].keyword
    this.state.lengths[i]=this.state.data[i].length
  }
  console.log(this.state.keywords);
  console.log(this.state.lengths);



  return (
      <main>
      <section class="image-banner">
        <div class="home-page">
          <h1>A WHOLE NEW WORLD <br/> OF PROGRAMMING.</h1>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></script>

        </div>
        <div className="home-chart">
          <div className="chartDiv" animateIn="fadeIn" >
            <Bar
              height={200}
              width={200}
              data={{
                labels: this.state.keywords,
                datasets: [{
                  label: '# of Questions',
                  data: this.state.lengths,
                  backgroundColor: [
                      'rgba(255, 99, 132, 0.2)',
                      'rgba(54, 162, 235, 0.2)',
                      'rgba(255, 206, 86, 0.2)',
                      'rgba(75, 192, 192, 0.2)',
                      'rgba(153, 102, 255, 0.2)'
                  ],
                  borderColor: [
                      'rgba(255, 99, 132, 1)',
                      'rgba(54, 162, 235, 1)',
                      'rgba(255, 206, 86, 1)',
                      'rgba(75, 192, 192, 1)',
                      'rgba(153, 102, 255, 1)'
                  ],
                  borderWidth: 1
        }]
              }}
              options={{
                plugins:{
                  title: {
                    display: true,
                    text: 'Most popular keywords'
                  }
                },
                maintainAspectRatio:false

              }}
            />
          </div>
        </div>

      </section>
      </main>
  );
}
}
export default Home;
