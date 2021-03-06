/**
 * Cipher functions that are available
 * Caesar Cipher
 * Vignere Cipher
 */


 /**
 * Declaring all the buttons, inputs etc used in the project here
 */
const plaintextInput = document.getElementById("plaintext");
const calculateButton = document.getElementById("calculate");
const outputDiv = document.getElementById("output");
const selector = document.getElementById("ciphers");

/**
 * Function for calculating caesar cipher encryption
 */
const caesarShift = function (str, amount) {
    // Wrap the amount
    if (amount < 0) {
      return caesarShift(str, amount + 26);
    }
  
    // Make an output variable
    var output = "";
  
    // Go through each character
    for (var i = 0; i < str.length; i++) {
      // Get the character we'll be appending
      var c = str[i];
  
      // If it's a letter...
      if (c.match(/[a-z]/i)) {
        // Get its code
        var code = str.charCodeAt(i);
  
        // Uppercase letters
        if (code >= 65 && code <= 90) {
          c = String.fromCharCode(((code - 65 + amount) % 26) + 65);
        }
  
        // Lowercase letters
        else if (code >= 97 && code <= 122) {
          c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
        }
      }
  
      // Append
      output += c;
    }
  
    // All done!
    return output;
}

/**
 * Vignere Cipher Algorithm
 */

/**
 * Check if the Character is letter or not
 * @param {String} str - character to check
 * @return {object} An array with the character or null if isn't a letter
 */
function isLetter (str) {
  return str.length === 1 && str.match(/[a-zA-Z]/i)
}

/**
 * Check if is Uppercase or Lowercase
 * @param {String} character - character to check
 * @return {Boolean} result of the checking
 */
function isUpperCase (character) {
  if (character === character.toUpperCase()) {
    return true
  }
  if (character === character.toLowerCase()) {
    return false
  }
}

/**
 * Encrypt a Vigenere cipher
 * @param {String} message - string to be encrypted
 * @param {String} key - key for encrypt
 * @return {String} result - encrypted string
 */
const vignereEncrypt = (message, key) => {
  let result = ''

  for (let i = 0, j = 0; i < message.length; i++) {
    const c = message.charAt(i)
    if (isLetter(c)) {
      if (isUpperCase(c)) {
        result += String.fromCharCode((c.charCodeAt(0) + key.toUpperCase().charCodeAt(j) - 2 * 65) % 26 + 65) // A: 65
      } else {
        result += String.fromCharCode((c.charCodeAt(0) + key.toLowerCase().charCodeAt(j) - 2 * 97) % 26 + 97) // a: 97
      }
    } else {
      result += c
    }
    j = ++j % key.length
  }
  return result
}

/**
 * Decrypt a Vigenere cipher
 * @param {String} message - string to be decrypted
 * @param {String} key - key for decrypt
 * @return {String} result - decrypted string
 */
const vignereDecrypt = (message, key) => {
  let result = ''

  for (let i = 0, j = 0; i < message.length; i++) {
    const c = message.charAt(i)
    if (isLetter(c)) {
      if (isUpperCase(c)) {
        result += String.fromCharCode(90 - (25 - (c.charCodeAt(0) - key.toUpperCase().charCodeAt(j))) % 26)
      } else {
        result += String.fromCharCode(122 - (25 - (c.charCodeAt(0) - key.toLowerCase().charCodeAt(j))) % 26)
      }
    } else {
      result += c
    }
    j = ++j % key.length
  }
  return result
}

/**
 * AES Cipher Algorithm
 */
