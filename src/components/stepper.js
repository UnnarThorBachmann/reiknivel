import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import {lightGreen700,lightGreen100,lightGreen50,amber800} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';

import IconButton from 'material-ui/IconButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

let litrar = [];
for (let i = 1; i < 30; i++)
  litrar.push(i);
let km = []

class VStepper extends React.Component {

  state = {
    finished: false,
    stepIndex: 0,
    biltegund: 1,
    litrar: "0",
    km: "0",
    disabled: false,
    flugvegalengd: '0',
    flugferdir: [],
    kmStraeto: "0"
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };
  changeCar = (event, index, value)=>{
    this.setState({biltegund: value})
  }
  changeLitrar=(event)=> {
    const {value} = event.target;
    const {km} = this.state;
    const disabledKM = (isNaN(km.replace(',','.')) || km.trim() === '')? true:false;
    const disabledLitrar = (isNaN(value.toString().replace(',','.')) || value.toString().trim() === '')? true:false;
    this.setState({
      litrar: value,
      disabled: disabledKM || disabledLitrar
    });
  }
  changeKm = (event) => {
    const {value} = event.target;
    const {litrar} = this.state;
    const disabledKM = (isNaN(value.replace(',','.')) || value.trim() === '')? true:false;
    const disabledLitrar = (isNaN(litrar.toString().replace(',','.')) || litrar.toString().trim() === '')? true:false;
    this.setState({
      km: value,
      disabled: disabledKM || disabledLitrar
    });
  };
 
  changeFlugvegalengd = (event) => {
    const {value} = event.target;
    const disabledFlugvegalengd = (isNaN(value.toString().replace(',','.')) || value.toString().trim() === '')? true:false;
    this.setState({
      flugvegalengd: value,
      disabled: disabledFlugvegalengd
    });
  };
  changeKmStraeto = (event) =>{
    const {value} = event.target;
    const disabledStraeto = (isNaN(value.toString().replace(',','.')) || value.toString().trim() === '')? true:false;
    this.setState({
      kmStraeto: value,
      disabled: disabledStraeto
    });
  }
  add = () => {
    this.setState((state)=> {
      return state.flugferdir.push(state.flugvegalengd);
    })
  }
  renderStepActions(step) {
    const {stepIndex} = this.state;
    console.log(this.state);
    return (
      <div style={{margin: '12px 0'}}>
        <RaisedButton
          label={stepIndex === 2 ? 'Enda' : 'Næsti'}
          disableTouchRipple={true}
          disableFocusRipple={true}
          backgroundColor={'#000000'}
          disabled={this.state.disabled}
          onClick={this.handleNext}
          labelStyle={{color: amber800}}
          style={{marginRight: 12}}
        />
        {step > 0 && (
          <RaisedButton
            label="Aftur"
            disabled={stepIndex === 0}
            disableTouchRipple={true}
            disableFocusRipple={true}
            onClick={this.handlePrev}
            backgroundColor={'#000000'}
            disabled={this.state.disabled}
            labelStyle={{color: amber800}}
          />
        )}
      </div>
    );
  }

  render() {
    const {finished, stepIndex} = this.state;

    return (
      <div>
      <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation="vertical">
          <Step>
            <StepLabel>Bílferðir</StepLabel>
            <StepContent>
              <SelectField
                value={this.state.biltegund}
                onChange={this.changeCar}
                floatingLabelStyle={{color: amber800}}
                underlineFocusStyle={{borderColor: amber800}}
                selectedMenuItemStyle={{color: amber800}}
              >
                <MenuItem value={1} primaryText="Bensínbíll" />
                <MenuItem value={2} primaryText="Díselbíll" />
              </SelectField>
              <TextField
                floatingLabelText="Kílómetrar eknir á viku"
                labelText = "Kílómetrar eknir á viku"
                floatingLabelStyle={{color: "#000000"}}
                value={this.state.km}
                onChange={this.changeKm}
                floatingLabelStyle={{color: '#000000'}}
                floatingLabelFixed={true}

                underlineFocusStyle={{borderColor: '#000000'}}
              />
              <TextField
                floatingLabelText="Eyðsla í lítrum á 100 km"
                floatingLabelStyle={{color: "#000000"}}
                value={this.state.litrar}
                onChange={this.changeLitrar}
                floatingLabelStyle={{color:'#000000'}}
                underlineFocusStyle={{borderColor: '#000000'}}
              />
              {this.renderStepActions(0)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>{`Flugferðir (${this.state.flugferdir.length})`}</StepLabel>
            <StepContent>
              
              <TextField
                floatingLabelText="Lengd ferðalags (km)"
                floatingLabelStyle={{color: "#000000"}}
                value={this.state.flugvegalengd}
                onChange={this.changeFlugvegalengd}
                floatingLabelStyle={{color: '#000000'}}
                underlineFocusStyle={{borderColor: '#000000'}}
              />
              <IconButton  
                style={{marginLeft: '75%',marginRight: 30,marginTop: 5, marginBottom: 5}} 
                onClick={this.add}
              >
                <ContentAdd/>
              </IconButton>
              <IconButton  
                style={{marginLeft: '75%',marginRight: 30,marginTop: 5, marginBottom: 5}} 
                onClick={this.add}
              >
                <Remove/>
              </IconButton>
              {this.renderStepActions(1)}
            </StepContent>
          </Step>
          <Step>
            <StepLabel>Strætóferðir</StepLabel>
            <StepContent>
              <TextField
                floatingLabelText="Kílómetrar á viku"
                floatingLabelStyle={{color: "#000000"}}
                value={this.state.kmStraeto}
                onChange={this.changeKmStraeto}
                floatingLabelStyle={{color: '#000000'}}
                underlineFocusStyle={{borderColor: '#000000'}}
              />
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
          <div>
            <a
              href="#"
              onClick={(event) => {
                event.preventDefault();
                this.setState({stepIndex: 0, finished: false});
              }}
            >
              smella
            </a> <span>Endurtaka</span>
             
            </div>
        )}

      </div>
      {finished && 
        <div>
       

        <table>
          <tr>
            <th>Samgöngumáti</th>
            <th>Koldíoxíð (kg) á hvern km</th>
          </tr>
          <tr>
            <th>Strætó</th>
            <td>0,056</td>
          </tr>
          <tr>
            <th>Bílar</th>
            <th>Koldíoxíð (kg) á hvern lítra</th>
          </tr>
          <tr>
            <td>Bensínbíll</td>
            <td>2,35</td>
          </tr>
          <tr selectable={false}>
            <td>Díselbíll</td>
            <td>2,73</td>
          </tr>
          <tr>
            <th>Flug</th>
            <th>Koldíoxíð (kg) á hvern km</th>
          </tr>
          <tr>
            <td>U.þ.b. 250 km</td>
            <td>0,154</td>
          </tr>
          <tr selectable={false}>
            <td>u.þ.b. 500 km</td>
            <td>0,174</td>
          </tr>
          <tr selectable={false}>
            <td>U.þ.b 750 km</td>
            <td>0,191</td>
          </tr>
          <tr selectable={false}>
            <td>Lengra en 1000 km</td>
            <td>0,280</td>
          </tr>
        </table>
       
        </div>
      }
      </div>
    );
  }
}

export default VStepper;