'use strict';

var MUFFIN_WIDTH = 40;
var MUFFIN_HEIGHT = 44;

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
  window.util.mapDialog.classList.remove('map--faded');
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
