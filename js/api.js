const getData = (onSuccess, onFail) => {
  fetch('https://25.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        response.json().then(onSuccess);
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};
