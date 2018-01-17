import React, { Component } from 'react';
import './App.css';
import ListContainer from './ListContainer';
import MainContent from './MainContent';


class App extends Component {
  constructor() {
    super();

    this.state = {
      notes: [],
      currentNote: {}
    }
  }

  componentDidMount() {
    this.getNotes()
  }

  getNotes = () => {
    let newJson

    fetch('http://localhost:3000/api/v1/notes')
      .then(resp => resp.json())
      .then(json => {
        newJson = json.sort(function(a, b){
            let timeA=a.updated_at
            let timeB=b.updated_at
            if (timeA > timeB) {
              return -1
            } else if (timeA < timeB) {
              return 1
            } else {
              return 0
            }
        })
          this.setState({
            notes: newJson,
            currentNote: newJson[0]
          });
      });
  }

  newNote = e => {
    let data = {
      title: 'Title',
      body: ''
    }

    fetch('http://localhost:3000/api/v1/notes', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    }).then(resp => resp.json())
    .then(() => this.getNotes())
  }

  handleClickCard = (thisNote, e) => {
    console.log(thisNote);
    if (e.target.className.includes("glyph")) {
      console.log('delete');
      fetch(`http://localhost:3000/api/v1/notes/${thisNote.id}`, {
        method: 'DELETE'
      }).then(() => this.getNotes())
    } else {
      console.log('select');
      this.setState({
        currentNote: thisNote
      })
    }
  }

  handleChange = (e) => {
    if (e.target.name === 'title') {
      this.setState({
        currentNote: {
          ...this.state.currentNote,
          title: e.target.value
        }
      });
    }

    if (e.target.name === 'body') {
      this.setState({
        currentNote: {
          ...this.state.currentNote,
          body: e.target.value
        }
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    let data = this.state.currentNote

    console.log('currentNote', this.state.currentNote);
    fetch(`http://localhost:3000/api/v1/notes/${this.state.currentNote.id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(() => this.getNotes())
  }



  render() {
    console.log("App State", this.state);
    return (
      <div className="App">
        <div className="nav navbar-default">
          <div className="container">
            <h1>ForeverNote</h1>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <ListContainer
              notes={this.state.notes} clickCard={this.handleClickCard}
              currentNote={this.state.currentNote}
              clickNew={this.newNote}
            />
            <MainContent
              currentNote={this.state.currentNote}
              handleSubmit={this.handleSubmit}
              handleChange={this.handleChange}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
