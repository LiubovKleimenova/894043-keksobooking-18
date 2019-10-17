'use strict';

// var NUMBER_OF_USERS = 8;
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
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ENTER_KEYCODE = 13;
var MUFFIN_WIDTH = 40;
var MUFFIN_HEIGHT = 44;


var mapDialog = document.querySelector('.map');


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

// var accomodationMocks = getAccomodationsArray(NUMBER_OF_USERS);

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

// pinsContainer.appendChild(renderPins(accomodationMocks));

// перевод типов в наименования
var accomodationMap = {
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец'
};

var transformTypeToHousingName = function (accomodationType) {
  return accomodationMap[accomodationType];
};

// функция для проверки есть ли элемент в массиве
var checkPresence = function (element, array) {
  if (array.indexOf(element) === -1) {
    return false;
  } else {
    return true;
  }
};

// показ фичей из списка
var showFeaturesFromList = function (featuresArray, featureList) { // я пытаюсь создать функцию, которая принимает два параметра: массив фичей из моков и список ul из разметки (в строке 153)
  for (var i = 0; i < FEATURES.length; i++) {
    if (checkPresence(FEATURES[i], featuresArray)) {
      featureList.querySelector('.popup__feature--' + FEATURES[i]).style.display = 'block';
    } else {
      featureList.querySelector('.popup__feature--' + FEATURES[i]).style.display = 'none';
    }
  }
};

// показ фото
var showPhotosList = function (photosList, photosArray) {
  photosList.children[0].src = photosArray[0];
  for (var i = 1; i < photosArray.length; i++) {
    var photo = photosList.children[0].cloneNode(true);
    photo.src = photosArray[i];
  }
};

var renderCard = function (card) {
  var cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + ' ₽/ночь';
  cardElement.querySelector('.popup__type').textContent = transformTypeToHousingName(card.offer.type);
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  showFeaturesFromList(card.offer.features, cardElement.querySelector('.popup__features'));
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  showPhotosList(cardElement.querySelector('.popup__photos'), card.offer.photos);
  return cardElemen
};

// mapDialog.insertBefore(renderCard(accomodationMocks[0]), mapDialog.querySelector('.map__filters-container'));


var mapPinMain = document.querySelector('.map__pin--main');

// при открытии страницы все формы в ней неактивны:
var adForm = document.querySelector('.ad-form');
var adFormFieldsetCollection = adForm.querySelectorAll('fieldset');

for (var i = 0; i < adFormFieldsetCollection.length; i++) {
  adFormFieldsetCollection[i].setAttribute('disabled', true);
}

var mapFiltersForm = document.querySelector('.map__filters');
mapFiltersForm.setAttribute('disabled', true);


// заполнение поля адреса
var pinPositionX = Math.round(mapPinMain.getBoundingClientRect().left + MUFFIN_WIDTH / 2);
var pinPositionY = Math.round(mapPinMain.getBoundingClientRect().top + MUFFIN_HEIGHT / 2);


var fillAddsress = function (x, y) {
  var addressForm = adForm.querySelector('#address');
  addressForm.value = x + ', ' + y;
}

fillAddsress(pinPositionX, pinPositionY);

var activateForms = function () {
  mapDialog.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  mapFiltersForm.removeAttribute('disabled');
  for (var i = 0; i < adFormFieldsetCollection.length; i++) {
    adFormFieldsetCollection[i].removeAttribute('disabled');
  }
  pinPositionX = Math.round(mapPinMain.getBoundingClientRect().left + MUFFIN_WIDTH / 2);
  pinPositionY = Math.round(mapPinMain.getBoundingClientRect().top + MUFFIN_HEIGHT + PIN_HEIGHT);
  fillAddsress(pinPositionX, pinPositionY);
}

mapPinMain.addEventListener('mousedown', activateForms);
mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activateForms();
  }
});

// валидация соответстия количества гостей количеству комнат

var roomNumber = adForm.querySelector('#room_number');
var roomCapacity = adForm.querySelector('#capacity');

var validateGuestsNumber = function () {
  if (roomCapacity.value == '0' && roomNumber.value !== '100') {
   roomNumber.setCustomValidity('Данное помещение не подходит для мероприятий. Выберите помещение на 100 комнат');
 } else if (roomNumber.value == '1' && roomCapacity.value !== '1') {
    roomNumber.setCustomValidity('В одной комнате не может проживать более одного человека. Выберите помещение с большим количеством комнат');
  } else if (roomNumber.value == '2' && (roomCapacity.value == '3' || roomCapacity.value == '0')) {
    roomNumber.setCustomValidity('В двух комнатах не может проживать более двух человек. Выберите помещение с большим количеством комнат');
  } else if (roomCapacity.value !== '0' && roomNumber.value == '100') {
    roomNumber.setCustomValidity('Данное помещение подходит только для мероприятий, а не для размещения гостей');
  }
  else {
    roomNumber.setCustomValidity('');
  }
};




// валидация заголовка для объеявления
var adTitle = adForm.querySelector('#title');

var validateTitle = function () {
  if (adTitle.validity.tooShort) {
    adTitle.setCustomValidity('Не менее 30 символов');
  } else if (adTitle.validity.tooLong) {
    adTitle.setCustomValidity('Не более 100 символов');
  } else if (adTitle.validity.valueMissing) {
    adTitle.setCustomValidity('Введите описание');
  } else {
    adTitle.setCustomValidity('');
  }
};

// валидация соответствия типа жилья и цены
var adPrice = adForm.querySelector('#price');
var adType = adForm.querySelector('#type');
var priceMap = {
  flat: 1000,
  bungalo: 0,
  house: 5000,
  palace: 10000
};

adPrice.placeholder=priceMap[adType.value];
adPrice.min=priceMap[adType.value];

adType.addEventListener('change', function () {
    adPrice.placeholder = priceMap[adType.value];
    adPrice.min = priceMap[adType.value];
});


var validatePrice =  function () {
  if (adPrice.value > 1000000) {
    adPrice.setCustomValidity('Значение поля должно быть числом менее или равным 1\'000\'000')
  } else if (adPrice.value < adPrice.min) {
    adPrice.setCustomValidity('Значение поля для данного типа жилья не дожно быть ниже ' + adPrice.min);
  } else {
    adPrice.setCustomValidity('');
  }
};

//  соответствие времени выезда времени заезда
var adTimeIn = adForm.querySelector('#timein');
var adTimeOut = adForm.querySelector('#timeout');

adTimeOut.value = adTimeIn.value;
adTimeIn.addEventListener('change', function () {
    adTimeOut.value = adTimeIn.value;
});

var validateCheckin = function () {
  if (adTimeOut.value !== adTimeIn.value) {
    adTimeOut.setCustomValidity('Время выезда должно совпадать с временем заезда');
  } else {
    adTimeOut.setCustomValidity('');
  }
}

var submitBtn = adForm.querySelector('.ad-form__submit');
  submitBtn.addEventListener('click', function () {
    validateTitle();
    validateGuestsNumber();
    validateCheckin();
    validatePrice();
  });
