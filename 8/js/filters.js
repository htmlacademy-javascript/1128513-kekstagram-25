const effects = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    filter: 'grayscale',
    units: '',
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    filter: 'sepia',
    units: ''
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 0,
    step: 1,
    filter: 'invert',
    units: '%'
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 0,
    step: 0.1,
    filter: 'blur',
    units: 'px',
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 0,
    step: 0.1,
    filter: 'brightness',
    units: '',
  },
};
const scaleValue = document.querySelector('.scale__control--value');
const scaleContainer = document.querySelector('.img-upload__scale');
const slider = document.querySelector('.effect-level__slider');
const sliderWrapper = document.querySelector('.effect-level');
const effectValue = document.querySelector('.effect-level__value');
const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const effectList = document.querySelector('.effects__list');
const scaleStep = 25;
const minScale = 25;
const maxScale = 100;


const onScaleButtonClick = (evt) => {
  const scaleInput = Number.parseInt(scaleValue.value, 10);
  let scaleCount;
  const buttonScale = evt.target;
  if (buttonScale.matches('.scale__control--bigger') && scaleInput < maxScale) {
    scaleCount =  scaleInput + scaleStep;
    scaleValue.value = `${scaleCount}%`;
  }

  if (buttonScale.matches('.scale__control--smaller') && scaleInput > minScale) {
    scaleCount = scaleInput - scaleStep;
    scaleValue.value = `${scaleCount}%`;
  }

  if (scaleCount >= maxScale) {
    scaleCount = maxScale;
    scaleValue.value = `${scaleCount}%`;
  }

  if (scaleCount <= minScale) {
    scaleCount = minScale;
    scaleValue.value = `${scaleCount}%`;
  }
  imgPreview.style.transform = `scale(${scaleCount / 100})`;
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});

const onFilterButtonChange = (evt) => {
  const evtHandler = evt.target.value;
  if (evtHandler === 'none') {
    sliderWrapper.classList.add('hidden');
    imgPreview.style.filter = 'none';
  }  else {
    sliderWrapper.classList.remove('hidden');
    imgPreview.removeAttribute('class');
    imgPreview.classList.add(`effects__preview--${evtHandler}`);
    slider.noUiSlider.updateOptions(effects[evtHandler].filter);
    slider.noUiSlider.on('update', () => {
      effectValue.value = slider.noUiSlider.get();
      imgPreview.style.filter = `${effects[evtHandler].filter}(${effectValue.value}${effects[evtHandler].units})`;
    });
  }
};

export {onFilterButtonChange, onScaleButtonClick, scaleContainer, effectList, sliderWrapper};
