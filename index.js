const Alea = require('./Alea');
const adjectives = require('./adjectives');
const animals = require('./animals');

/**
 *
 * @param {*} [seed=0] The value to seed the generated ID with
 * @param {number} [adjectiveCount=2] The number of adjectives to append
 * @param {string} [delimiter=''] The string delimiter between words
 * @param {('titlecase'|'camelcase'|'uppercase'|'lowercase'|'togglecase')} [caseStyle='titlecase'] The case style for words
 */
function generateId(seed, adjectiveCount, opts) {
  if (seed == null) seed = 0;
  if (opts == null) opts = {
    delimiter: '',
    caseStyle: 'titlecase',
  }
  if (adjectiveCount == null) adjectiveCount = 2;
  if (opts.delimiter == null) opts.delimiter = '';
  if (opts.caseStyle == null) opts.caseStyle = 'titlecase';

  const rng = Alea(seed);

  let result = '';
  let index;
  while (--adjectiveCount >= 0) {
    index = getRandomIndex(rng, adjectives.length);
    result += getFormattedWord(adjectives[index], opts) + opts.delimiter;
  }
  index = getRandomIndex(rng, animals.length);
  result += getFormattedWord(animals[index], opts);

  if (opts.caseStyle === 'camelcase') {
    return result.charAt(0).toLowerCase() + result.slice(1);
  }
  return result;
}

function getRandomIndex(rng, length) {
  const index = Math.floor(rng() * length);
  return index === length ? index - 1 : index;
}

function getFormattedWord(word, opts) {
  if (word.includes('-')) return getFormattedWords(word.split('-'), opts);
  switch (opts.caseStyle) {
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

function getFormattedWords(words, opts) {
  return words.map(function(word) {
    return getFormattedWord(word, opts)
  }).join(opts.delimiter);
}

function getToggleCaseWord(word) {
  const rng = Alea(word);
  return word.split('').map(function(char) {
    if (rng() > 0.5) return char.toUpperCase();
    return char;
  }).join('');
}

module.exports = { generateId };