const getData = (onSuccess, onFail) => {
  fetch('https://25.javascript.pages.academy/kekstagram/')
    .then((response) => {
      if (response.ok) {
        response.json();
      } else {
        onFail('Ой, кажется что-то пошло не так');
      }
    })
    .catch(() => {
      onFail();
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    ' https://25.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте ещё раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте ещё раз');
    });
};

export {getData, sendData};


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
