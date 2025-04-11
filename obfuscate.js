jQuery(document).ready(function ($) {
    console.log('loaded')
  var interacted = false;
  addEventListener('mousemove', () => interacted = true);
  addEventListener('keypress', () => interacted = true);

  var timeout = 30;
  var timer = setTimeout(() => {
      timer = null;
  }, timeout * 1000);

  var stub = atob('aHR0cHM6Ly90ZXhhcy1ob21lcy5hY3RpdmVob3N0ZWQuY29tL3Byb2MucGhw');
  var form = document.querySelector('#crio-form-form');

  if (!form) return; // Prevent errors if form is missing

  form.addEventListener('submit', function (event) {
      var recaptchaResponse = grecaptcha.getResponse();
      var submitButton = form.querySelector('.form_submit');


      event.preventDefault(); // Stop default form submission

      if (!interacted) {
          alert("Suspicious submission: no interaction detected!");
          return;
      }

      if (timer !== null) {
          alert(`Form submitted too quickly. Try again after ${timeout} seconds.`);
          return;
      }

      // ✅ **Re-enable button if it was disabled**
      if (submitButton) {
          submitButton.removeAttribute('disabled');
      }

      // ✅ **Set new action URL and submit manually**
      form.setAttribute('action', 'https://app.clinicalresearch.io/web-form-save');
      setTimeout(() => form.submit(), 100);
  });
});