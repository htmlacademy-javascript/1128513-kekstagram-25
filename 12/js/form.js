import {isEscapeKey} from './util.js';
import {onFilterButtonChange, onScaleButtonClick, scaleContainer, effectList, sliderWrapper} from './effects.js';
import {sendData} from './api.js';
import {showMessageSuccess, showMessageError} from './messages.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png', 'heic'];
const MAX_STRING_LENGTH = 140;
const HASHTAGS_QUANTITY = 5;
const imgUploadField = document.querySelector('#upload-file');
const editPhoto = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const buttonCancel = document.querySelector('.img-upload__cancel');
const buttonSubmit = document.querySelector('.img-upload__submit');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const body = document.querySelector('body');
const hashtagsField = document.querySelector('.text__hashtags');
const commentsField = document.querySelector('.text__description');
const regex = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;
const fileChooser = document.querySelector('.img-upload__input');

const uploadImage = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
};

const checkCommentsLength = (value) => value.length <= MAX_STRING_LENGTH;

const getHashtags = (string) => string.split(' ').filter((item) => item !== '');
// сначала разделяем строку на массив значаний, затем каждое значание "фильтруем"(проверяем на true) колбэк функцией на пустую строку

const getUniqueHashtags = (string) => {
  const hashtags = getHashtags(string);
  const uniqueSet = new Set(hashtags);
  return hashtags.length === uniqueSet.size;
};

const checkQuantity = (string) => getHashtags(string).length <= HASHTAGS_QUANTITY;

const getHashtagsToLowerCase = (string) => {
  const hashtags = getHashtags(string);
  return hashtags.map((element) => element.toLowerCase());
};


const checkHashtagsSymbols = (string) => {
  const hashtags = getHashtags(string);
  return hashtags.every((element) => regex.test(element));
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
  scaleContainer.removeEventListener('click', onScaleButtonClick);
  effectList.removeEventListener('change', onFilterButtonChange);
  imgPreview.removeAttribute('class');
  imgPreview.removeAttribute('style');
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

const blockSubmitButton = () => {
  buttonSubmit.disabled = true;
  buttonSubmit.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  buttonSubmit.disabled = false;
  buttonSubmit.textContent = 'Опубликовать';
};


function showUploadPopup (evt) {
  editPhoto.classList.remove('hidden');
  body.classList.add('modal-open');
  buttonCancel.addEventListener('click', onPopupCloseButtonClick);
  document.addEventListener('keydown',onPopupEscKeydown);
  onFocusBlurEscKeydown();
  sliderWrapper.classList.add('hidden');
  scaleContainer.addEventListener('click', onScaleButtonClick);
  effectList.addEventListener('change', onFilterButtonChange);
  uploadImage(evt);
}

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


const submitForm = (onSuccess) => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
          unblockSubmitButton();
          showMessageSuccess();
          closeUploadPopup();
        },
        () => {
          unblockSubmitButton();
          showMessageError();
          closeUploadPopup();
        },
        new FormData(evt.target),
      );
    }
  });
};

imgUploadField.addEventListener('change', showUploadPopup);

export {closeUploadPopup, submitForm, imgUploadField, showUploadPopup, body};
