import React, { Component } from "react";
import Zmage from "react-zmage";
import Fade from "react-reveal";
//import firebase from 'firebase';
import app from '../firebase.js';
import {getDatabase,ref,set,get,child,update} from "firebase/database";

let id = 0;

class Map extends Component {

  
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {    this.setState({value: event.target.value});  }
  handleSubmit(event) {
    event.preventDefault();
    // app.database().ref('Provinces').set({
    //    Test: 100
    // })
    alert('A name was submitted: ' + this.state.value);
    const dbRef = ref(getDatabase());
    //const db = getDatabase(app);
    update(child(dbRef,'Provinces/BC'),{Test:300});    

    
    get(child(dbRef, `Provinces1`)).then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

  }

  render() {
    return (
      <section id="map">
        <Fade left duration={1000} distance="40px">
          <div className="row">
            <div className="nine columns main-col">
              <h2>Canada data</h2>        
              <form onSubmit={this.handleSubmit}>
              <label>
                <h5>Your province:</h5>
                <input type="text" value={this.state.value} onChange={this.handleChange} /></label>
             <input type="submit" value="Submit" />
            </form>
            </div>

            
          </div>

        </Fade>
      </section>
    );
  }
}

export default Map;
