import React, { Component } from 'react';
import './ColorConverter.css';
import { validateHexColor, validateRgbColor, hexToRgb, rgbToHex, rgbToString, hexToString } from '../core/index';

class ColorConverter extends Component {
    constructor(props) {
        super(props);
        this.handleHEXChange = this.handleHEXChange.bind(this);
        this.handleRGBChange = this.handleRGBChange.bind(this);
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
                    onChange={this.handleHEXChange} />
                <input
                    spellCheck="false"
                    type="text"
                    placeholder="(R,G,B)"
                    value={this.props.rgb}
                    onChange={this.handleRGBChange} />
            </div>
        );
    }
}

export default ColorConverter;