/*

/*
 * JavaScript AES implementation using Counter Mode
 *
 * Copyright (c) 2010 Robert Sosinski (http://www.robertsosinski.com)
 * Offical Web Site (http://github.com/robertsosinski/js-aes)
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */
var AES = {
  VERSION: "1.2",

  sbox: [0x63, 0x7c, 0x77, 0x7b, 0xf2, 0x6b, 0x6f, 0xc5, 0x30, 0x01, 0x67, 0x2b, 0xfe, 0xd7, 0xab, 0x76,
         0xca, 0x82, 0xc9, 0x7d, 0xfa, 0x59, 0x47, 0xf0, 0xad, 0xd4, 0xa2, 0xaf, 0x9c, 0xa4, 0x72, 0xc0,
         0xb7, 0xfd, 0x93, 0x26, 0x36, 0x3f, 0xf7, 0xcc, 0x34, 0xa5, 0xe5, 0xf1, 0x71, 0xd8, 0x31, 0x15,
         0x04, 0xc7, 0x23, 0xc3, 0x18, 0x96, 0x05, 0x9a, 0x07, 0x12, 0x80, 0xe2, 0xeb, 0x27, 0xb2, 0x75,
         0x09, 0x83, 0x2c, 0x1a, 0x1b, 0x6e, 0x5a, 0xa0, 0x52, 0x3b, 0xd6, 0xb3, 0x29, 0xe3, 0x2f, 0x84,
         0x53, 0xd1, 0x00, 0xed, 0x20, 0xfc, 0xb1, 0x5b, 0x6a, 0xcb, 0xbe, 0x39, 0x4a, 0x4c, 0x58, 0xcf,
         0xd0, 0xef, 0xaa, 0xfb, 0x43, 0x4d, 0x33, 0x85, 0x45, 0xf9, 0x02, 0x7f, 0x50, 0x3c, 0x9f, 0xa8,
         0x51, 0xa3, 0x40, 0x8f, 0x92, 0x9d, 0x38, 0xf5, 0xbc, 0xb6, 0xda, 0x21, 0x10, 0xff, 0xf3, 0xd2,
         0xcd, 0x0c, 0x13, 0xec, 0x5f, 0x97, 0x44, 0x17, 0xc4, 0xa7, 0x7e, 0x3d, 0x64, 0x5d, 0x19, 0x73,
         0x60, 0x81, 0x4f, 0xdc, 0x22, 0x2a, 0x90, 0x88, 0x46, 0xee, 0xb8, 0x14, 0xde, 0x5e, 0x0b, 0xdb,
         0xe0, 0x32, 0x3a, 0x0a, 0x49, 0x06, 0x24, 0x5c, 0xc2, 0xd3, 0xac, 0x62, 0x91, 0x95, 0xe4, 0x79,
         0xe7, 0xc8, 0x37, 0x6d, 0x8d, 0xd5, 0x4e, 0xa9, 0x6c, 0x56, 0xf4, 0xea, 0x65, 0x7a, 0xae, 0x08,
         0xba, 0x78, 0x25, 0x2e, 0x1c, 0xa6, 0xb4, 0xc6, 0xe8, 0xdd, 0x74, 0x1f, 0x4b, 0xbd, 0x8b, 0x8a,
         0x70, 0x3e, 0xb5, 0x66, 0x48, 0x03, 0xf6, 0x0e, 0x61, 0x35, 0x57, 0xb9, 0x86, 0xc1, 0x1d, 0x9e,
         0xe1, 0xf8, 0x98, 0x11, 0x69, 0xd9, 0x8e, 0x94, 0x9b, 0x1e, 0x87, 0xe9, 0xce, 0x55, 0x28, 0xdf,
         0x8c, 0xa1, 0x89, 0x0d, 0xbf, 0xe6, 0x42, 0x68, 0x41, 0x99, 0x2d, 0x0f, 0xb0, 0x54, 0xbb, 0x16],
  
  rcon: [[0x00, 0x00, 0x00, 0x00],
         [0x01, 0x00, 0x00, 0x00],
         [0x02, 0x00, 0x00, 0x00],
         [0x04, 0x00, 0x00, 0x00],
         [0x08, 0x00, 0x00, 0x00],
         [0x10, 0x00, 0x00, 0x00],
         [0x20, 0x00, 0x00, 0x00],
         [0x40, 0x00, 0x00, 0x00],
         [0x80, 0x00, 0x00, 0x00],
         [0x1b, 0x00, 0x00, 0x00],
         [0x36, 0x00, 0x00, 0x00]],
  
  cipher: function(input, w) {
    var nb     = 4;
    var nr     = w.length / nb - 1;
    var state  = [new Array(nb), new Array(nb), new Array(nb), new Array(nb)];
    var output = new Array(4 * nb);

    var i, round;
    
    for (i = 0; i < input.length; i++) {
      state[i % 4][Math.floor(i / 4)] = input[i];
    }
    
    this.addRoundKey(state, w, 0, nb);
    
    for (round = 1; round < nr; round++) {
      this.subBytes(state, nb);
      this.shiftRows(state, nb);
      this.mixColumns(state, nb);
      this.addRoundKey(state, w, round, nb);
    }
    
    this.subBytes(state, nb);
    this.shiftRows(state, nb);
    this.addRoundKey(state, w, round, nb);
    
    for (i = 0; i < output.length; i++) {
      output[i] = state[i % 4][Math.floor(i / 4)];
    }
    
    return output;
  },
  
  subBytes: function(state, nb) {
    var r, c;

    for (c = 0; c < nb; c++) {
      for (r = 0; r < 4; r++) {
        state[r][c] = this.sbox[state[r][c]];
      }
    }
  },
  
  shiftRows: function(state, nb) {
    var temp = new Array(nb);

    var r, c;
    
    for (r = 1; r < 4; r++) {
      for (c = 0; c < nb; c++) {
        temp[c] = state[r][(c + r) % nb];
      }
      for (c = 0; c < 4; c++) {
        state[r][c] = temp[c];
      }
    }
  },
  
  mixColumns: function(state, nb) {
    var r, c, a, b;

    for (c = 0; c < nb; c++) {
      a = new Array(4);
      b = new Array(4);
      
      for (r = 0; r < 4; r++) {
        a[r] = state[r][c];
        b[r] = state[r][c] & 0x80 ? state[r][c] << 1 ^ 0x11b : state[r][c] << 1;
      }
      
      state[0][c] = b[0] ^ a[3] ^ a[2] ^ b[1] ^ a[1];
      state[1][c] = b[1] ^ a[0] ^ a[3] ^ b[2] ^ a[2];
      state[2][c] = b[2] ^ a[1] ^ a[0] ^ b[3] ^ a[3];
      state[3][c] = b[3] ^ a[2] ^ a[1] ^ b[0] ^ a[0];
    }
  },
  
  addRoundKey: function(state, w, round, nb) {
    var r, c;

    for (c = 0; c < nb; c++) {
      for (r = 0; r < 4; r++) {
        state[r][c] ^= w[round * 4 + c][r];
      }
    }
  },
  
  keyExpansion: function(key) {
    var nk   = key.length / 4;
    var nb   = 4;
    var nr   = nk + 6;
    var w    = new Array(nb * (nr + 1));
    var temp = new Array(4);

    var i, j;
    
    for (i = 0; i < nk; i++) {
      w[i] = [key[4 * i], key[4 * i + 1], key[4 * i + 2], key[4 * i + 3]];
    }
    
    for (i = nk; i < w.length; i++) {
      w[i] = new Array(4);
      
      for (j = 0; j < 4; j++) {
        temp[j] = w[i - 1][j];
      }
      
      if (i % nk === 0) {
        this.rotWord(temp);
        this.subWord(temp);
        
        for (j = 0; j < 4; j++) {
          temp[j] ^= AES.rcon[i / nk][j];
        }
      }
      else if (nk > 6 && i % nk === 4) {
        this.subWord(temp);
      }
      
      for (j = 0; j < 4; j++) {
        w[i][j] = w[i - nk][j] ^ temp[j];
      }
    }
    
    return w;
  },
  
  rotWord: function(w) {
    var temp = w[0];

    var i;
    
    for (i = 0; i < 3; i++) {
      w[i] = w[i + 1];
    }
    
    w[3] = temp;
  },
  
  subWord: function(w) {
    var i;

    for (i = 0; i < 4; i++) {
      w[i] = this.sbox[w[i]];
    }
  },
  
  generateKey: function() {
    var key = new Array(16);

    var i;
    
    for (i = 0; i < 16; i++) {
      key[i] = Math.floor(Math.random() * 0x100);
    }
    
    return key;
  }
};

