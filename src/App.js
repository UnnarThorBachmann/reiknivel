import React, { Component } from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {lightGreen700,lightGreen100,lightGreen50,amber800} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import FlatButton from 'material-ui/FlatButton';
import VStepper from './components/stepper.js';

//const img = 'images/pollution.jpg'
const img = require(`./images/pollution2.jpg`)


const muiTheme = getMuiTheme({
 
  appBar: {
    height: 60,
    color: '#000000',
    textColor: amber800
  },
  
  floatingActionButton:   {
    backgroundColor: '#000000',
    color: '#000000'
  },
  
  stepper: {
     iconColor: '#000000',
     hoveredIconColor: '#000000',
      inactiveIconColor: '#000000',
  },
  flatButton: {
    color: '#000000'
  },
  raisedButton: {
    style: 'default'
  }
});

const styles = {
  main: {
    marginLeft: '20%',
    marginRight: '1%',
    marginTop: '1%',
    borderStyle: 'solid',
    paddingTop: '1%',
    paddingBottom: '1%',
    borderWidth: '1px',
    borderRadius: '10px',
    width: '60%',   
    height: '600px',
    backgroundColor: amber800
  }
};




class App extends Component {
  
  
  render() {
    return (
      <div style={{backgroundImage: `url(${img})`,backgroundRepeat  : 'repeat', backgroundPosition: 'left',height: '100vh'}}>
      <MuiThemeProvider muiTheme={muiTheme}>
      <div>
      <AppBar
          title="Vistspor"
          iconElementLeft={<IconButton></IconButton>}
        />
        <div style={styles.main}>
        <VStepper/>
        </div>
      </div>
      </MuiThemeProvider>
      </div>
    );
  }
}

export default App;