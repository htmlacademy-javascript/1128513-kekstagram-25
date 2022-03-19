import {getRandomIntFromRange} from './util.js';
import {getRandomArrayElement} from './util.js';
import {getRandomUniqueElements} from './util.js';


const DESCRIPTIONS = ['Good morning world', 'Это я был на Эльбрусе', 'Жизнь прекрасна!', 'Выставка арт объектов', 'Завтрак у моря', 'Когда встал в 6 утра'];
const COMMENTS = ['Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'В целом всё неплохо. Но не всё.'];
const NAMES = ['Пётр Васильев','Диана Рублёва', 'Александр Тимошкин', 'Илья Гроденберг'];
const DESCRIPTION_QUANTITY = 25;
const COMMENTS_QUANTITY = 6;

const createComment = (photoId, commentId) => ({
  // ID фотографии * макс. кол-во комментариев + ID коммента
  id: photoId * COMMENTS_QUANTITY + commentId,
  avatar: `img/avatar-${getRandomIntFromRange(1,6)}.svg`,
  message: getRandomArrayElement(COMMENTS),
  name: getRandomArrayElement(NAMES),
});

const createPhotos = () => {
  const ids = getRandomUniqueElements(Array.from({length: 25}, (v, k) => ++k));
  // ++k сначала получает элемент, затем увеличивает
  const createPhoto = () => {
    const id = ids.shift();
    return {
      id: id,
      url: `photos/${id}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomIntFromRange(15, 200),
      comments: Array.from({length: COMMENTS_QUANTITY}, (v, k) => createComment(id, k)),
    };
  };
  return Array.from({length: DESCRIPTION_QUANTITY}, createPhoto);
};
export {createPhotos};
