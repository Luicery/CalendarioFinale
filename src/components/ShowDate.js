import React from "react"
import axios from "axios"
import "../App.css"
import {
  Route,
  Link,
  HashRouter as Router
} from "react-router-dom"
import CreateAppointment from "./CreateAppointment"
const APPOINTMENT_URL = `https://calendar-rails-final.herokuapp.com/profile`
class ShowDate extends React.Component {
  state = {
    appointments: [],
    appointmentsToday: [],
    time: ""
  }
  componentDidMount() {
    const {match: {params: {day, month, year}}} = this.props;
    this.fetchAppointments();
    this.changeTime();
  }
  componentWillUnmount() {
    console.log(this);
  }
  changeTime() {
    setInterval(()=>{
      let newTime = new Date().getTime();
      let properTime = new Date(newTime).toTimeString().substr(0,8)
      this.setState({time: properTime})
    }, 500)
  }
  fetchAppointments() {
    axios.get(APPOINTMENT_URL, { params:{}, headers: { 'Authorization': localStorage.jwt } })
    .then(res => {
      this.setState({appointments: res.data.appointments});
      console.log(res.data);
      this.findAppointmentsToday();
    })
    .catch(error => console.warn(error));
  }
  findAppointmentsToday() {
    let result = this.state.appointments.filter(x => x.date === `${this.props.match.params.year}-${this.props.match.params.month}-${this.props.match.params.day}`)
    this.setState({appointmentsToday: result})
    this.renderAppointmentsToday()
  }
  renderAppointmentsToday() {
    let times = document.getElementsByClassName("timeOfDay")
    for(let i = 0; i < this.state.appointmentsToday.length; i++) {
      let red = Math.floor(Math.random()*Math.floor(255))
      let blue = Math.floor(Math.random()*Math.floor(255))
      let green = Math.floor(Math.random()*Math.floor(255))
      for(let x = 0; x < times.length; x++) {
        if(this.state.appointmentsToday[i].time.substr(11,2) === times[x].id) {
          times[x].setAttribute("style", `background-color:rgba(${red},${green},${blue},0.7`)
          times[x].addEventListener("click", (event) => {
            this.props.history.push(`${this.props.history.location.pathname}/${this.state.appointmentsToday[i].id}`)
          })
          }
        }
      }
    }
  linkToCreate = () => {
    this.props.history.push(`/calendar/${this.props.match.params.day}/${this.props.match.params.month}/${this.props.match.params.year}/create/appointment`)
  }
  render(){
    return(
      <div className="dateTime">
        <div className="dateTopBar">
        <div id="Time"><h1 id="date">Date:{this.props.match.params.day}/{this.props.match.params.month}/{this.props.match.params.year}</h1>
        <h2>{this.state.time}</h2></div>
        <div id="title">This is your funny day!</div>
        <div id="click" onClick={this.linkToCreate}>Create+</div>
        </div>
        <div id="timeTable">
          <div id="am" className="timeOfDay"><span className="timeTitle">AM </span>appointments</div>
          <div id="pm" className="timeOfDay"><span className="timeTitle">PM </span>appointments</div>
          <div id="00" className="timeOfDay">12am</div>
          <div id="12" className="timeOfDay">12pm</div>
          <div id="01" className="timeOfDay">01am</div>
          <div id="13" className="timeOfDay">01pm</div>
          <div id="02" className="timeOfDay">02am</div>
          <div id="14" className="timeOfDay">02pm</div>
          <div id="03" className="timeOfDay">03am</div>
          <div id="15" className="timeOfDay">03pm</div>
          <div id="04" className="timeOfDay">04am</div>
          <div id="16" className="timeOfDay">04pm</div>
          <div id="05" className="timeOfDay">05am</div>
          <div id="17" className="timeOfDay">05pm</div>
          <div id="06" className="timeOfDay">06am</div>
          <div id="18" className="timeOfDay">06pm</div>
          <div id="07" className="timeOfDay">07am</div>
          <div id="19" className="timeOfDay">07pm</div>
          <div id="08" className="timeOfDay">08am</div>
          <div id="20" className="timeOfDay">08pm</div>
          <div id="09" className="timeOfDay">09am</div>
          <div id="21" className="timeOfDay">09pm</div>
          <div id="10" className="timeOfDay">10am</div>
          <div id="22" className="timeOfDay">10pm</div>
          <div id="11" className="timeOfDay">11am</div>
          <div id="23" className="timeOfDay bottomBorder">11pm</div>
        </div>
      </div>
    )
  }
}

export default ShowDate
