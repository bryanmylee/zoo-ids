import { generateId } from './index';

test('same seed same id', () => {
  // Arrange
  const seed = 'abc';
  // Act
  const result1 = generateId(seed);
  const result2 = generateId(seed);
  // Assert
  console.log(result1);
  expect(result1).toEqual(result2);
});

