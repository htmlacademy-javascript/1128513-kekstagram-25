const getRandomIntFromRange = function (min, max) {
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
getRandomIntFromRange(1, 2);

const checkStringLength = function (currentString, maxLength) {
  return currentString.length <= maxLength;
};

checkStringLength('Длина строки', 10);

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

const getRandomArrayElement = (elements) => elements[getRandomIntFromRange(0, elements.length - 1)];

const DESCRIPTIONS = ['Good morning world', 'Это я был на Эльбрусе', 'Жизнь прекрасна!', 'Выставка арт объектов', 'Завтрак у моря', 'Когда встал в 6 утра'];
const COMMENTS = ['Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'В целом всё неплохо. Но не всё.'];
const NAMES = ['Пётр Васильев','Диана Рублёва', 'Александр Тимошкин', 'Илья Гроденберг'];
const DESCRIPTION_QUANTITY = 25;
const COMMENTS_QUANTITY = 6;
const ID_LIST = getRandomUniqueElements(Array.from({ length: 25 }, (v, k) => ++k));
// ++k сначала получает элемент, затем увеличивает

const createComment = (photoId, commentId) => ({
  // ID фотографии * макс. кол-во комментариев + ID коммента
  id: photoId * COMMENTS_QUANTITY + commentId,
  avatar: `img/avatar-${getRandomIntFromRange(1,6)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const createPhotoDescription = () => {
  const id = ID_LIST.shift();
  const description = {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomIntFromRange(15, 200),
    comments: Array.from({length: COMMENTS_QUANTITY}, (v, k) => createComment(id, k)),
  };

  return description;
};

const allDescriptions = () => Array.from({length: DESCRIPTION_QUANTITY}, createPhotoDescription);

allDescriptions();
