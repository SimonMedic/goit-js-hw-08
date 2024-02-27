import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

const formMessage = document.createElement('div');
formMessage.className = 'form-message';
formMessage.style.color = 'red';
form.append(formMessage);

let formErrors = [];

const formState = JSON.parse(localStorage.getItem(localStorageKey)) || {
  email: '',
  message: '',
};

const updateFormState = element => {
  formState[element.name] = element.value;
  localStorage.setItem(localStorageKey, JSON.stringify(formState));
};

form.elements.email.value = formState.email;
form.elements.message.value = formState.message;

form.addEventListener(
  'input',
  throttle(({ target }) => {
    updateFormState(target);
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();

  formErrors = [];
  ['email', 'message'].forEach(field => {
    if (formState[field].trim().length === 0) {
      formErrors.push(
        `Please fill the '${
          field.charAt(0).toUpperCase() + field.slice(1)
        }' field!`
      );
    }
  });

  if (formErrors.length === 0) {
    console.log(formState);
    localStorage.removeItem(localStorageKey);
    form.reset();
    formMessage.innerHTML = '';
  } else {
    formMessage.innerHTML = `<h4>Please correct the following errors before submitting:</h4>
        <ul>
            ${formErrors.map(error => `<li>${error}</li>`).join('')}
        </ul>`;
  }
});
