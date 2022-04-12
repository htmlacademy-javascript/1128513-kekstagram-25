import {renderUserPhotos} from './pictures.js';
import {getRandomUniqueElements, debounce} from './util.js';


const RANDOM_QUANTITY = 10;
const filters = document.querySelector('.img-filters');
const defaultButton = document.querySelector('#filter-default');
const randomButton = document.querySelector('#filter-random');
const discussedButton = document.querySelector('#filter-discussed');


const compareComments = (photoA, photoB) => {
  const rankA = photoA.comments.length;
  const rankB = photoB.comments.length;
  return rankB - rankA;
};

const createDefaultFilter = (pictures) => pictures.slice();

const createRandomFilter = (pictures) => {
  const picturesArray = pictures.slice();
  return getRandomUniqueElements(picturesArray).slice(0, RANDOM_QUANTITY);
};

const createDiscussedFilter = (pictures) => {
  const picturesArray = pictures.slice();
  return picturesArray.sort(compareComments);
};

const removeActiveClass = () => {
  const activeButton = document.querySelector('.img-filters__button--active');
  activeButton.classList.remove('img-filters__button--active');
};

const clearPicturesContainer = () => {
  const picturesAll = document.querySelectorAll('.picture');
  picturesAll.forEach((picture) => {
    picture.remove();
  });
};

const renderPicturesFilter = (pictures) => {
  clearPicturesContainer();
  renderUserPhotos(pictures);
};

const showFilteredPictures = (pictures) => {
  filters.classList.remove('img-filters--inactive');
  defaultButton.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === defaultButton) {
      defaultButton.classList.add('img-filters__button--active');
    }
    renderPicturesFilter(createDefaultFilter(pictures));
  }));
  randomButton.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === randomButton) {
      randomButton.classList.add('img-filters__button--active');
    }
    renderPicturesFilter(createRandomFilter(pictures));
  }));
  discussedButton.addEventListener('click', debounce((evt) => {
    removeActiveClass();
    if (evt.target === discussedButton) {
      discussedButton.classList.add('img-filters__button--active');
    }
    renderPicturesFilter(createDiscussedFilter(pictures));
  }));
};

export {showFilteredPictures};
