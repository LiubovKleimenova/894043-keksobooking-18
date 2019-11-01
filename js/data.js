'use strict';

(function () {
  var NUMBER_OF_USERS = 8;
  var TITLES = ['Квартира', 'Комната', 'Лофт', 'Апартаменты', 'Студия', 'Дом', 'Бунгало'];
  var PRICE_MAX = 5500;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var ROOMS_MAX = 6;
  var ROOMS_MIN = 1;
  var GUESTS_MAX = 5;
  var GUESTS_MIN = 1;
  var LOCATION_MAX = 500;
  var CHECKIN_TIMES = ['12:00', '13:00', '14:00'];
  var CHECKOUT_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Уютное тихое место с видом во двор', 'Просторное помещение с высокими потолками', 'Удобное расположение в историческом центре'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var MIN_Y = 130;
  var MAX_Y = 630;

  // создаем author
  var getAuthor = function (number) {
    return {
      avatar: 'img/avatars/user0' + number + '.png'
    };
  };

  // создаем offer
  var getRandomOffer = function () {
    return {
      title: window.util.getRandomElement(TITLES),
      address: window.util.getRandomFromRange(0, LOCATION_MAX) + ', ' + window.util.getRandomFromRange(0, LOCATION_MAX),
      price: window.util.getRandomFromRange(0, PRICE_MAX),
      type: window.util.getRandomElement(TYPES),
      rooms: window.util.getRandomFromRange(ROOMS_MIN, ROOMS_MAX),
      guests: window.util.getRandomFromRange(GUESTS_MIN, GUESTS_MAX),
      checkin: window.util.getRandomElement(CHECKIN_TIMES),
      checkout: window.util.getRandomElement(CHECKOUT_TIMES),
      features: window.util.getRandomLengthArray(FEATURES),
      description: window.util.getRandomElement(DESCRIPTIONS),
      photos: window.util.getRandomLengthArray(PHOTOS)
    };
  };

  // создаем location
  var getLocation = function () {
    return {
      x: window.util.getRandomFromRange(0, window.util.mapDialog.offsetWidth),
      y: window.util.getRandomFromRange(MIN_Y, MAX_Y)
    };
  };

  var getAccomodation = function (number) {
    return {
      author: getAuthor(number),
      offer: getRandomOffer(),
      location: getLocation()
    };
  };

  var getAccomodationsArray = function (number) {
    var accomodations = [];
    for (var i = 0; i < number; i++) {
      accomodations.push(getAccomodation(i + 1));
    }
    return accomodations;
  };

  var accomodationMocks = getAccomodationsArray(NUMBER_OF_USERS);
  window.data = {
    mocks: accomodationMocks,
    FEATURES: FEATURES
  };
})();
