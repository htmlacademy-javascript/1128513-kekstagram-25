const filters = {
  original: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    filter: 'original',
    units: '',
  },
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 0,
    step: 0.1,
    filter: 'chrome',
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

export {filters};
