import {isEscapeKey} from './util.js';

const imgUploadField = document.querySelector('#upload-file');
const editPhoto = document.querySelector('.img-upload__overlay');
const buttonSubmit = document.querySelector('.img-upload__submit');
const form = document.querySelector('.img-upload__form');
const buttonCancel = document.querySelector('.img-upload__cancel');
const body = document.querySelector('body');
const hashtagsField = document.querySelector('.text__hashtags');
const commentsField = document.querySelector('.text__description');
const MAX_STRING_LENGTH = 140;
const re = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const HASHTAGS_QUANTITY = 5;

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
  editPhoto.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  document.removeEventListener('click', onPopupCloseButtonClick);
  form.reset();
}
// событие focus вызывается тогда, когда пользователь фокусируется на элементе или просто выбирает его, а blur – когда фокус исчезает
const onFocusBlurEscKeydown = () => {
  commentsField.addEventListener('focus', () => {
    document.removeEventListener('keydown', onPopupEscKeydown);
  });
  commentsField.addEventListener('blur', () => {
    document.addEventListener('keydown', onPopupEscKeydown);
  });
  hashtagsField.addEventListener('focus', () => {
    document.removeEventListener('keydown', onPopupEscKeydown);
  });
  hashtagsField.addEventListener('blur', () => {
    document.addEventListener('keydown', onPopupEscKeydown);
  });
};

const showUploadPopup = () => {
  editPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  buttonCancel.addEventListener('click', onPopupCloseButtonClick);
  document.addEventListener('keydown',onPopupEscKeydown);
  onFocusBlurEscKeydown();
};

const validateForm = () => {
  const pristine = new Pristine(form, {
    classTo: 'text',
    errorClass: 'text--invalid',
    successClass: 'text-valid',
    errorTextParent: 'text',
    errorTextTag: 'div',
    errorTextClass: 'text__error'
  });
  pristine.addValidator(commentsField, checkCommentsLength, `Не более ${MAX_STRING_LENGTH} символов`);
  pristine.addValidator(hashtagsField, getUniqueHashtags, 'Хэштеги не могут повторяться');
  pristine.addValidator(hashtagsField, checkQuantity, 'Не более 5 хэштегов');
  pristine.addValidator(hashtagsField, getHashtagsToLowerCase, '');
  pristine.addValidator(hashtagsField, checkHashtagsSymbols, 'Хэштег должен начинатьтся с #, содержать только буквы и цифры, не более 20 символов');
  form.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
};

const renderUploadForm = () => {
  imgUploadField.addEventListener('change', showUploadPopup);
  validateForm();
};

export {renderUploadForm};
