import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('social__comments');
const body = document.querySelector('body');

const commentsFragment = document.createDocumentFragment();

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture ();
    document.removeEventListener('keydown', onPopupEscKeydown);
  }
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  commentsContainer.innerHTML = '';
}

closeButton.addEventListener ('click', closeBigPicture);

const renderComment = (comment) => {
  const newCommentItem  = document.createElement('li');
  newCommentItem.classList.add('social__comment');
  newCommentItem.innerHTML = `<img
  class="social__picture"
  src="img/${comment.avatar}"
  alt="${comment.name}"
  width="35" height="35">
<p class="social__text">${comment.message}</p>`;
  return newCommentItem;
};

const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  commentsLoader.classList.add('hidden');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  picture.comments.forEach((comment) => {
    commentsFragment.appendChild(renderComment(comment));
  });
  commentsContainer.appendChild(commentsFragment);

  document.addEventListener('keydown', onPopupEscKeydown);
};

export {showBigPicture};
