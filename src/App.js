import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

const axios = require('axios');

class Pun extends Component {
  render() {
    return (
      <div className="Pun">
        <p>
          {this.props.pun}
        </p>
      </div>
    )
  }
}

class Loader extends Component {
  render () {
    return (
      <div className="loader">
        Loading{this.props.dots}
      </div>
    )
  }
}

class PunList extends Component {
  render() {
    return (
      <div>
        {this.props.items.map(item => (
          <div key={item}><Pun pun={item} /></div>
        ))}
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {items: [], text: '', loading: false};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        </header>
        <Card className="main-card">
        <CardMedia
          className="card-media"
          image="punch_slider.jpg"
        />
        <Typography variant="headline" component="h3" className="tagline">
            Bringing you the tastiest in musical puns.
        </Typography>
        <br></br>
        <form onSubmit={this.handleSubmit}>
        <TextField
          id="name"
          label="Enter Your Favorite Band"
          className="textField"
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          margin="normal"
          fullWidth
        />
          <Button variant="contained" color="primary" type="submit" onSubmit={this.handleSubmit}>
            Pun-ch it up!
          </Button>
        </form>
        </Card>
        <br></br>
        <br></br>        
        {this.state.loading?  (
          <CircularProgress />
          ) : (
          <PunList items={this.state.items} />
          )
        }
      </div>
    );
  }

  handleChange(e) {
    this.setState({text: e.target.value})
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState(prevState => ({
      loading: true
    }));
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };
    axios
    .get(`https://oxc9d8m9ck.execute-api.us-west-2.amazonaws.com/prod/food-rhymes?band=${newItem.text}`)
    .then(res => {
      this.setState(prevState => ({
        items: res.data,
        loading: false
      }));
    })      
  }
}


export default App;

