import { $, d3, RSVP } from 'components/vendor';

import Semblance from 'components/forms';

export default function() {
  console.log($.fn.jquery, '** jQuery Version');
  console.log(d3.version, '** d3 Version');
  console.log(typeof RSVP === 'object' ? 'RSVP is Loaded' : '');

  Semblance.init($('form'));
}
