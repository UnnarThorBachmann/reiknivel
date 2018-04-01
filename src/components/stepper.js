import React from 'react';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import {amber800, red500,blue500,green500} from 'material-ui/styles/colors';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';

import IconButton from 'material-ui/IconButton';
import {Pie} from 'react-chartjs-2';
import Endurtaka from 'material-ui/svg-icons/action/autorenew';


let litrar = [];
for (let i = 1; i < 30; i++)
  litrar.push(i);

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
    kmStraeto: "0",
    
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

  delete = () => {
    this.setState((state)=> {
      
      return state.flugferdir.splice(-1,1);
    })
  }
  renderStepActions(step) {
    const {stepIndex} = this.state;
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
    const {finished, stepIndex,kmStraeto,km,litrar,flugferdir,biltegund} = this.state;
    console.log(this.state);

    const straetoKg = parseFloat(kmStraeto)*0.056*52;
    const billKg = (biltegund === 1)?parseFloat(km)*parseFloat(litrar)/100*2.35*52: parseFloat(km)*parseFloat(litrar)/100*2.73*52;
    let flugKg = flugferdir.reduce(function(p,c) {
      const kmflug = parseFloat(c);
      console.log(kmflug);
      if (kmflug <= 250)
        return p + kmflug*0.154;
      else if (kmflug <= 500)
        return p + kmflug*0.174;
      else if (kmflug <= 750)
        return p + kmflug*0.191;
      else
        return p + kmflug*0.280;
    },0)

    return (
      <div>
      <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
        <Stepper activeStep={stepIndex} orientation="vertical" style={{color: '#FFF000'}} disabled={true}>
          <Step >
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
                floatingLabelStyle={{color: "#000000"}}
                value={this.state.km}
                onChange={this.changeKm}
                floatingLabelFixed={true}

                underlineFocusStyle={{borderColor: '#000000'}}
              />
              <TextField
                floatingLabelText="Eyðsla í lítrum á 100 km"
                floatingLabelStyle={{color: "#000000"}}
                value={this.state.litrar}
                onChange={this.changeLitrar}
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
                underlineFocusStyle={{borderColor: '#000000'}}
              />
              <div style={{display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'space-around', paddingRight: '30px'}}>
                
                <div>
                <IconButton  
                  onClick={this.delete}
                >
                  <Remove/>
                </IconButton>
                </div>
                <div>
                  <IconButton  
                    onClick={this.add}
                  >
                    <ContentAdd/>
                  </IconButton>
                </div>
              </div>
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
                underlineFocusStyle={{borderColor: '#000000'}}
              />
              {this.renderStepActions(2)}
            </StepContent>
          </Step>
        </Stepper>
        {finished && (
            <div>
              <IconButton
                iconStyle={{color: '#000000'}}
                onClick={(event)=>{
                  event.preventDefault();
                  this.setState({stepIndex: 0, finished: false});
                }}
                tooltip={'Endurtaka'}
              >
                <Endurtaka/>
              </IconButton>
            </div>
        )}

      </div>
      {finished && 
        <div style={{display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'flex-start', padding: '1%'}}>
        <div style={{width: '50%'}}>
        <h4>Forsendur: </h4>
        <table>
          <tbody>
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
          <tr>
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
          <tr>
            <td>u.þ.b. 500 km</td>
            <td>0,174</td>
          </tr>
          <tr>
            <td>U.þ.b 750 km</td>
            <td>0,191</td>
          </tr>
          <tr>
            <td>Lengra en 1000 km</td>
            <td>0,280</td>
          </tr>
        </tbody>
        </table>
       
        </div>
        <div style={{width: '40%'}}>
          <h4>{`Ársneysla ${(billKg + straetoKg + flugKg).toFixed(1).toString().replace('.',',')} kg`}</h4>
          <Pie 
                      data={{
                      labels: [ 'Bíll',
                                'Strætó',
                                'Flug',
                              ],
                              datasets: [{
                                  data: [billKg.toFixed(1),
                                          straetoKg.toFixed(1),
                                          flugKg.toFixed(1)
                                  ],
                                  backgroundColor: [
                                    red500,
                                    blue500,
                                    green500,
                                  ],
                                  hoverBackgroundColor: [
                                    red500,
                                    blue500,
                                    green500,
                                    
                                  ]
                                }]

                      }

                      } 
                      width={0.8}
                      height={0.8}
                      options={{
                        maintainAspectRatio: false
                      }}
                    />
        </div>
        </div>
      }
      </div>
    );
  }
}

export default VStepper;