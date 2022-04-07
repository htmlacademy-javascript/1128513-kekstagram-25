import {renderUserPhotos} from './pictures.js';
import {initEffects} from './filters.js';
import {closeUploadPopup} from './form.js';
import {submitForm} from './form.js';
import {getData} from './api.js';

getData((pictures) => {
  renderUserPhotos(pictures);
});

submitForm(closeUploadPopup);
initEffects();