AES.Base64 = {
  characters: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  
  encode: function (input) {
    var output = "";

    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;

    var i;
    
    for (i = 0; i < input.length;) {
      chr1 = input.charCodeAt(i++);
      chr2 = input.charCodeAt(i++);
      chr3 = input.charCodeAt(i++);
      
      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 0x3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 0xf) << 2) | (chr3 >> 6);
      enc4 = chr3 & 0x3f;
      
      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } 
      else if (isNaN(chr3)) {
        enc4 = 64;
      }
      
      output = output + this.characters.charAt(enc1) +
                        this.characters.charAt(enc2) +
                        this.characters.charAt(enc3) +
                        this.characters.charAt(enc4);
    }
    
    return output;
  },
  
  decode: function (input) {
    var output = "";

    var chr1, chr2, chr3, dec1, dec2, dec3, dec4;

    var i;
    
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    
    for (i = 0; i < input.length;) {
      dec1 = this.characters.indexOf(input.charAt(i++));
      dec2 = this.characters.indexOf(input.charAt(i++));
      dec3 = this.characters.indexOf(input.charAt(i++));
      dec4 = this.characters.indexOf(input.charAt(i++));
      
      chr1 = (dec1 << 2) | (dec2 >> 4);
      chr2 = ((dec2 & 0xf) << 4) | (dec3 >> 2);
      chr3 = ((dec3 & 0x3) << 6) | dec4;
      
      output = output + String.fromCharCode(chr1);
      
      if (dec3 !== 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (dec4 !== 64) {
        output = output + String.fromCharCode(chr3);
      }
    }
    
    return output;
  }
};

