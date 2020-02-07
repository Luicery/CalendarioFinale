import React from "react"
import axios from "axios"
import NoteSubmit from "./NoteSubmit"
import ShowMap from "./ShowMap"
import "../css/style.css"
const APPOINTMENT_URL = `http://localhost:3000/appointments`
const NOTES_URL = `http://localhost:3000/notes`
class ShowEvent extends React.Component {
  state = {
    title: "",
    description: "",
    date: "",
    time: "",
    timeTo: "",
    aside: "",
    asideTo: "",
    lat: "",
    lng: "",
    weatherPlace: "",
    weatherTemp: "",
    weatherMain: "",
    weatherDesc: "",
    notes: [],
    message: "",
    appointment_id: 0,
    currentPositionLat: 0,
    currentPositionLng: 0,
    address: "",
    allAppointments: []
  }
  componentDidMount(){
    const {match: {params: {day, month, year, appointment_id}}} = this.props;
    navigator.geolocation.getCurrentPosition(res => {this.setState({currentPositionLat:res.coords.latitude, currentPositionLng:res.coords.longitude})})
    this.fetchAppointments();
    window.setInterval(()=> this.fetchAppointments(),1000)
  }
  fetchAppointments() {
    axios.get(`${APPOINTMENT_URL}/${this.props.match.params.event}.json`)
    .then(res => {
      this.setState({time: res.data.time.substr(11,8), title: res.data.title, description: res.data.description, date: res.data.date, timeTo: res.data.timeTo.substr(11,8), aside: res.data.aside, asideTo: res.data.asideTo, lat: res.data.latitude, lng: res.data.longitude, notes: res.data.notes, appointment_id: res.data.id, address: res.data.address});
      this.getWeather()
    })
    .catch(error => console.warn(error));
  }
  getWeather = () => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.lng}&APPID=44c4ec8bdab3135de4699fa100275470`)
    .then(res => {
      this.setState({weatherPlace: res.data.name, weatherTemp: Math.round(res.data.main.temp-273.15), weatherDesc: res.data.weather[0].description, weatherMain: res.data.weather[0].main})
    })
    .catch(console.warn())
  }
  handleSubmit = (message) => {
    axios.post(NOTES_URL, {message: message, appointment_id: this.state.appointment_id})
    .then(res => {
      this.setState({notes:[...this.state.notes, res.data]})
    })
    .catch(console.warn)
  }
  deleteNote = (x) => {
    axios.delete(`${NOTES_URL}/${x.id}`)
    .then(console.log("success"))
    .catch(console.warn())
  }
  render(){
    return(
        <div id="infoContainer">
          <div id="details">
            <div>
              <span className="label">Title:</span>
              <span className="value">{this.state.title}</span>
            </div>
            <div>
              <span className="label">Description:</span>
              <span className="value">{this.state.description}</span>
            </div>
            <div>
              <span className="label">Time:</span>
              <span className="value">{this.state.time} {this.state.aside}</span>
            </div>
            <div>
              <span className="label">Time To:</span>
              <span className="value">{this.state.timeTo} {this.state.asideTo}</span>
            </div>
            <div>
              <span className="label">Date:</span>
              <span className="value">{this.state.date}</span>
            </div>
            <div>
              <span className="label">Weather in</span>
              <span className="value">{this.state.weatherPlace}: {this.state.weatherTemp}°C with {this.state.weatherMain}</span>
            </div>
            <div>
              <span className="label">Address:</span>
              <span className="value">{this.state.address}</span>
            </div>
            <div id="notesContainer">
                <h1>Leave your notes here:</h1>
                <NoteSubmit onSubmit={this.handleSubmit}>
                </NoteSubmit>
                <br/>
                <div id="notes">
                  {this.state.notes.map(x => <div key={x.id}>{x.message} <span onClick={() => this.deleteNote(x)}>X</span></div>)}
                </div>
              </div>
        {
          this.state.lng !== '' && <ShowMap lat={this.state.lat} lng={this.state.lng} title={this.state.title} time={this.state.time}></ShowMap>
        }
      </div>
    </div>
    )
  }
}

export default ShowEvent
