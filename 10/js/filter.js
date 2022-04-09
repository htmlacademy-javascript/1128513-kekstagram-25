import {renderUserPhotos} from './pictures.js';
import {getRandomUniqueElements, debounce} from './util.js';


const RANDOM_QUANTITY = 10;
const filters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');

const compareComments = (photoA, photoB) => {
  const rankA = photoA.comments.length;
  const rankB = photoB.comments.length;
  return rankB - rankA;
};

const defautlFilter = (pictures) => pictures.slice();

const randomFilter = (pictures) => {
  const picturesArray = pictures.slice();
  return getRandomUniqueElements(picturesArray.slice(0, RANDOM_QUANTITY));
};

const discussedFilter = (pictures) => {
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
  const showFilteredPicturesOnClick = (evt) => {
    if (evt.target.matches('.img-filters__button')) {
      removeActiveClass();
      evt.target.classList.add('img-filters__button--active');
    }
    if (evt.target.matches('#filter-default')) {
      renderPicturesFilter(defautlFilter(pictures));
    }
    if (evt.target.matches('#filter-random')) {
      renderPicturesFilter(randomFilter(pictures));
    }
    if (evt.target.matches('#filter-discussed')) {
      renderPicturesFilter(discussedFilter(pictures));
    }
  };
  filtersForm.addEventListener('click', debounce(showFilteredPicturesOnClick));
};

export {showFilteredPictures};
