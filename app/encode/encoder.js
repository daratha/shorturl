// var ALPHABET = "abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ123456789";  // base 58
var ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"  //base 62
var BASE = ALPHABET.length;

function decode(string){
  var decoded = 0;
  while (string){
    var index = ALPHABET.indexOf(string[0]);
    var power = string.length - 1;
    decoded += index * (Math.pow(BASE, power));
    string = string.substring(1);
  }
  return decoded;
}

function encode(number){
  var encoded = '';
  while (number){
    var remainder = number % BASE;
    var number = Math.floor(number / BASE);
    encoded = ALPHABET[remainder].toString() + encoded;
  }
  return encoded;
}

module.exports.decode = decode;
module.exports.encode = encode;
