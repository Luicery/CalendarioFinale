import React from "react"
import axios from "axios"
const APPOINTMENT_URL = `https://calendarprojectrails.herokuapp.com/appointments`
const USER_URL = `https://calendarprojectrails.herokuapp.com/profile`
class CreateAppointment extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      time: "",
      timeTo: "",
      aside: "",
      asideTo: "",
      address: "",
      date: "",
      user_id: 0
    };
  }
  componentDidMount() {
    const {match: {params: {day, month, year}}} = this.props;
    this.setState({date: `${year}-${month}-${day}`})
    axios.get(USER_URL, { params:{}, headers: { 'Authorization': localStorage.jwt } })
    .then(res => {
      this.setState({user_id: res.data.id});
    })
    .catch(error => console.warn(error));
  }
  saveAppointment = () => {
    console.log(this.state.user_id);
    axios.post(APPOINTMENT_URL,{title: this.state.title, description:this.state.description, address:this.state.address, date:this.state.date, time:this.state.time, timeTo:this.state.timeTo, aside:this.state.aside, asideTo:this.state.asideTo, user_id:this.state.user_id})
    .then(res => {
      return res
    })
  }
  handleChange = (event) => {
    if(event.target.name === "time") {
      console.log(event.target.value);
      if(parseInt(event.target.value.substr(0,2)) > 12) {
        console.log(event.target.value);
        this.setState({time: event.target.value, aside: "pm"})
      } else {
        this.setState({time: event.target.value, aside:"am"})
      }
    } else if(event.target.name === "timeTo") {
      if(parseInt(event.target.value.substr(0,2)) > 12) {
        this.setState({timeTo: event.target.value, asideTo: "pm"})
      } else {
        this.setState({timeTo: event.target.value, asideTo:"am"})
      }
    } else{
      this.setState({ [event.target.name]: event.target.value });
    }
  }
  handleSubmit = (event) => {
    this.saveAppointment();
    this.goBack()
    event.preventDefault();
  }
  goBack = () => {
    const {match: {params: {day, month, year}}} = this.props;
    this.props.history.push(`/calendar/${day}/${month}/${year}/`)
  }
  render(){
    return(
      <div>
        <div id="back" onClick = {this.goBack}><span id="arrow">&larr; Go Back</span></div>
        <div id="form">
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" placeholder="Title" onChange={this.handleChange}></input><br/>
          <input type="text" name="description" placeholder="Description" onChange={this.handleChange}></input><br/>
          <input type="text" name="address" placeholder="Address" onChange={this.handleChange}></input><br/>
          <input id="time" type="time" name="time" placeholder="Time" onChange={this.handleChange}></input><br/>
          <input id="timeTo" type="time" name="timeTo" placeholder="TimeTo" onChange={this.handleChange}></input><br/>
          <input id="submit" type="submit" name="submit" onSubmit={this.handleSubmit} value="Submit"></input>
        </form>
        </div>
      </div>
    );
  }
}
export default CreateAppointment;
