'use strict';

(function () {
  var mapDialog = document.querySelector('.map');
  window.util = {
    getRandomElement: function (anyArray) {
      return anyArray[Math.floor(Math.random() * anyArray.length)];
    },
    getRandomFromRange: function (minValue, maxValue) {
      return minValue + Math.floor((maxValue - minValue) * Math.random());
    },
    getRandomLengthArray: function (anyArray) {
      var randomArray = [];
      for (var i = 0; i < this.getRandomFromRange(1, anyArray.length); i++) {
        randomArray.push(this.getRandomElement(anyArray));
      }
      return randomArray;
    },
    mapDialog: mapDialog
  };
})();