AES.Counter = function() {
  var time = Math.floor((new Date()).getTime() / 1000);

  this.arr = new Array(16);

  var i;
  
  for (i = 0; i < 4; i++) {
    this.arr[i] = (time >>> i * 8) & 0xff;
  }
  for (i = 4; i < 8; i++) {
    this.arr[i] = Math.floor(Math.random() * 0x100);
  }
  for (i = 8; i < 16; i++) {
    this.arr[i] = 0;
  }
  
  this.increment = function() {
    for (i = 15; i >= 8; i--) {
      if (this.arr[i] === 0xff) {
        this.arr[i] = 0;
      } 
      else {
        this.arr[i]++;
        break;
      }
    }
    
    return this;
  };
};

AES.Crypto = function(key) {
  var blockSize = 16;
  
  this.key         = key;
  this.keySchedule = AES.keyExpansion(key);
  this.counter     = new AES.Counter();

  var i;
  
  this.setCounter = function(arr) {
    for (i = 0; i < 16; i++) {
      this.counter.arr[i] = arr[i];
    }
    
    return this;
  };
  
  this.getCounter = function() {
    return this.counter.arr;
  };
  
  this.run = function(input) {
    var blockCount = Math.ceil(input.length / blockSize);
    var output     = new Array(input.length);

    var counterBlock, byteCount, offset;

    var block, c;
    
    for (block = 0; block < blockCount; block++) {
      counterBlock = AES.cipher(this.counter.arr, this.keySchedule);
      byteCount    = block + 1 === blockCount ? input.length % blockSize : blockSize;
      offset       = block * blockSize;
      
      for (c = 0; c < byteCount; c++) {
        output[offset + c] = String.fromCharCode(counterBlock[c] ^ input.charCodeAt(offset + c));
      }
      
      this.counter.increment();
    }
    
    return output.join("");
  };
  
  this.encrypt = function(text) {
    return AES.Base64.encode(this.run(text));
  };
  
  this.decrypt = function(text) {
    return this.run(AES.Base64.decode(text));
  };
};

/**
 * 
 * Utils for RSA Algorithm 
 */

