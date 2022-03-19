import {createPhotos} from './data.js';
// import {showBigPicture} from './big-picture.js';

const container = document.querySelector('.pictures');
const template = document.querySelector('#picture').content.querySelector('.picture');

const photos = createPhotos();
const fragment = document.createDocumentFragment();

const renderUserPhotos = () => {
  photos.forEach(({url, likes, comments}) => {
    const element = template.cloneNode(true);
    element.querySelector('.picture__img').src = url;
    element.querySelector('.picture__likes').textContent = likes;
    element.querySelector('.picture__comments').textContent = comments.length;
    fragment.appendChild(element);
  });
  return container.appendChild(fragment);
};


export {renderUserPhotos};