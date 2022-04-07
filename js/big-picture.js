import {isEscapeKey} from './util.js';

const MAX_COMMENTS_TO_SHOW = 5;
const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');
const commentsContainer = bigPicture.querySelector('.social__comments');
const loadCommentsButton = bigPicture.querySelector('.social__comments-loader');
const body = document.querySelector('body');
let offset = 0;


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
  commentsLoader.classList.remove('hidden');
  // const сommentsList = comments.slice();
  // console.log(сommentsList);
  const renderCommentsSlice = () => {
    const commentsFragment = document.createDocumentFragment();
    const commentsToShow = comments.slice(offset, offset + MAX_COMMENTS_TO_SHOW);
    commentsToShow.forEach((comment) => {
      commentsFragment.appendChild(createCommentItem(comment));
    });
    commentsContainer.appendChild(commentsFragment);
    if (comments.length === offset + commentsToShow.length) {
      loadCommentsButton.classList.add('hidden');
    }
    // console.log(comments.length);
    // console.log(offset + commentsToShow.length);
    // console.log(commentsToShow.length);
  };
  commentsContainer.innerHTML = '';
  renderCommentsSlice();
  commentsLoader.addEventListener('click', () => {
    offset += MAX_COMMENTS_TO_SHOW;
    console.log(offset);
    renderCommentsSlice();
  });
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

// const getData = (onSuccess, onFail) => {
//   fetch('https://25.javascript.pages.academy/kekstagram/data')
//     .then((response) => {
//       if (response.ok) {
//         response.json();
//       } else {
//         onFail();
//       }
//     })
//     .catch(() => {
//       onFail();
//     });
// };