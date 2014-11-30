import { $ } from 'components/vendor';

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
    return;
    var semblance = this;
    var $form;
    $forms.each(function() {
      $form = $(this);
      semblance.inputTypes.forEach(function(type, idx, types) {
        semblance.setInitialValues($form, type);
      });
    });
  }
};

export default Semblance;
