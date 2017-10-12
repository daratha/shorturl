var alphabet = "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ";
var base = alphabet.length;

function encode(number){
  var encoded = '';
  while (number){
    var remainder = number % base;
    number = Math.floor(number / base);
    encoded = alphabet[remainder].toString() + encoded;
  }
  return encoded;
}
  
function decode(string){
  var decoded = 0;
  while (string){
    var index = alphabet.indexOf(string[0]);
    var power = string.length - 1;
    decoded += index * (Math.pow(base, power));
    string = string.substring(1);
  }
  return decoded;
}

module.exports.encode = encode;
module.exports.decode = decode;