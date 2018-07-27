import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom'
const axios = require('axios');

class Pun extends Component {
  render() {
    return (
      <div className="Pun">
          {this.props.pun}
      </div>
    )
  }
}

class PunList extends Component {
  render() {
    return (
      <Card className="pun-list" style={{backgroundColor: "#ccaacc"}}>
        <Typography variant="title" component="h3" className="pun-type">
            {this.props.punType}
          <Tooltip title={this.props.punType} placement="right" style={{overflow: "unset"}} TransitionComponent={Zoom}>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Typography>
        {this.props.puns.map(item => (
          <Typography variant="body2" key={item}><Pun pun={item} /></Typography>
        ))}
      </Card>
      )
  }
}

class Results extends Component {
  render() {
    return (
      <div>
      {!this.props.homophonic.length && !this.props.compound.length && !this.props.loaded ? (
        <h4 className="help-text">
          Sorry, we couldn't find any tasty puns. Please try another selection.
        </h4>
        ):(
        <div>
          {!this.props.loaded ? (
          <Card className="results-card" style={{backgroundColor: "#bbbbbb"}}>
            <Typography variant="headline" component="h3" className="results">
                Try one of these tasty puns:
            </Typography>
            <PunList puns={this.props.homophonic} punType="Homophonic" />
            <PunList puns={this.props.compound} punType="Compound" />
          </Card>
            ):(
            <div/>
            )}
        </div>        
        )
      }
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {homophonic: [], compound: [], text: '', loading: false, firstLoad: true};
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
        <br/>
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
          <Button variant="contained" style={{backgroundColor: "#ccaacc"}} type="submit" onSubmit={this.handleSubmit}>
            Pun-ch it up!
          </Button>
        </form>
        </Card>
        {this.state.loading?  (
          <CircularProgress className="loader"/>
          ) : (
            <Results homophonic={this.state.homophonic} compound={this.state.compound} loaded={this.state.firstLoad} />
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
      loading: true,
      firstLoad: false
    }));
    if (!this.state.text.length) {
      this.setState(prevState => ({
        items: [],
        loading: false
      }));
      return;
    }
    axios
    .get(`https://oxc9d8m9ck.execute-api.us-west-2.amazonaws.com/dev/food-rhymes?band=${this.state.text}`)
    .then(res => {
      this.setState(prevState => ({
        homophonic: res.data.homophonic,
        compound: res.data.compound,
        loading: false
      }));
    })      
  }
}


export default App;

