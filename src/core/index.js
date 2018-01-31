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
    if(getAlpha(hex) < 200) {
        return '#212121';
    }
    return getLuminance(hex) > 0.179 ? '#212121' : '#f1f1f1';
}

export function getAlpha(hex) {
    var sub = hex.substring(7, 9);
    if(sub) {
        return (parseInt(hex.substring(7, 9), 16))
    }
    return 255;
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

export function rgbToHsl(rgb){
    if(!rgb) {
        return '';
    }
    var r = rgb.r;
    var g = rgb.g;
    var b = rgb.b;

    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if (max == min) { h = s = 0; } 
    else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

        switch (max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        
        h /= 6;
    }
    
    return `hsl(${[((h*100+0.5)|0)+'°', ((s*100+0.5)|0) + '%', ((l*100+0.5)|0) + '%'].join(', ')})`;
}

export function rgbToHsv(rgb) {
    if(!rgb) {
        return '';
    }

    var computedH = 0;
    var computedS = 0;
    var computedV = 0;
   
    //remove spaces from input RGB values, convert to int
    var r = rgb.r;
    var g = rgb.g;
    var b = rgb.b;
   
    if ( r==null || g==null || b==null ||
        isNaN(r) || isNaN(g)|| isNaN(b) ) {
      alert ('Please enter numeric RGB values!');
      return;
    }
    if (r<0 || g<0 || b<0 || r>255 || g>255 || b>255) {
      alert ('RGB values must be in the range 0 to 255.');
      return;
    }
    r=r/255; g=g/255; b=b/255;
    var minRGB = Math.min(r,Math.min(g,b));
    var maxRGB = Math.max(r,Math.max(g,b));
   
    // Black-gray-white
    if (minRGB==maxRGB) {
     computedV = minRGB;
     return [0,0,computedV];
    }
   
    // Colors other than black-gray-white:
    var d = (r==minRGB) ? g-b : ((b==minRGB) ? r-g : b-r);
    var h = (r==minRGB) ? 3 : ((b==minRGB) ? 1 : 5);
    computedH = (60*(h - d/(maxRGB - minRGB))).toFixed(0);
    computedS = (((maxRGB - minRGB)/maxRGB)*100).toFixed(0);
    computedV = (maxRGB*100).toFixed(0);
    return `hsv(${computedH}°, ${computedS}%, ${computedV}%)`;
}

export function rgbToCmyk(rgb) {
    var result = {
        c: 0,
        m: 0,
        y: 0,
        k: 0
    }
 
    var r = rgb.r / 255;
    var g = rgb.g / 255;
    var b = rgb.b / 255;

    result.k = Math.min( 1 - r, 1 - g, 1 - b );
    result.c = ( 1 - r - result.k ) / ( 1 - result.k );
    result.m = ( 1 - g - result.k ) / ( 1 - result.k );
    result.y = ( 1 - b - result.k ) / ( 1 - result.k );

    result.c = Math.round( result.c * 100 );
    result.m = Math.round( result.m * 100 );
    result.y = Math.round( result.y * 100 );
    result.k = Math.round( result.k * 100 );

    return `cmyk(${result.c}%, ${result.m}%, ${result.y}%, ${result.k}%)`;
}