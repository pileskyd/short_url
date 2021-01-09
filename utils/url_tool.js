class URL_Tool {
  /**
   * Is url?
   * @param {string} srt String
   * @returns {boolean}
   */
  isUrl(srt) {
    const urlRegExp = /^(http[s]?:\/\/)(www\.){0,1}[a-zA-Z0-9\.\-]+(\.[a-zA-Z]{2,5}){0,1}[\.]{0,1}([:][0-9]{2,5}){0,1}/
    return urlRegExp.test(srt)
  }

  /**
   * Generate hash from string
   * @param {string} str URL
   * @param {boolean} random Gen random hesh?
   * @returns {string} Hash
   */
  generate(str, random = false) { 
    const alphabet = "abcdefghijkmnopqrstuvwxyz0123456789ABCDEFGHJKLMNPQRSTUVWXYZ";
    const base = alphabet.length;
    const hash = [];

    if (random) {
      str += Math.random() * 100 + Date()
    }

    [...str].forEach((char, i) => {
      hash[i % 6] = hash[i % 6] ^ parseInt(char, 24);
    });

    for (let i = 0; i < 6; i++) {
      hash[i] = alphabet[hash[i] % base];
    }

    return hash.toString().replaceAll(",", "");
  }
}

module.exports = new URL_Tool();
