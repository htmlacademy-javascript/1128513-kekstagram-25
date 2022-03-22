import {isEscapeKey} from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');
const body = document.querySelector('body');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture ();
  }
};

const onPopupCloseButtonClick = () => {
  closeBigPicture();
};

function closeBigPicture () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsCount.classList.remove('hidden');
  commentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupCloseButtonClick);
}

const createCommentItem = (comment) => {
  const newCommentItem  = document.createElement('li');
  newCommentItem.classList.add('social__comment');
  const commentImage = document.createElement('img');
  commentImage.classList.add('social__picture');
  commentImage.src = comment.avatar;
  commentImage.alt = comment.name;
  commentImage.width = 35;
  commentImage.height = 35;
  newCommentItem.appendChild(commentImage);

  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = comment.message;
  newCommentItem.appendChild(commentText);
  return newCommentItem;
};

const renderComments = (comments) => {
  commentsContainer.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  comments.forEach((comment) => {
    commentsFragment.appendChild(createCommentItem(comment));
  });
  commentsContainer.appendChild(commentsFragment);
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

  renderComments(picture.comments);

  closeButton.addEventListener('click', onPopupCloseButtonClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

export {showBigPicture};
