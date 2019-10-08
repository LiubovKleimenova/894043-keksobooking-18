'use strict';

var NUMBER_OF_USERS = 8;
var TITLES = ['Квартира', 'Комната', 'Лофт', 'Апартаменты', 'Студия', 'Дом', 'Бунгало'];
var PRICE_MAX = 550;
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
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;


var mapDialog = document.querySelector('.map');
mapDialog.classList.remove('map--faded');

var pinsContainer = mapDialog.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

// функция, для выбора случайного элемента из массива
var getRandomElement = function (anyArray) {
  return anyArray[Math.floor(Math.random() * anyArray.length)];
};

// функция для выбора случайного значения в интервале
var getRandomFromRange = function (minValue, maxValue) {
  return minValue + Math.floor((maxValue - minValue) * Math.random());
};

// создать массив слйчайной длины из существующего
var getRandomLengthArray = function (anyArray) {
  var randomArray = [];
  for (var i = 0; i < getRandomFromRange(1, anyArray.length); i++) {
    randomArray.push(getRandomElement(anyArray));
  }
  return randomArray;
};

// создаем author
var getAuthor = function (number) {
  return {
    avatar: 'img/avatars/user0' + number + '.png'
  };
};

// создаем offer
var getRandomOffer = function () {
  return {
    title: getRandomElement(TITLES),
    address: getRandomFromRange(0, LOCATION_MAX) + ', ' + getRandomFromRange(0, LOCATION_MAX),
    price: getRandomFromRange(0, PRICE_MAX),
    type: getRandomElement(TYPES),
    rooms: getRandomFromRange(ROOMS_MIN, ROOMS_MAX),
    guests: getRandomFromRange(GUESTS_MIN, GUESTS_MAX),
    checkin: getRandomElement(CHECKIN_TIMES),
    checkout: getRandomElement(CHECKOUT_TIMES),
    features: getRandomLengthArray(FEATURES),
    description: getRandomElement(DESCRIPTIONS),
    photos: getRandomLengthArray(PHOTOS)
  };
};

// создаем location
var getLocation = function () {
  return {
    x: getRandomFromRange(0, mapDialog.offsetWidth),
    y: getRandomFromRange(MIN_Y, MAX_Y)
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

var renderPin = function (pin) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style = 'left: ' + (pin.location.x - PIN_WIDTH / 2) + 'px; top: ' + (pin.location.y - PIN_HEIGHT) + 'px';
  pinElement.querySelector('img').src = pin.author.avatar;
  pinElement.querySelector('img').alt = pin.offer.title;

  return pinElement;
};

var renderPins = function (pins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(renderPin(pins[i]));
  }
  return fragment;
};

pinsContainer.appendChild(renderPins(accomodationMocks));

// перевод типов в наименования
var transformTypeToHousingName = function (accomodationType) {
  var housingName = '';
  if (accomodationType === 'flat') {
    housingName = 'Квартира';
  }
  if (accomodationType === 'bungalo') {
    housingName = 'Бунгало';
  }
  if (accomodationType === 'house') {
    housingName = 'Дом';
  }
  if (accomodationType === 'palace') {
    housingName = 'Дворец';
  }
  return housingName;
};

// вывод фичей списком, проблемы где-то здесь или в строке 153
var createFeaturesList = function (featuresArray, featureList) { // я пытаюсь создать функцию, которая принимает два параметра: массив фичей из моков и список ul из разметки (в строке 153)
  for (var i = 0; i < featuresArray.length; i++) {
    featureList.insertAdjacentHTML('afterbegin', '<li class="popup__feature popup__feature--' + featuresArray[i] + '></li>');
  }
  return featureList;
};

var renderCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = transformTypeToHousingName(card.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  createFeaturesList(card.offer.features, cardElement.querySelector('.popup__features'));
  cardElement.querySelector('.popup__description').textContent = card.offer.description;

  return cardElement;
};