//Constructor
function SuperInteger(value) {
  this.value = '0';
  if (typeof value == 'object') {
      this.value = value.toString();
      return;
  } else if (typeof value == 'string') {
      for (var i = 0; i < value.length; i++) {
          var code = value[i].charCodeAt(0);
          if (code < 48 || code > 57) {
              console.log('ERROR! String has a non-numeric character.');
              return;
          }
      }
      this.value = value;
  } else if (typeof value == 'number') {
      if (value < 0) {
          console.log('ERROR! Negative number.');
          return;
      } else if (value == 0) {
          this.value = "0";
          return;
      }
      var reverseValue = '';
      while (value > 0) {
          reverseValue += String.fromCharCode(48 + (value % 10));
          value = parseInt(value/10);
      }  
      this.value = '';
      for (var i = reverseValue.length-1; i >= 0; i--)
          this.value += reverseValue[i];
  }
  
  return this.value;
};

//Utils - Greater
SuperInteger.prototype.greater = function(num2) {
  if (typeof num2 != 'object')
      num2 = new SuperInteger(num2);
  
  var num1 = this.toString();
  var num2 = num2.toString();
  
  if (num1.length > num2.length) return true;
  if (num2.length > num1.length) return false;
  
  for (var i = 0; i < num1.length; i++)
      if (num1[i] != num2[i])
          return num1[i] > num2[i];
  
  return false;
};

//Utils - Smaller 
SuperInteger.prototype.smaller = function(num2) {
  if (typeof num2 != 'object')
      num2 = new SuperInteger(num2);
  
  var num1 = this.toString();
  var num2 = num2.toString();
  
  if (num1.length < num2.length) return true;
  if (num2.length > num1.length) return false;
  
  for (var i = 0; i < num1.length; i++)
      if (num1[i] != num2[i])
          return num1[i] < num2[i];
  return false;
};

//Utils - Equals
SuperInteger.prototype.eq = function(num2) {
  if (typeof num2 != 'object')
      num2 = new SuperInteger(num2);
  
  var num1 = this.toString();
  var num2 = num2.toString();
  
  return num1.localeCompare(num2) == 0;
};

//Utils - Truncate
SuperInteger.prototype.truncate = function(n) {
  var l = this.toString().length;
  while (l < n) {
      this.value = "0" + this.toString();
      l++;
  }
  return this.toString().substring(l-n, l);
};

//Utils - Remove Zeros
SuperInteger.prototype.removeZeros = function() {
  var result = new SuperInteger(this.toString().replace(/^0+/, ''));
  if (result.toString() == "") result = new SuperInteger(0);
  return result;
};

//Sum
SuperInteger.prototype.add = function(num2) {
  if (typeof num2 != 'object')
      num2 = new SuperInteger(num2);
  
  var l = Math.max(this.toString().length, num2.toString().length);
  this.truncate(l); num2.truncate(l);
  
  var num1 = this.toString();
  var num2 = num2.toString();
  
  var result = '';
  var carry = 0;
  
  for (var i = 0; i < l; i++) {
      var dig1 = num1.charCodeAt(l-1-i)-48;
      var dig2 = num2.charCodeAt(l-1-i)-48;
      result += String.fromCharCode(48 + (dig1 + dig2 + carry)%10);
      carry = parseInt((dig1 + dig2 + carry)/10);
  }
  if (carry == 1)
      result += carry;
  result = result.split("").reverse().join("");
  return new SuperInteger(result).removeZeros();
};

//Subtraction
SuperInteger.prototype.minus = function(num2) {
  if (typeof num2 != 'object')
      num2 = new SuperInteger(num2);
  
  var num1 = this;
  
  var l = Math.max(num1.toString().length, num2.toString().length);
  num1.truncate(l); num2.truncate(l);
  
  var num2 = num2.toString();
  var comp2 = "";
  for (var i = 0; i < num2.length; i++)
      comp2 = comp2 + (57-num2.charCodeAt(i)); // 9 - dig
  
  
  num2 = new SuperInteger(comp2);
  num2 = num2.add(1);
  
  var result = new SuperInteger(num1.add(num2).truncate(l));
  return result.removeZeros();
};

