const getRandomIntFromRange = function (min, max) {
  if (max <= min) {
    throw new Error('Значение min должно быть больше значения max!');
  }

  if (min < 0 || max < 0) {
    throw new Error('Диапазон должен быть положительным!');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

getRandomIntFromRange(4, 10);

const checkStringLength = function (currentString, maxLength) {
  return currentString.length <= maxLength;
};

checkStringLength('Длина строки', 10);