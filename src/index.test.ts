import 'jest-extended';
import { generateId } from './index';

const sampleSeed = 'abc';
// as of v2.0.0, seed 'abc' produces 'late gargantuan spider'.
const sampleTokens = generateId(sampleSeed, {
  caseStyle: 'lowercase',
  delimiter: ' ',
}).split(' ');
const sampleTokens_titlecased = sampleTokens
    .map(s => s.charAt(0).toUpperCase() + s.slice(1));

test('custom delimiter', () => {
  // Act
  const result = generateId(sampleSeed, {
    delimiter: '//',
  });
  // Assert
  expect(result).toEqual(sampleTokens_titlecased.join('//'));
});

const numberOfUppercase = (s: string) => {
  let num = 0;
  s.split('').forEach(c => {
    if (isUpperCase(c)) {
      num++;
    }
  });
  return num;
};

const isUpperCase = (s: string) => {
  return s.toUpperCase() === s;
};

const isToggleCase = (s: string) => {
  const startLower = !isUpperCase(s.charAt(0));
  for (let i = 0; i < s.length; i++) {
    const isEvenIndex = i % 2 === 0;
    const isCorrectCase = isEvenIndex !== isUpperCase(s.charAt(i));
    if (startLower !== isCorrectCase) {
      return false;
    }
  }
  return true;
};


test('same seed same id', () => {
  // Arrange
  const seed = 'abc';
  // Act
  const result1 = generateId(seed);
  const result2 = generateId(seed);
  // Assert
  expect(result1).toEqual(result2);
});

test('diff seed diff id', () => {
  // Arrange
  const seed1 = 'abc';
  const seed2 = 'def';
  // Act
  const result1 = generateId(seed1);
  const result2 = generateId(seed2);
  // Assert
  expect(result1).not.toEqual(result2);
});

test('object seed', () => {
  // Arrange
  const seed = { name: 'adam', age: 23 };
  // Act
  const result1 = generateId(seed);
  const result2 = generateId(seed);
  // Assert
  expect(result1).toEqual(result2);
});

test('array seed', () => {
  // Arrange
  const seed = [1, 2, 3];
  // Act
  const result1 = generateId(seed);
  const result2 = generateId(seed);
  // Assert
  expect(result1).toEqual(result2);
});

test('null seed works', () => {
  // Act
  const result = generateId(null, {
    delimiter: ' ',
  });
  // Assert
  // adjectives could be one or two words.
  expect(result).toSatisfy(r => {
    return r.split(' ').length >= 3 && r.split(' ').length <= 5;
  });
});

test('no argument works', () => {
  // Act
  const result = generateId();
  // Assert
  // adjectives could be one or two words.
  expect(result).toSatisfy(s => numberOfUppercase(s) >= 3 && numberOfUppercase(s) <= 5);
});

test('titlecase should have 3 upper case letters', () => {
  // Act
  const result = generateId(sampleSeed, {
    caseStyle: 'titlecase',
  });
  // Assert
  expect(result).toSatisfy(s => numberOfUppercase(s) === 3);
});

test('camelcase should have 2 upper case letters', () => {
  // Act
  const result = generateId(sampleSeed, {
    caseStyle: 'camelcase',
  });
  // Assert
  expect(result).toSatisfy(s => numberOfUppercase(s) === 2);
});

test('uppercase should have all upper case letters', () => {
  // Act
  const result = generateId(sampleSeed, {
    caseStyle: 'uppercase',
  });
  // Assert
  expect(result).toSatisfy(isUpperCase);
});

test('lowercase should have no upper case letters', () => {
  // Act
  const result = generateId(sampleSeed, {
    caseStyle: 'lowercase',
  });
  // Assert
  expect(result).toSatisfy(s => numberOfUppercase(s) === 0);
});

test('togglecase should start with lowercase', () => {
  // Act
  const result = generateId(sampleSeed, {
    caseStyle: 'togglecase',
  });
  // Assert
  expect(result).toSatisfy(s => s.charAt(0).toLowerCase() === s.charAt(0));
});

test('togglecase should have alternating case', () => {
  // Act
  const result = generateId(sampleSeed, {
    caseStyle: 'togglecase',
  });
  // Assert
  expect(result).toSatisfy(isToggleCase);
});

test('3 adjectives should produce 4 words', () => {
  // Act
  const result = generateId(sampleSeed, {
    delimiter: ' ',
    numAdjectives: 3,
  });
  // Assert
  expect(result).toSatisfy(s => s.split(' ').length === 4);
});

test('4 adjectives should produce 5 words', () => {
  // Act
  const result = generateId(sampleSeed, {
    delimiter: ' ',
    numAdjectives: 3,
  });
  // Assert
  expect(result).toSatisfy(s => s.split(' ').length === 4);
});

test('multi-word adjective', () => {
  // Act
  // as of v2.0.0, seed = 193 returns Second Hand Wee Fox, which includes a
  // multi-word adjective.
  const result = generateId(193, {
    delimiter: ' ',
  });
  // Assert
  expect(result).toSatisfy(r => r.split(' ').length == 4);
});

test('delimiter does not affect id generation', () => {
  // Act
  const result1 = generateId(sampleSeed, {
    delimiter: ' ',
  });
  const result2 = generateId(sampleSeed, {
    delimiter: ',',
  });
  expect(result1.split(' ')).toEqual(result2.split(','));
});

test('many seeds to cover all mash possibilities', () => {
  // Act
  for (let i = 0; i < 100; i++) {
    generateId(i);
  }
});

