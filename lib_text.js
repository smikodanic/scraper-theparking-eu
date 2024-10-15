module.exports.optimise = (text) => {
  text = text.replace(/\n/g, '').replace(/\s+/g, ' ').trim();
  return text;
};


/**
 * GERMANY -> Germany
 * @param {string} word
 * @returns
 */
module.exports.capitalize = (word) => {
  if (!word) { return ''; }
  word = word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  return word;
};
