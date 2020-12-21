import Alea from './lib/Alea';
import adjectives from './assets/adjectives';
import animals from './assets/animals';
import type { RandomGenerator } from './lib/Alea';

type CaseStyle = 'titlecase' | 'camelcase' | 'uppercase' | 'lowercase' | 'togglecase';
interface GenerateIdOptions {
  numAdjectives: number;
  delimiter: string;
  caseStyle: CaseStyle;
}

export default class IdGenerator {

  private generator: RandomGenerator;
  private options: GenerateIdOptions;

  constructor(seed: any = null, {
    numAdjectives = 2,
    delimiter = '',
    caseStyle = 'titlecase',
  }: Partial<GenerateIdOptions> = {}) {
    if (seed == null) {
      seed = new Date();
    }
    this.generator = Alea(seed);
    this.options = {
      numAdjectives,
      delimiter,
      caseStyle,
    };
  }

  public generateId(customOptions: Partial<GenerateIdOptions> = {}) {
    const options = {
      ...this.options,
      ...customOptions,
    };
    let result = '';
    for (let i = 0; i < options.numAdjectives; i++) {
      const adjective = this.getRandomElement(adjectives);
      result += this.getFormattedWord(adjective, options);
      result += options.delimiter;
    }
    const animal = this.getRandomElement(animals);
    result += this.getFormattedWord(animal, options);
    if (options.caseStyle === 'camelcase') {
      return result.charAt(0).toLowerCase() + result.slice(1);
    }
    return result;
  }

  private getRandomElement(words: string[]) {
    const index = Math.floor(this.generator() * words.length);
    return words[Math.min(index, words.length - 1)];
  }

  private getFormattedWord(word: string, options: GenerateIdOptions): string {
    if (word.includes('-')) {
      return word.split('-')
          .map(w => this.getFormattedWord(w, options))
          .join(options.delimiter);
    }
    switch (options.caseStyle) {
      case 'titlecase': case 'camelcase':
        return word.charAt(0).toUpperCase() + word.slice(1);
      case 'uppercase':
        return word.toUpperCase();
      case 'togglecase':
        return this.getToggleCaseWord(word);
      case 'lowercase': default:
        return word;
    }
  }

  private getToggleCaseWord(word: string) {
    return word.split('').map(c => this.generator() > 0.5 ? c.toUpperCase() : c).join('');
  }

}

const idGenerator = new IdGenerator();

export const generateId = idGenerator.generateId;

