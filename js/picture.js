import {createAllDescriptions} from './data.js';

const newPicturesItem = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const simillarAllDescriptions = createAllDescriptions();

const similarListFragment = document.createDocumentFragment();

simillarAllDescriptions.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  similarListFragment.appendChild(pictureElement);
});

newPicturesItem.appendChild(similarListFragment);
