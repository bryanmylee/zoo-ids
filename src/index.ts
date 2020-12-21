import Alea from './lib/alea';
import adjectives from './adjectives';
import animals from './animals';
import type { RandomGenerator } from './lib/alea';

type CaseStyle = 'titlecase' | 'camelcase' | 'uppercase' | 'lowercase' | 'togglecase';
interface GenerateIdOptions {
  numAdjectives: number;
  delimiter: string;
  caseStyle: CaseStyle;
}

const defaultOptions: GenerateIdOptions = {
  numAdjectives: 2,
  delimiter: '',
  caseStyle: 'titlecase',
};

const cachedGenerator: RandomGenerator = Alea(new Date());

export function generateId(seed: any = null, options: Partial<GenerateIdOptions> = {}) {
  const generator = seed == null ? cachedGenerator : Alea(seed);
  const fullOptions = { ...defaultOptions, ...options };
  const { numAdjectives, delimiter, caseStyle } = fullOptions;
  let result = '';
  for (let i = 0; i < numAdjectives; i++) {
    const adjective = getRandomElement(generator, adjectives);
    result += getFormattedWord(adjective, { numAdjectives, delimiter, caseStyle });
    result += fullOptions.delimiter;
  }
  const animal = getRandomElement(generator, animals);
  result += getFormattedWord(animal, fullOptions);
  if (caseStyle === 'camelcase') {
    return result.charAt(0).toLowerCase() + result.slice(1);
  }
  return result;
}

function getRandomElement(generator: RandomGenerator, words: string[]) {
  const index = Math.floor(generator() * words.length);
  return words[Math.min(index, words.length - 1)];
}

function getFormattedWord(word: string, options: GenerateIdOptions): string {
  if (word.includes('-')) {
    return word.split('-')
        .map(w => getFormattedWord(w, options))
        .join(options.delimiter);
  }
  switch (options.caseStyle) {
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

function getToggleCaseWord(word: string) {
  return word.split('')
      .map((c, i) => i % 2 === 0 ? c : c.toUpperCase())
      .join('');
}

