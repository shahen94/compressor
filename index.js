class Compressor {
  // LZW encode algorithm
  static compress(s) {
    let dict = {};
    let data = (s + "").split("");
    let out = [];
    let currChar;
    let phrase = data[0];
    let code = 256;
    for (let i = 1; i < data.length; i++) {
      currChar = data[i];
      if (dict[phrase + currChar] != null) {
        phrase += currChar;
      } else {
        out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
        dict[phrase + currChar] = code;
        code++;
        phrase = currChar;
      }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));

    return out;
  }
  static decompress(data) {
    let dict = {};
    let currChar = String.fromCharCode(data[0]);
    let oldPhrase = currChar;
    let out = [currChar];
    let code = 256;
    let phrase;
    for (let i = 1; i < data.length; i++) {

        let currCode = data[i];
        if (currCode < 256) {
            phrase = String.fromCharCode(data[i]);
        } else {
            phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out += phrase;
        currChar = phrase[0];
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out;
  }
}


module.exports = Compressor;