//Multiplication
SuperInteger.prototype.times = function(num2) {
  if (typeof num2 != 'object')
      num2 = new SuperInteger(num2);
  var num1 = this;
  
  num1 = num1.removeZeros();
  num2 = num2.removeZeros();
  
  var zero = new SuperInteger(0);
  var result = new SuperInteger(zero);
  while(num2.greater(zero)) {
      var x = new SuperInteger(num1);
      var i = new SuperInteger(1)
      while (i.add(i).greater(num2) == false) {
          i = i.add(i);
          x = x.add(x);
      }
      result = result.add(x);
      num2 = num2.minus(i);
  }
  return result;
};

//Division
SuperInteger.prototype.div = function(num2) {
  if (typeof num2 != 'object')
      num2 = new SuperInteger(num2);
  var num1 = this;
  
  num1 = num1.removeZeros();
  num2 = num2.removeZeros();
  
  var zero = new SuperInteger(0);
  var result = new SuperInteger(zero);
  
  while(num2.greater(num1) == false) {
      var x = new SuperInteger(num2);
      var i = new SuperInteger(1)
      while (x.add(x).greater(num1) == false) {
          x = x.add(x);
          i = i.add(i);
      }
      result = result.add(i);
      num1 = num1.minus(x);
  }
  return result;
};

//Mod
SuperInteger.prototype.mod = function(n) {
  return this.minus(this.div(n).times(n));
};

//Exponentiation
SuperInteger.prototype.pow = function(num2) {
  if (typeof num2 != 'object')
      num2 = new SuperInteger(num2);
  var num1 = this;
  
  num1 = num1.removeZeros();
  num2 = num2.removeZeros();
  
  var zero = new SuperInteger(0);
  var one = new SuperInteger(1);
  var result = new SuperInteger(one);
  
  while(num2.greater(zero)) {
      var x = new SuperInteger(num1);
      var i = new SuperInteger(1)
      while (i.add(i).greater(num2) == false) {
          i = i.add(i);
          x = x.times(x);
      }
      result = result.times(x);
      num2 = num2.minus(i);
  }
  return result;
};

//Exponentiation with mod
SuperInteger.prototype.powMod = function(num2, m) {
  num1 = new SuperInteger(this).mod(m).removeZeros();
  num2 = new SuperInteger(num2).mod(m).removeZeros();
  
  var zero = new SuperInteger(0);
  var one = new SuperInteger(1);
  var result = new SuperInteger(one);
  
  var values = {};
  while(num2.greater(zero)) {
      var x = new SuperInteger(num1);
      var i = new SuperInteger(1)
      while (i.add(i).greater(num2) == false) {
          i = i.add(i);
          if (i in values)
              x = values[i];
          else {
              x = x.times(x).mod(m);
              values[i] = x;
          }
      }
      result = result.times(x).mod(m);
      num2 = num2.minus(i);
  }
  return result;
};

//Greatest Common Divisor
SuperInteger.prototype.gcd = function(num2) {
  var num1 = new SuperInteger(this);
  var num2 = new SuperInteger(num2);
  var num3 = null;
  
  while (num2.eq(0) == false) {
      num3 = num1.mod(num2);
      num1 = num2;
      num2 = num3;
  }
  
  return num1;
};

//Generate a rondom number between minN and maxN (inclusive)
SuperInteger.prototype.random = function(minN, maxN) {
  if (typeof minN != 'object') minN = new SuperInteger(minN);
  if (typeof maxN != 'object') maxN = new SuperInteger(maxN);
  
  minN = minN.removeZeros().toString();
  maxN = maxN.removeZeros().toString();
  
  var result;
  do {
      result = "";
      result += Math.floor(Math.random() * (maxN.charCodeAt(0)-46));
      for (var i = 1; i < maxN.length; i++) {
          result += Math.floor(Math.random() * 10);
      }
      result = new SuperInteger(result).removeZeros();
  } while (result.greater(maxN) || result.smaller(minN));
  return new SuperInteger(result);
};

SuperInteger.prototype.toString = function() {
  return this.value;
};

