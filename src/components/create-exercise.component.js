import React, { Component } from 'react';
import axios from 'axios';  // front end sends https requests on server backend using this library
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

export default class CreateExercise extends Component {
  // Constructor
  constructor(props) {
    super(props);   // in JS we always need to call super when we define contructor of subclass

    // bindind "this" to each of the methods, which (this) we are going to use later in this file
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    // define state of component with propertirs correspond of the MongoDB document
    // state is, how we create variables in react
    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []   // for drop down menue of users in DB
    }
  }

  // componentDidMount is a react lifecycle method (through these methods react can call at different points)
  // this method will calls right before any thing diplays on page 
  componentDidMount() {

    // this.setState({
    //   uasers: ['test user'],
    //   username: 'test username'
    // })

      axios.get('http://localhost:5000/users/')
        .then(response => {
          if (response.data.length > 0)   // if there is atleast one user in DB
          {
            this.setState({
              users: response.data.map(user => user.username),  // .map() allows us to return something (here username) for each element in array
              username: response.data[0].username   // username is set to the 1st user in DB
            })
          }
        })
        .catch((error) => {
          console.log(error); 
        })
  }

  onChangeUsername(e)   // e is the target value, where target is text box 
  {
    this.setState({   // alwasys use set state property instead of directly updating username
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  onSubmit(e)   // funcion to handle submit event on the form
  {
    e.preventDefault(); // prevent default HTML submit bahaviour

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    // this will go to "D:\MERN_Stack\mern-exercise-tracker\backend\routes\exercise.js" at line # 11 (check exercise.js at line # 11)
    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));  // JSON exercise added (from \backend\routes\exercise.js Line # 26), will show up here

    window.location = '/';  // go back to list of exercises     
  }

  render() {
    return (
    <div>
      <h3>Create New Exercise Log</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>
          <select ref="userInput" // drop down of users
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
              {
                this.state.users.map(function(user)   
                {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }
          </select>
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>
        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}