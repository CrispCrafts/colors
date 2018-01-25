import React, { Component } from 'react';
import './App.css';
import ColorConverter from './ColorConverter/ColorConverter';
import AppToolbar from './AppToolbar/AppToolbar';
import AppFooter from './AppFooter/AppFooter';
import { getTextColor, hexToString, randColor, rgbToString, hexToRgb, rgbToHex } from './core/index';
import Nav from './Nav/Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      hexValue: '',
      rgbValue: '',
      defaultColor: '#E53935',
      textColor: getTextColor('#E53935'),
      animationSpeed: '100ms'
    };
  }

  componentWillMount() {
    window.addEventListener('keydown', (e) => {
      switch(e.which) {
        case 32:
          var temp = randColor();
          this.setState({
            color: temp,
            hexValue: temp,
            rgbValue: rgbToString(hexToRgb(temp)),
            textColor: getTextColor(temp),
            validHex: true,
            validRgb: true,
          });
          break;
      }
    });
  }

  render() {
    return (
      <div className="App" style={{ color: this.state.textColor }}>
        <div className="app-container" style={{ backgroundColor: this.state.color || this.state.defaultColor, transition: `all ${this.state.animationSpeed} ease-out` }}>
          <AppToolbar title="Color"/>
          <Nav />
          <ColorConverter
            hex={this.state.hexValue}
            rgb={this.state.rgbValue}
            validRgb={this.state.validRgb}
            validHex={this.state.validHex}
            onHexChange={(c, valid) => {
              this.setState({
                hexValue: c,
                rgbValue: '',
                validHex: valid,
                validRgb: false
              });
            }}
            onRgbChange={(c, valid) => {
              this.setState({
                rgbValue: c,
                hexValue: '',
                validRgb: valid,
                validHex: false
              });
            }}
            onColorChanged={(c) => {
              if(!c) {
                this.setState({
                  color: this.state.defaultColor,
                  textColor: getTextColor(this.state.defaultColor)
                });
                return;
              }
              this.setState({
                color: hexToString(c.hex),
                hexValue: hexToString(c.hex),
                rgbValue: rgbToString(hexToRgb(c.hex)),
                textColor: getTextColor(c.hex)
              });
            }}
          />
          <div style={{marginTop: '40px'}}>Press the space bar if you're feeling lucky</div>
          <AppFooter /> 
        </div>
      </div>
    );
  }
}

export default App;
