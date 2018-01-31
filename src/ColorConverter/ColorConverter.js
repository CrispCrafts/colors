import React, { Component } from 'react';
import './ColorConverter.css';
import { validateHexColor, validateRgbColor, hexToRgb, rgbToHex, rgbToString, hexToString } from '../core/index';

class ColorConverter extends Component {
    constructor(props) {
        super(props);
        this.handleHEXChange = this.handleHEXChange.bind(this);
        this.handleRGBChange = this.handleRGBChange.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.state = {
            showMore: false
        };
    }

    handleFocus(e){
        console.log('focused');
        e.preventDefault();
        this.props.onFocus(true);
    }

    handleBlur() {
        console.log('NOT focused');
        this.props.onFocus(false);
    }

    handleHEXChange(event) {
        var val = event.target.value;
        var valid = validateHexColor(val);
        this.props.onHexChange(val, valid)
    }

    handleRGBChange(event) {
        var val = event.target.value;
        var valid = validateRgbColor(val);
        this.props.onRgbChange(val, valid);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.validRgb !== this.props.validRgb ||
            prevProps.validHex !== this.props.validHex ||
            prevProps.rgb !== this.props.rgb ||
            prevProps.hex !== this.props.hex) {
            this.onValidColorChange();
        }
    }

    onValidColorChange(color) {
        if(this.props.validRgb) {
            var h = rgbToHex(this.props.rgb);
            this.props.onColorChanged({hex: h, rgb: this.props.rgb });
        } else if (this.props.validHex) {
            var rgbString = rgbToString(hexToRgb(this.props.hex));
            this.props.onColorChanged({hex: hexToString(this.props.hex), rgb: rgbString});
        } else {
            this.props.onColorChanged();
        }
    }

    render () {
        return(
            <div className="container">
                <input
                    spellCheck="false"
                    type="text"
                    placeholder="#HEX"
                    value={this.props.hex}
                    onChange={this.handleHEXChange}
                    onClick={this.props.onClick}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}/>
                <input
                    spellCheck="false"
                    type="text"
                    placeholder="(R,G,B)"
                    value={this.props.rgb}
                    onClick={this.props.onClick}
                    onChange={this.handleRGBChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}/>
                {
                    this.state.showMore &&
                    <div
                        className="container" 
                        onClick={(e) => {    
                            e.preventDefault();
                            e.stopPropagation();
                        }}>
                        <input
                            disabled
                            spellCheck="false"
                            type="text"
                            placeholder="(C,M,Y,K)"
                            value={this.props.cmyk}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}/>
                        <input
                            disabled
                            spellCheck="false"
                            type="text"
                            placeholder="(H°,S%,V%)"
                            value={this.props.hsv}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}/>
                        <input
                            disabled
                            spellCheck="false"
                            type="text"
                            placeholder="(H°,S%,L%)"
                            value={this.props.hsl}
                            onFocus={this.handleFocus}
                            onBlur={this.handleBlur}/>
                    </div>
                }
                <div
                    className="more"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.setState({
                            showMore: !this.state.showMore
                        });
                    }}>
                    <span className="moreText">Show {this.state.showMore ? 'Less' : 'More'}</span>
                    <i className="material-icons">{this.state.showMore ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</i>
                </div>
            </div>
        );
    }
}

export default ColorConverter;