function isPrime(candidate) {
  if (typeof candidate != 'object') 
      candidate = new SuperInteger(candidate);
  
  if (candidate.eq(2) || candidate.eq(3))
      return true;
  
  if (candidate.mod(2).eq(0))
      return false;
  
  //Generate small primes (3 to 7919)
  //I could use the crive here, but there is no need, 
  //because the interval is too short..
  var smallPrimes = [];
  for (var i = 3; i <= 7919; i++) {
      var isPrime = true;
      for (var j = 0; j <= Math.sqrt(i); j++)
          if (i % j == 0) isPrime = false;
      if (isPrime == true) {
          smallPrimes.push(new SuperInteger(i));
          //
          console.log("Small prime: " + i);
          //
      }
  }
      
  //Test candidate against small primes
  for (var i = 0; i < smallPrimes.length; i++)
      if (candidate.mod(smallPrimes[i]).eq(zero))
          continue;
          
  //Generate a random number smaller than the candidate
  var random = new SuperInteger().random(3, candidate.minus(1));

  //Fermat Primality Test
  if(random.powMod(candidate.minus(1), candidate).eq(1) == false) 
      return false;

  var miller_test = true;
          
  //Miller-Rabin Primality Test --> 10 times
  for (var it = 0; it < 10; it++) {
      //Generate another random number smaller than the candidate
      random = new SuperInteger().random(3, candidate.minus(1));

      //Calculate r and d as (candidate-1) = 2^r * d
      var d = new SuperInteger(candidate.minus(1));
      var a = new SuperInteger(1);
      while (d.mod(2).eq(0)) {
          d = d.div(2);
          a = a.add(1);   
      }
  
      //Calculate x and test if it is one or candidate-1
      var x = random.powMod(d,candidate);
      if (x.eq(1) || x.eq(candidate.minus(1)))
          return true;

      for (var i = 0; i < parseInt(a.minus(1).toString()); i++) {
          x = x.pow(2).mod(candidate);
          if (x.eq(1)) {
              miller_test = false;
              return true;
          }
          if (x.eq(candidate.minus(1)))
              return true;
      }
  }    
  return false;
};

function generatePrime(bits) {
  var maxnumber = new SuperInteger(2).pow(bits).minus(1);
  var candidate = new SuperInteger(2);
  var tested = {};
  do {
      tested[candidate] = 1;
      candidate = candidate.random(3, maxnumber);
  } while (candidate in tested || isPrime(candidate) == false);
  return candidate;
};

function RSA_modInvese(a, m) {
  var m0 = new SuperInteger(m);
  var x0 = new SuperInteger(0);
  var x1 = new SuperInteger(1);
  var c = new SuperInteger();
  var q = new SuperInteger();
  var t = new SuperInteger();
  
  var x0_signal = false;
  var x1_signal = false;
  var t_signal = false;
  
  if (m.eq(1)) return 0;

  while (a.greater(1)) {
      
      q = a.div(m);
      t = new SuperInteger(m);

      m = a.mod(m);
      a = new SuperInteger(t);
      
      t = new SuperInteger(x0);
      t_signal = x0_signal;
      
      c = q.times(x0);
      
      if (x1_signal == false) {
          if (x0_signal == false) {
              if (x1.greater(c)) {
                  x0 = x1.minus(c);
              } else {
                  x0_signal = true;
                  x0 = c.minus(x1);
              }
          } else {
              x0 = x1.add(c);
              x0_signal = false;
          } 
      } else {
          if (x0_signal == false) {
              x0 = x1.add(c);
              x0_signal = true;
          } else {
              if (x1.greater(c)) {
                  x0 = x1.minus(c);
              } else {
                  x0_signal = false;
                  x0 = c.minus(x1);
              }
          }
      }
      
      x1 = new SuperInteger(t);
      x1_signal = t_signal;
  }

  if (x1_signal)
     x1 = m0.minus(x1);

  return x1;
}

