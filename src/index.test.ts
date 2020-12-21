import 'jest-extended';
import { generateId } from './index';

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

const sampleSeed = 'abc';
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
  })
  return num;
};

const isUpperCase = (s: string) => {
  return s.toUpperCase() === s;
};

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

const isToggleCase = (s: string) => {
  const startLower = !isUpperCase(s.charAt(0));
  for (let i = 0; i < s.length; i++) {
    if (startLower !== ((i % 2 === 0) !== isUpperCase(s.charAt(i)))) {
      return false;
    }
  }
  return true;
};

test('togglecase should have alternating case', () => {
  // Act
  const result = generateId(sampleSeed, {
    caseStyle: 'togglecase',
  });
  // Assert
  expect(result).toSatisfy(isToggleCase);
});

