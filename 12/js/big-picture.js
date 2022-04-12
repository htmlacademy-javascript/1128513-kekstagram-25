import {isEscapeKey} from './util.js';

const MAX_COMMENTS_TO_SHOW = 5;
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentsToShowCount = bigPicture.querySelector('.social__comment-count');
const body = document.querySelector('body');
let сount = 0;
let comments = [];

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
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupCloseButtonClick);
  commentsLoader.removeEventListener('click', commentsLoaderOnClick);
  сount = 0;
  comments = [];
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

function commentsLoaderOnClick() {
  // изменяем значение сount прибавляя 5, следовательно slice станет (5, 10), отрисуется еще 5 штук
  сount += MAX_COMMENTS_TO_SHOW;
  renderCommentsSlice();
}

function renderCommentsSlice() {
  commentsContainer.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  // создаем срез комментов, будет показываться 5 штук, при клике count перезапишется
  const commentsToShow = comments.slice(0, сount + MAX_COMMENTS_TO_SHOW);
  commentsToShow.forEach((comment) => {
    commentsFragment.appendChild(createCommentItem(comment));
  });
  commentsContainer.appendChild(commentsFragment);
  if (comments.length === commentsToShow.length) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }
  commentsToShowCount.innerHTML = `${commentsToShow.length} из <span class="comments-count">${comments.length}</span> комментариев`;
}

const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  comments = picture.comments;
  renderCommentsSlice();
  commentsLoader.addEventListener('click', commentsLoaderOnClick);

  closeButton.addEventListener('click', onPopupCloseButtonClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

export {showBigPicture};