function RSA_generateKeys(bits) {
  var p = generatePrime(bits);
  var q = generatePrime(bits);
  var n = p.times(q);
  var phi = (p.minus(1)).times(q.minus(1));

  var tested = {};
  var e = new SuperInteger(0);
  do {
      tested[e] = 1;
      e = e.random(3, phi);
  } while (e in tested || e.gcd(phi).eq(1) == false);
  
  var d = RSA_modInvese(e, phi);
  
  return { e: e.removeZeros(), 
          d: d.removeZeros(), 
          n: n.removeZeros() };
};

function RSA_encrypt (msg, e, n) {
  if (msg == undefined) return "";
  var ciphertext = "";
  for (var i = 0; i < msg.length; i++) {
      var c = new SuperInteger(msg.charCodeAt(i)).powMod(e,n);
      var count = new SuperInteger(n);
      while (count.greater(0)) {
          var ch = c.mod(90).add(32);
          c = c.div(90);
          count = count.div(90);
          ciphertext += String.fromCharCode(ch.toString());
      }
  }
  return ciphertext;
};

function RSA_decrypt (cipher, d, n) {
  if (cipher == undefined) return "";
  var msg = "";
  var count = new SuperInteger(n);
  sum = new SuperInteger(0);
  for (var i = cipher.length-1; i >= 0; i--) {
      if (count == 0) {
          var c = sum.powMod(d,n);
          msg += String.fromCharCode(c.toString());
          count = new SuperInteger(n);
          sum = new SuperInteger(0);
      }
      sum = sum.times(90).add(cipher.charCodeAt(i)).minus(32);
      count = count.div(90);
  }
  var c = sum.powMod(d,n);
  msg += String.fromCharCode(c.toString());
  count = new SuperInteger(n);
  sum = new SuperInteger(0);
  return msg.split("").reverse().join("");;
};

/**
 * The XOR cipher is a type of additive cipher.
 * Each character is bitwise XORed with the key.
 * We loop through the input string, XORing each
 * character with the key.
 */

/**
 * Encrypt using an XOR cipher
 * @param {String} str - String to be encrypted
 * @param {Number} key - key for encryption
 * @return {String} encrypted string
 */

function XOR (str, key) {
  let result = ''
  for (const elem of str) {
    result += String.fromCharCode(elem.charCodeAt(0) ^ key)
  }
  return result
}

/**
 * Adding all the functions on the click listener
 * to the button
 */
calculateButton.addEventListener("click", e => {
  e.preventDefault();   // To prevent the default behaviour of submitting the form
  const selectedCipher = selector.value;
  const plaintext = plaintextInput.value;
  let encryptedText = '', output = '';
  if (plaintext.length > 0) {
    switch (selectedCipher) {
      case 'caesar':
        encryptedText = caesarShift(plaintext, 3); // Provide the shift as second argument
        output = `Plaintext : ${plaintext}, Ciphertext : ${encryptedText}`;
        break;
      case 'vignere':
        encryptedText = vignereEncrypt(plaintext, 'nimisha'); // Provide the key as second argument
        output = `Plaintext : ${plaintext}, Ciphertext : ${encryptedText}`;
        break;
      case 'aes':
          var aSide = new AES.Crypto(AES.generateKey());
          var bSide = new AES.Crypto(aSide.key);
          bSide.setCounter(aSide.getCounter());
          encryptedText = aSide.encrypt(plaintext);
          output = `Plaintext : ${plaintext}, Ciphertext : ${encryptedText}`;
          break;
      case 'rsa':
            var encObj = RSA_generateKeys(8);
            encryptedText = RSA_encrypt(plaintext, encObj.e, encObj.n); 
            output = `Plaintext : ${plaintext}, Ciphertext : ${encryptedText}`;
            break;
      case 'xor':
            encryptedText = XOR(plaintext, 256);
            output = `Plaintext : ${plaintext}, Ciphertext : ${encryptedText}`;
            break;
      default:
        output = `Please select a valid encryption algorithm :)`;
    }
  }
  else {
    output = 'Please enter some plaintext :-/';
  }
  outputDiv.innerText = output;
});