const { alea } = require('seedrandom');
const adjectives = require('./adjectives');
const animals = require('./animals');

/**
 *
 * @param {string | number} [seed=0] The value to seed the generated ID with
 * @param {number} [adjectiveCount=2] The number of adjectives to append
 * @param {string} [delimiter=''] The string delimiter between words
 * @param {('titlecase'|'camelcase'|'uppercase'|'lowercase'|'togglecase')} [caseStyle='titlecase'] The case style for words
 */
function generateId(seed, adjectiveCount, delimiter, caseStyle) {
  if (seed == null) seed = 0;
  if (adjectiveCount == null) adjectiveCount = 2;
  if (delimiter == null) delimiter = '';
  if (caseStyle == null) caseStyle = 'titlecase';

  // Prevent increases in the adjective count merely appending new adjectives
  const rng = alea(seed + adjectiveCount);

  let result = '';
  let index;
  while (--adjectiveCount >= 0) {
    index = getRandomIndex(rng, adjectives.length);
    result += getFormattedWord(adjectives[index], caseStyle) + delimiter;
  }
  index = getRandomIndex(rng, animals.length);
  result += getFormattedWord(animals[index], caseStyle);

  if (caseStyle === 'camelcase') {
    return result.charAt(0).toLowerCase() + result.slice(1);
  }
  return result;
}

function getRandomIndex(rng, length) {
  const index = Math.floor(rng() * length);
  return index === length ? index - 1 : index;
}

function getFormattedWord(word, caseStyle) {
  if (word.includes('-')) return getFormattedWords(word.split('-'), caseStyle);
  switch (caseStyle) {
    case 'titlecase': case 'camelcase':
      return word.charAt(0).toUpperCase() + word.slice(1);
    case 'uppercase':
      return word.toUpperCase();
    case 'togglecase':
      return getToggleCaseWord(word);
    case 'lowercase': default:
      return word;
  }
}

function getFormattedWords(words, caseStyle) {
  return words.map(function(word) {
    return getFormattedWord(word, caseStyle)
  }).join();
}

function getToggleCaseWord(word) {
  const rng = alea(word);
  return word.split('').map(function(char) {
    if (rng() > 0.5) return char.toUpperCase();
    return char;
  }).join('');
}

module.exports = { generateId };