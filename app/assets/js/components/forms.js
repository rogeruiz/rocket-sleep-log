import { $, RSVP } from 'components/vendor';

function padNumber(number) {
  number = Math.abs(number);
  if (number < 10) {
    return '0' + number;
  } else {
    return number;
  }
}

var Semblance = {
  inputTypes: [
    'date',
    'text',
    'time',
    'submit'
  ],
  setInitialValues: function($form, type) {
    var today;
    var $input = $form.find('input[type="' + type + '"]');
    switch (type) {
      case 'date':
        today = new Date();
        today = today.getFullYear() +
          '-' + padNumber((today.getMonth() + 1)) +
          '-' + padNumber(today.getDate());
        $input.val(today).trigger('change');
        break;
      case 'time':
        today = new Date();
        today = padNumber(today.getHours()) +
          ':' + padNumber(today.getMinutes());
        $input.val(today).trigger('change');
        break;
    }
  },
  init: function($forms) {
    var semblance = this;
    var $form;
    $forms.each(function() {
      $form = $(this);
      semblance.inputTypes.forEach(function(type, idx, types) {
        // semblance.setInitialValues($form, type);
        semblance.validation($form).then(function() {});
      });
    });
  },

  validation: function($form) {
    var checkTime = function checkTime(t) {/**/};
    var checkDate = function checkDate(d) {/**/};
    return new RSVP.Promise(function(resolve, reject) {
      // Once in here, call resolve when the form can be successfully submitted
      // Or call reject if the validation has failed
      var dateInput = $form.find('input[type="date"]').val();
      var timeInput = $form.find('input[type="time"]').val();
      if (checkTime(timeInput) && checkDate(dateInput)) {
        resolve();
      } else {
        reject();
      }
    });
    // });
  }
};

export default Semblance;
