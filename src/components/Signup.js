import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import $ from "jquery"
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      password_confirmation: '',
      errors: ''
     };
  }
  handleChange = (event) => {
      const {name, value} = event.target
      this.setState({
        [name]: value
      })
    };
  handleSubmit = (event) => {
      event.preventDefault();
      const {email, password, password_confirmation} = this.state;
      let user = {
        email: email,
        password: password,
        password_confirmation: password_confirmation
      };
      console.log('user', user);
    axios.post('http://calendarprojectrails.herokuapp.com/users', {user} )
      .then(response => {
        console.log('response', response);
      })
      .catch(error => console.log('api errors:', error));
      this.props.history.push('/')
    }
  render() {
          const {email, password, password_confirmation} = this.state
          return (
          <div className="App">
            <div class="wrapper animated bounce">
             <form onSubmit={this.handleSubmit}>
​
                <input
                  placeholder="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  className="placeholder"
                />
              <br/><br/>
                <input
                  placeholder="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleChange}
                />
                <br/><br/>

                <input
                  placeholder="password confirmation"
                  type="password"
                  name="password_confirmation"
                  value={password_confirmation}
                  onChange={this.handleChange}
                />
​              <br/><br/>
                <button className="pressbutton" placeholder="submit" type="submit" onSubmit={this.handleSubmit}>
                  Sign Up
                </button>
​
              </form>
              </div>
            </div>
          );
        }
}
export default Signup;
