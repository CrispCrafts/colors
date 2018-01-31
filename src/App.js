import React, { Component } from 'react';
import './App.css';
import ColorConverter from './ColorConverter/ColorConverter';
import AppToolbar from './AppToolbar/AppToolbar';
import AppFooter from './AppFooter/AppFooter';
import { getAlpha, getTextColor, hexToString, randColor, rgbToString, hexToRgb, rgbToHex, rgbToHsl, rgbToHsv, rgbToCmyk } from './core/index';
import { isMobile } from './core/utils';
import Nav from './Nav/Nav';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '',
      hexValue: '',
      rgbValue: '',
      hslValue: '',
      hsvValue: '',
      cmykValue: '',
      spaceEventFired: false,
      defaultColor: '#E53935',
      textColor: getTextColor('#E53935'),
      isMobile: isMobile(),
      animationSpeed: '300ms',
      firstTap: false,
      messageOp: 0,
      notFocused: true
    };
  }

  componentWillMount() {
    window.addEventListener('keydown', (e) => {
      switch(e.which) {
        case 32:
          if(this.state.notFocused && !this.state.spaceEventFired) {
            var temp = randColor();
            this.setState({
              spaceEventFired: true,
              color: temp,
              hexValue: temp,
              rgbValue: rgbToString(hexToRgb(temp)),
              textColor: getTextColor(temp),
              validHex: true,
              validRgb: true,
            });
          }
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch(e.which) {
        case 32:
          this.setState({
            spaceEventFired: false
          });
          break;
      }
    });

    setTimeout(() => {
      this.setState({
        messageOp: 1
      });
    }, 1000);
  }

  render() {
    return (
      <div
        className="app-background"
        style={{
          color: this.state.textColor,
          transition: `color ${this.state.animationSpeed * 2} ease-in`
        }}>
        <div
          className="app-container"
          onClick={(e) => {
            if(this.state.isMobile) {
              if(this.state.notFocused && !this.state.firstTap) {
                var temp = randColor();
                this.setState({
                  firstTap: false,
                  color: temp,
                  hexValue: temp,
                  rgbValue: rgbToString(hexToRgb(temp)),
                  textColor: getTextColor(temp),
                  validHex: true,
                  validRgb: true,
                });
              } else {
                this.setState({
                  firstTap: false
                });
              }
            }
          }}
          style={{
            backgroundColor: this.state.color || this.state.defaultColor,
            transition: `background ${this.state.animationSpeed} ease-out`
          }}
        >
          <AppToolbar title="Color" />
          <Nav />
          <div className="app-content">
            <ColorConverter
              hex={this.state.hexValue}
              rgb={this.state.rgbValue}
              hsl={this.state.hslValue}
              hsv={this.state.hsvValue}
              cmyk={this.state.cmykValue}
              validRgb={this.state.validRgb}
              validHex={this.state.validHex}
              onClick={(e) => {
                if(this.state.isMobile) {
                  e.preventDefault();
                  e.stopPropagation();
                  this.setState({
                    firstTap: true
                  });
                }
              }}
              onHexChange={(c, valid) => {
                this.setState({
                  hexValue: c,
                  rgbValue: '',
                  hslValue: '',
                  hsvValue: '',
                  cmykValue: '',
                  validHex: valid,
                  validRgb: false
                });
              }}
              onRgbChange={(c, valid) => {
                this.setState({
                  rgbValue: c,
                  hexValue: '',
                  hslValue: '',
                  hsvValue: '',
                  cmykValue: '',
                  validRgb: valid,
                  validHex: false
                });
              }}
              onFocus={(focused) => {
                this.setState({
                  notFocused: !focused
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
                  hslValue: rgbToHsl(hexToRgb(c.hex)),
                  hsvValue: rgbToHsv(hexToRgb(c.hex)),
                  cmykValue: rgbToCmyk(hexToRgb(c.hex)),
                  textColor: getTextColor(c.hex),
                });
              }}
            />
            <div className="app-message" style={{opacity: this.state.notFocused ? this.state.messageOp : 0, transition: `all ${this.state.animationSpeed} ease-out`}}>
              {this.state.isMobile ? 'Tap the screen' : 'Press the Space Bar'}
            </div>
          </div>
          <AppFooter /> 
        </div>
      </div>
    );
  }
}

export default App;
