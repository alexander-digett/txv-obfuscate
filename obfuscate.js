document.addEventListener("DOMContentLoaded", function () {
    console.log('loaded5')
  let interacted = false;
  addEventListener('mousemove', () => interacted = true);
  addEventListener('keypress', () => interacted = true);

  const timeout = 10;
  let timer = setTimeout(() => {
    timer = null;
  }, timeout * 1000);

  const stub = atob('aHR0cHM6Ly90ZXhhcy1ob21lcy5hY3RpdmVob3N0ZWQuY29tL3Byb2MucGhw');
  const form = document.querySelector('#crio-form-form');

  console.log(form)

  if (!form) return;
const submitButton = form.querySelector('.form_submit');

if (submitButton) {
  submitButton.addEventListener('click', function (event) {
    console.log('Submit button clicked');

    event.preventDefault();

    if (!interacted) {
      alert("Suspicious submission: no interaction detected!");
      return;
    }

    if (timer !== null) {
      alert(`Form submitted too quickly. Try again after ${timeout} seconds.`);
      return;
    }

    form.setAttribute('action', 'https://app.clinicalresearch.io/web-form-save');
    setTimeout(() => form.submit(), 100);
  });
}
  
});