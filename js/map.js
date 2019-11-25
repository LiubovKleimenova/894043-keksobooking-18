'use strict';

(function () {

  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var ENTER_KEYCODE = 13;

  var pinsContainer = window.util.mapDialog.querySelector('.map__pins');
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');


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

   pinsContainer.appendChild(renderPins(window.data.mocks));

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
    for (var i = 0; i < window.data.FEATURES.length; i++) {
      if (checkPresence(window.data.FEATURES[i], featuresArray)) {
        featureList.querySelector('.popup__feature--' + window.data.FEATURES[i]).style.display = 'block';
      } else {
        featureList.querySelector('.popup__feature--' + window.data.FEATURES[i]).style.display = 'none';
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
    return cardElement;
  };

   window.util.mapDialog.insertBefore(renderCard(window.data.mocks[0]), window.util.mapDialog.querySelector('.map__filters-container'));

   window.map = {
     pin_width: PIN_WIDTH,
     pin_height: PIN_HEIGHT
   }
})();
