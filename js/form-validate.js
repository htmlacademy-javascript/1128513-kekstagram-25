import {showBigPicture} from './big-picture.js';
import {renderUserPhotos} from './pictures.js';
import {isEscapeKey} from './util.js';


const imgUpload = document.querySelector('.img-upload__overlay');
const openForm = document.querySelector('#upload-file');
const buttonSubmit = document.querySelector('.img-upload__submit');
const imgUploadForm = document.querySelector('.img-upload__form');
const buttonCancel = imgUpload.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const hashtagField = imgUpload.querySelector('.text__hashtags');
const commentField = imgUpload.querySelector('.text__description');
const MAX_STRING_LENGTH = 140;
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const HASHTAGS_QUANTITY = 5;
// const imgContainer = imgUpload .querySelector('.img-upload__wrapper');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'text',
  errorClass: 'text--invalid',
  successClass: 'text-valid',
  errorTextParent: 'text',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

const checkCommentsLength = (value) => value.length <= MAX_STRING_LENGTH;

const getHashtags = (string) => string.split(' ').filter((item) => item !== '');
// сначала разделяем строку на массив значаний, затем каждое значание "фильтруем"(проверяем на true) колбэк функцией на пустую строку

const getUniqueHashtags = (string) => {
  const hashtags = getHashtags(string);
  const uniqueSet = new Set(hashtags);
  return hashtags.length === uniqueSet.size;
};

const checkQuantity = (string) => {
  const hashtags = getHashtags(string);
  if (hashtags.length <= HASHTAGS_QUANTITY) {
    return true;
  } else if (hashtags.length > HASHTAGS_QUANTITY) {
    return false;
  }
};

const getHashtagsToLowerCase = (string) => {
  const hashtags = getHashtags(string);
  return hashtags.map((element) => element.toLowerCase());
};


const checkHashtagsSymbols = (string) => {
  const hashtags = getHashtags(string);
  return hashtags.every((element) => re.test(element));
};


pristine.addValidator(commentField, checkCommentsLength, `Не более ${MAX_STRING_LENGTH} символов`);
pristine.addValidator(hashtagField, getUniqueHashtags, 'Хэштеги не могут повторяться');
pristine.addValidator(hashtagField, checkQuantity, 'Не более 5 хэштегов');
pristine.addValidator(hashtagField, getHashtagsToLowerCase, '');
pristine.addValidator(hashtagField, checkHashtagsSymbols, 'Хэштег должен начинатьтся с #, содержать только буквы и цифры, не более 20 символов');


// const checkValidity = () => {
//   const valid = pristine.validate();
//   if (valid) {
//     buttonSubmit.disabled = false;
//   } else {
//     buttonSubmit.disabled = true;
//   }
// };

// const activateFormValidation = () => {
//   commentField.addEventListener('input', checkValidity);
//   hashtagField.addEventListener('input', checkValidity);
// };

// const deactivateFormValidation = () => {
//   commentField.removeEventListener('input', checkValidity);
//   hashtagField.removeListener('input', checkValidity);
// };


const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadPopup();
  }
};


const onPopupCloseButtonClick = () => {
  closeUploadPopup ();
};

function closeUploadPopup  () {
  imgUpload.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupCloseButtonClick);
}

const showUploadPopup = () => {
  imgUpload.classList.remove('hidden');
  body.classList.add('modal-open');
  buttonCancel.addEventListener('click', onPopupCloseButtonClick);
  document.addEventListener('keydown',onPopupEscKeydown);
};

showUploadPopup ();
