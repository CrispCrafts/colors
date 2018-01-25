import randomColor from 'randomcolor';

export function hexToRgb(hex) {
    if(!hex) {
        return '';
    }
    // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")
    var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, function(m, r, g, b) {
        return r + r + g + g + b + b;
    });

    var result = /^#?(([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?)$/gi.exec(hex);
    //console.log(result);
    return result ? {
        r: parseInt(result[2], 16),
        g: parseInt(result[3], 16),
        b: parseInt(result[4], 16),
        a: result[5] ? parseInt(result[5], 16) : null
    } : null;
}

export function rgbToHex(rgb){
    if(!rgb) {
        return '';
    } 
    var hex = /\([\s+]?[\d]{0,3}%?,[\s+]?[\d+]{0,3}%?,[\s+]?[\d+]{0,3}%?[\s+]?(,[\s+]?[\d+]{0,3}%?[\s+]?)?\)$/i.exec(rgb);
    var rgba = false;
    var percentageRegx = /^[\d]{1,3}%$/g;

    var splitRGB = hex[0].replace(/[()\s+]/g, '').split(',').filter(x => x).map((x, indx) => {
        var percentage = x.match(percentageRegx);
        rgba = (indx + 1) > 3;
        if(percentage && percentage.length !== 0) {
            return Math.round((parseInt(percentage) * .01) * 255);
        }
        return parseInt(x);
    });

    //return `${rgba ? 'rgba(' : 'rgb('}${rgb[0]}, ${rgb[1]}, ${rgb[2]}${rgba ? `, ${rgb[3]})`: ')'}`;
    
    var a = (splitRGB && splitRGB.length >= 3) ? "#" +
     ("0" + parseInt(splitRGB[0],10).toString(16)).slice(-2) +
     ("0" + parseInt(splitRGB[1],10).toString(16)).slice(-2) +
     ("0" + parseInt(splitRGB[2],10).toString(16)).slice(-2) +
     `${rgba ? ("0" + parseInt(splitRGB[3],10).toString(16)).slice(-2) : ''}` : '';
     //console.log(a);
     return a;
}

export function rgbToString(rgb) {
    if(!rgb) {
        return '';
    }
    //console.log(rgb);
    var str = rgb.a ? 'rgba(' : 'rgb(';
    var count = 0;
    for (let c in rgb) {
        if(c) {
            str += `${rgb[c]}${(count < (rgb.a ? 3 : 2)) ? ', ': ')'}`;
        }
        count += 1;
        if(count === (rgb.a ? 4 : 3)) {
            break;
        }
    }
    //console.log(str);
    return str;
}

export function hexToString(hex) {
    if(!hex) {
        return '';
    }
    if (!/^#/.test(hex)) {
        return `#${hex}`;
    }
    return hex;
}

function getLuminance(hex) {
    var color = hexToRgb(hex);
    var C = [color.r/255, color.g/255, color.b/255];
    var NC = C.map((c) => {
        if(c <= 0.03928) {
            return (c/12.92);
        }
        return (((c+0.055)/1.055)**2.4);
    });
    return (0.2126 * NC[0] + 0.7152 * NC[1] + 0.0722 * NC[2]);
}

export function getTextColor(hex) {
    //console.log(getLuminance(hex) > 0.179 ? 'TEXT COLOR: BLACK' : 'TEXT COLOR: WHITE');
    return getLuminance(hex) > 0.179 ? '#212121' : '#f1f1f1f1';
}

export function validateHexColor(color) {
    var a = /(^[a-f0-9]{8}$)|(^#[a-f0-9]{8}$)|(^[a-f0-9]{6}$)|(^#[a-f0-9]{6}$)|(^#[a-f0-9]{3}$)|(^[a-f0-9]{3}$)/gi.test(color);
    return a;
}

export function validateRgbColor(color) {
    var a = /(^([rR][gG][bB][aA]?[\s+]?)?\([\s+]?[\d]{1,3}%?,[\s+]?[\d+]{1,3}%?,[\s+]?[\d+]{1,3}%?(,[\s+]?[\d+]{1,3}%?[\s+]?)?\)$)/i.test(color);
    return a;
}

export function randColor() {
    return randomColor();
}