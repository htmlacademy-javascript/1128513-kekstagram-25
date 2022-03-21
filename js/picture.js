import {createPhotos} from './data.js';
import {showBigPicture} from './big-picture.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const photos = createPhotos();
const fragment = document.createDocumentFragment();

const renderUserPhotos = () => {
  photos.forEach((picture) => {
    const {url,comments, likes} = picture;
    const element = template.cloneNode(true);
    element.querySelector('.picture__img').src = url;
    element.querySelector('.picture__likes').textContent = likes;
    element.querySelector('.picture__comments').textContent = comments.length;
    element.addEventListener('click', () => {
      showBigPicture(picture);
    });
    fragment.appendChild(element);
  });

  return container.appendChild(fragment);
};

export {renderUserPhotos};
