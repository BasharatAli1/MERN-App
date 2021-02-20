import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';  // React doesn't prescribe a specific approach to data fetching, but people commonly use either a library like axios or the fetch() API provided by the browser

// there are two types of components in this file 1) Exercise and 2) ExercisesList  

const Exercise = props => ( // implementes as functional react component  (lack of state and lifecycle methods) (we use a functional component to accept props and return JSX)
 // in Line # 15, we have a Link, we are using link from reat-router-dom which create a URL which is going to load another component
 <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
<Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) /* see below deleteExercise() method */}}>delete</a>
    </td>
  </tr>
)

export default class ExercisesList extends Component { // implementes as class component
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    this.state = {exercises: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      // if id of exercise in this exercise array, is not equal to the "id" (which we deleted above), will pass back to array
      // ID in MongoDb is bydefault _id
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }
// for every element (currentExercise), .map is going to return something (a row of table)
  exerciseList() {
    return this.state.exercises.map(currentexercise => { /* these are three pops below */
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  // Line # 59, "thead-light" is styling from BS
  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light"> 
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.exerciseList() /* here body calls exerciseList() method (written above)*/ }
          </tbody>
        </table>
      </div>
    )
  }
}