import React, { Component, useState } from 'react';
import Radium, { StyleRoot } from "radium";
import './App.css';
import Person from './Person/Person';

/*
// React hooks
const App = (props) => {

    const [personsState, setPersonsState] = useState({
        persons: [
            { name: "Max", age: 28 },
            { name: "Manu", age: 29 },
            { name: "Stephanie", age: 26 },
        ],
    });

    const [otherState, setOtherState] = useState("some other value");

    const switchNameHandler = (newName) => {
        setPersonsState({
            persons: [
                { name: newName, age: 28 },
                { name: "Manu", age: 29 },
                { name: "Stephanie", age: 27 },
            ],
        })
    };

    return (
      <div className="App">
        <h1> Hi, I'm a React app </h1>
        <p> This is really working!</p>
        {/!*Inefficient*!/}
        <button onClick={() => switchNameHandler("Maximilian!!")}>Switch Name</button>

        <Person
          name={personsState.persons[0].name}
          age={personsState.persons[0].age}/>
        {/!*Efficient*!/}
        <Person
          name={personsState.persons[1].name}
          age={personsState.persons[1].age}
          click={switchNameHandler.bind(this, "Max!")}> My hobbies: Racing</Person>
        <Person
          name={personsState.persons[2].name}
          age={personsState.persons[2].age}/>
      </div>
    );
}*/

class App extends Component{
  state = {
    persons: [
      { id: "1", name: "Max", age: 28 },
      { id: "2", name: "Manu", age: 29 },
      { id: "3", name: "Stephanie", age: 26 },
    ],
    otherState: "some other value",
    showPersons: false,
  };

  deletePersonsHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({
      persons: persons,
    });
  };

  nameChangedHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });

    // Using spread operator (ES6 syntax)
    const person = {
      ...this.state.persons[personIndex],
    };

    // Before ES6
    // const person = Object.assign({}, this.state.persons[personIndex]);

    person.name = event.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons,
    })
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({
      showPersons: !doesShow,
    });
  }

  render() {
    const style = {
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
      ":hover": {
        backgroundColor: "lightgreen",
        color: "black",
      },
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return <Person
              key={person.id}
              name={person.name}
              age={person.age}
              changed={(event) => this.nameChangedHandler(event, person.id)}
              click={() => this.deletePersonsHandler(index)} />
          })}
        </div>
      );

      style.backgroundColor = "red";
      style[":hover"] = {
        backgroundColor: "salmon",
        color: "black",
      };
    }

    const classes = [];

    if (this.state.persons.length <=2) {
      classes.push("red");
    }

    if (this.state.persons.length <=1) {
      classes.push("bold");
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1> Hi, I'm a React app </h1>
          <p className={classes.join(" ")}> This is really working!</p>
          {/*Inefficient*/}
          {/*<button
          style={style}
          onClick={() => this.switchNameHandler("Maximilian!!")}>Switch Name</button>*/}
          <button
            style={style}
            onClick={this.togglePersonsHandler}>Toggle Persons</button>

          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
