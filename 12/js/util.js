const ALERT_SHOW_TIME = 4000;
const TIME_OUT_DELAY = 500;

const getRandomIntFromRange = (min, max) => {
  if (max < min) {
    throw new Error('Значение min должно быть больше значения max!');
  }

  if (min < 0 || max < 0) {
    throw new Error('Диапазон должен быть положительным!');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const checkStringLength = (currentString, maxLength) => currentString.length <= maxLength;

const isEscapeKey = (evt) => evt.key === 'Escape';

checkStringLength('Привет', 45);

const getRandomArrayElement = (elements) => elements[getRandomIntFromRange(0, elements.length - 1)];

// Функция, создающая не повторяющийся массив элементов
const getRandomUniqueElements = (arr) => {
  // создаю копию передавемого массива
  const newArray = arr.slice();
  // создаю новый пустой массив, куда буду складывать новые не повторяющиеся элементы
  const elements = [];
  const newArrayLength = arr.length;
  // Запускаю цикл,  который будет идти столько раз сколько и элементов в массиве
  for (let i = 0; i < newArrayLength; i++) {
    // создаю переменную, которая генерирут случ значение в переданном массиве
    const randomId = getRandomIntFromRange(0, newArray.length- 1);
    // добавляю в новый массив рандомное значение из массива newArray
    elements.push(newArray[randomId]);
    //  удаляю из newArray этот индекс элемента
    newArray.splice(randomId, 1);
  }
  return elements;
};

const debounce = (callback, timeoutDelay = TIME_OUT_DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '15px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomIntFromRange, getRandomArrayElement, getRandomUniqueElements, isEscapeKey, showAlert, debounce};
