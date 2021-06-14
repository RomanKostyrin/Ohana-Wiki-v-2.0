var link = document.querySelector('.mainHeader__link--signIn')
var popup = document.querySelector('.signIn')
var close = document.querySelector('.btn--close')
var form = document.querySelector('.signIn__form')
var login = document.querySelector('[name=login]')
var email = document.querySelector('[name=email]')
var comment = document.querySelector('[name=commeny]')
var mapLink = document.querySelector('.map-link')
var map = document.querySelector('.map')
var buy = document.querySelector('.btn--shop-item')
var cart = document.querySelector('.cart')
var desSliderLeft = document.querySelector('.description-slider__btn--left')
var desSliderRight = document.querySelector('.description-slider__btn--right')
var slideFirst = document.querySelector('.description-slider__slide--first')
var slideSecond = document.querySelector('.description-slider__slide--second')
var delivery = document.querySelector('.slider-buttons__item--first')
var garantee = document.querySelector('.slider-buttons__item--second')
var credit = document.querySelector('.slider-buttons__item--third')
var deliveryDescription = document.querySelector('.slider-item__first')
var garanteeDescription = document.querySelector('.slider-item__second')
var creditDescription = document.querySelector('.slider-item__third')

if (delivery) {
  delivery.addEventListener('click', function (event) {
    if (delivery.disabled == false) {
      delivery.disabled = true
      garantee.disabled = false
      credit.disabled = false
      deliveryDescription.classList.remove('visually-hidden')
      garanteeDescription.classList.add('visually-hidden')
      creditDescription.classList.add('visually-hidden')
    }
  })
}
if (garantee) {
  garantee.addEventListener('click', function (event) {
    if (garantee.disabled == false) {
      garantee.disabled = true
      delivery.disabled = false
      credit.disabled = false
      deliveryDescription.classList.add('visually-hidden')
      garanteeDescription.classList.remove('visually-hidden')
      creditDescription.classList.add('visually-hidden')
    }
  })
}
if (credit) {
  credit.addEventListener('click', function (event) {
    if (credit.disabled == false) {
      credit.disabled = true
      delivery.disabled = false
      garantee.disabled = false
      deliveryDescription.classList.add('visually-hidden')
      garanteeDescription.classList.add('visually-hidden')
      creditDescription.classList.remove('visually-hidden')
    }
  })
}

if (desSliderRight) {
  desSliderRight.addEventListener('click', function (event) {
    if (!desSliderRight.disabled) {
      desSliderRight.disabled = true
      desSliderLeft.disabled = false
      slideFirst.classList.remove('visually-hidden')
      slideSecond.classList.add('visually-hidden')
    }
  })
}
if (desSliderLeft) {
  desSliderLeft.addEventListener('click', function (event) {
    if (!desSliderLeft.disabled) {
      desSliderLeft.disabled = true
      desSliderRight.disabled = false
      slideSecond.classList.remove('visually-hidden')
      slideFirst.classList.add('visually-hidden')
    }
  })
}

if (link) {
  link.addEventListener('click', function (event) {
    event.preventDefault()
    popup.classList.add('popup--show')
  })
}
if (mapLink) {
  mapLink.addEventListener('click', function (event) {
    event.preventDefault()
    map.classList.add('popup--show')
  })
}
//При нажатии крестика закрывается окно
let closes = document.querySelectorAll('.btnClose')
for (let btnClose of closes) {
  btnClose.addEventListener('click', function (event) {
    if (popup) {
      if (popup.classList.contains('popup--show')) {
        event.preventDefault()
        popup.classList.remove('popup--show')
        popup.classList.remove('popup--error')
      }
    }
    if (map) {
      if (map.classList.contains('popup--show')) {
        event.preventDefault()
        map.classList.remove('popup--show')
      }
    }
    if (cart) {
      if (cart.classList.contains('popup--show')) {
        event.preventDefault()
        cart.classList.remove('popup--show')
      }
    }
  })
}
//При нажатии сабмит срабатывает ошибка
if (form) {
  form.addEventListener('submit', function (event) {
    if (!login.value || !email.value || !comment.value) {
      event.preventDefault()
      popup.classList.add('popup--error')
    }
  })
}
//При нажатии Esc закрывается окно
window.addEventListener('keydown', function (event) {
  if (event.keyCode === 27) {
    if (popup) {
      if (popup.classList.contains('popup--show')) {
        popup.classList.remove('popup--show')
      }
    }
    if (map) {
      if (map.classList.contains('popup--show')) {
        map.classList.remove('popup--show')
      }
    }
    if (cart) {
      if (cart.classList.contains('popup--show')) {
        cart.classList.remove('popup--show')
      }
    }
  }
})

let buys = document.querySelectorAll('.btn--shop-item')
for (let btnShop of buys) {
  btnShop.addEventListener('click', function (event) {
    if (buy) {
      event.preventDefault()
      cart.classList.add('popup--show')
    }
  })
}
if (cart) {
  close.addEventListener('click', function (event) {
    event.preventDefault()
    cart.classList.remove('popup--show')
  })
}
