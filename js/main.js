import {createPhotos} from './data.js';
import {renderUserPhotos} from './pictures.js';
import {renderUploadForm} from './form.js';
import {initEffects} from './filters.js';


createPhotos();
renderUserPhotos();
renderUploadForm();
initEffects();
