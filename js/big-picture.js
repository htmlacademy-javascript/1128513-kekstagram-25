import {isEscapeKey} from './util.js';

const MAX_COMMENTS_TO_SHOW = 5;
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');
const body = document.querySelector('body');
let сount = 0;


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
  // commentsLoader.classList.remove('hidden');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupCloseButtonClick);
  сount = 0;
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
  const renderCommentsSlice = () => {
    console.log('функция запустилась');
    const commentsFragment = document.createDocumentFragment();
    // создаем срез комментов, будет показываться 5 штук
    const commentsToShow = comments.slice(сount, сount + MAX_COMMENTS_TO_SHOW);
    console.log('commentsToShow',commentsToShow.length);
    console.log("сount", сount);
    commentsToShow.forEach((comment) => {
      commentsFragment.appendChild(createCommentItem(comment));
    });
    commentsContainer.appendChild(commentsFragment);
    console.log('сount + commentsToShow.length', сount + commentsToShow.length);
    console.log('comments.length', comments.length);
    if (comments.length === сount + commentsToShow.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };
  function commentsLoaderOnClick() {
    // изменяем значение сount прибавляя 5, следовательно slice станет (5, 10), отрисуется еще 5 штук
    сount += MAX_COMMENTS_TO_SHOW;
    renderCommentsSlice();
  }
  // здесь вызвали чтобы отрисовать 5 штук на странице
  renderCommentsSlice();
  commentsLoader.addEventListener('click', commentsLoaderOnClick);
};


const showBigPicture = (picture) => {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsCount.classList.add('hidden');
  // commentsLoader.classList.add('hidden');
  bigPicture.querySelector('.big-picture__img img').src = picture.url;
  bigPicture.querySelector('.likes-count').textContent = picture.likes;
  bigPicture.querySelector('.comments-count').textContent = picture.comments.length;
  bigPicture.querySelector('.social__caption').textContent = picture.description;

  renderComments(picture.comments);

  closeButton.addEventListener('click', onPopupCloseButtonClick);
  document.addEventListener('keydown', onPopupEscKeydown);
};

export {showBigPicture};
