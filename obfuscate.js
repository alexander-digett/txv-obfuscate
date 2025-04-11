document.addEventListener("DOMContentLoaded", function () {
    console.log('loaded')
  let interacted = false;
  addEventListener('mousemove', () => interacted = true);
  addEventListener('keypress', () => interacted = true);

  const timeout = 30;
  let timer = setTimeout(() => {
    timer = null;
  }, timeout * 1000);

  const stub = atob('aHR0cHM6Ly90ZXhhcy1ob21lcy5hY3RpdmVob3N0ZWQuY29tL3Byb2MucGhw');
  const form = document.querySelector('#crio-form-form');

  if (!form) return;

  form.addEventListener('submit', function (event) {
    const recaptchaResponse = grecaptcha.getResponse();
    const submitButton = form.querySelector('.form_submit');

    if (!recaptchaResponse) {
      alert("Please complete the reCAPTCHA before submitting.");
      return;
    }

    event.preventDefault();

    if (!interacted) {
      alert("Suspicious submission: no interaction detected!");
      return;
    }

    if (timer !== null) {
      alert(`Form submitted too quickly. Try again after ${timeout} seconds.`);
      return;
    }

    if (submitButton) {
      submitButton.removeAttribute('disabled');
    }

    form.setAttribute('action', 'https://app.clinicalresearch.io/web-form-save');
    setTimeout(() => form.submit(), 100);
  });
});
