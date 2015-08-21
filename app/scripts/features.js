// jshint devel:true

(function (WWCD) {
  'use strict';

  WWCD.featuresGroups = [
    {
      heading: 'first',
      features: [
        {
          id: 'asdf',
          icon: 'mdi-device-sd-storage',
          name: 'asdf!',
          supported: true
        },
        {
          id: 'dfg',
          name: 'sdf!',
          supported: false
        }
      ]
    },
    {
      heading: 'second',
      features: [
        {
          id: 'lklj',
          name: 'lkjlkj!',
          supported: false
        },
        {
          id: 'oipoi',
          name: 'poipoi!',
          supported: true
        }
      ]
    }
  ];

})(window.WWCD = (window.WWCD || {}));
