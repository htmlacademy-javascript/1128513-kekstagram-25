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


const DESCRIPTIONS = ['Good morning world', 'Это я был на Эльбрусе', 'Жизнь прекрасна!', 'Выставка арт объектов', 'Завтрак у моря', 'Когда встал в 6 утра'];
const COMMENTS = ['Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'В целом всё неплохо. Но не всё.'];
const NAMES = ['Пётр Васильев','Диана Рублёва', 'Александр Тимошкин', 'Илья Гроденберг'];
const DESCRIPTION_QUANTITY = 25;
const COMMENTS_QUANTITY = 6;
const ID_LIST = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const getRandomArrayElement = (elements) => elements[getRandomIntFromRange(0, elements.length - 1)];

// Функция, создающая не повторяющийся массив элементов
const getRandomUniqueElements = (arr) => {
  // создаю копию передавемого массива
  const newArray = arr.slice();
  // создаю новый пустой массив, куда буду складывать новые не повторяющиеся элементы
  const elements = [];
  // Запускаю цикл,  который будет идти столько раз сколько и элементов в массиве
  for (let i = 0; i < newArray.length - 1; i++) {
  // создаю переменную, которая генерирут случ элемент в переданном массиве
    const id = getRandomIntFromRange(0, newArray.length - 1);
    // добавляю в новый массив рандомный элемент из массива newArray
    elements.push(newArray[id]);
    //  удаляю из newArray этот индекс элемента
    newArray.splice(id, 1);
  }
  return elements;
};

getRandomUniqueElements(ID_LIST);

const createComment = () => ({
  id: 1,
  avatar: `img/avatar-${getRandomIntFromRange(1,6)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

function createPhotoDescription () {
  const description = {
    id: 1,
    url: `photos/${getRandomIntFromRange(1, 25)}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomIntFromRange(15, 200),
    comments: Array.from({length: COMMENTS_QUANTITY}, createComment),
  };

  return description;
}

const allDescriptions = Array.from({length: DESCRIPTION_QUANTITY}, createPhotoDescription);

allDescriptions();
