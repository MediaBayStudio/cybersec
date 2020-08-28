;
(function() {

  $('#searchform').on('submit', function() {
    event.preventDefault();
  });

  if (!$.validator) {
    return;
  }

  $('form:not(#commentform)').each(function() {
    $(this).validate({
      rules: {
        'user-name': {
          required: true,
          userName: true,
          minlength: 2
        },
        'user-email': {
          required: true,
          email: true
        },
        'user-msg': {
          required: true,
          userMsg: true,
        },
        'policy': {
          required: true,
          minlength: 1
        }
      },
      messages: {
        'user-name': {
          required: 'Укажите имя',
          minlength: jQuery.validator.format('Имя не может быть таким коротким'),
          userName: 'Допустимы только буквы'
        },
        'user-email': {
          required: 'Укажите E-mail',
          email: 'Укажите верный E-mail'
        },
        'user-msg': {
          required: 'Введите сообщение',
          userMsg: 'Введены недопустимые символы'
        },
        'policy': {
          required: 'Согласитель с политикой обработки персональных данных'
        }
      },
      onfocusout: false,
      errorClass: 'invalid',
      submitHandler: function(form, event) {
        event.preventDefault();

        $(form).find('.field__inp, .field__textarea').removeClass('filled');

        thanksPopup.openPopup();
        thanksPopupTimer = setTimeout(function() {
          thanksPopup.closePopup();
        }, 5000);

        $(this)[0].resetForm();

      }
    });
  });

  $('#commentform').validate({
    messages: {
      author: {
        required: 'Укажите имя или ник'
      },
      email: {
        required: 'Укажите Email',
        email: 'Укажите верный Email'
      },
      comment: {
        required: 'Напишите комментарий'
      }
    },
    onfocusout: false,
    errorClass: 'invalid'
    // submitHandler: function(form, event) {
    //   event.preventDefault();
    //   console.log('submit');
    // }
  });

  // form beforesubmit validate
  $('form .btn').on('click', function() {
    if (!$(event.target).parents('form').valid()) {
      event.preventDefault();
    }
  });

  $('.field__inp, .field__textarea').on('input', function() {
    if ($(this).val() !== '') {
      $(this).addClass('filled');
    } else {
      $(this).removeClass('filled');
    }
  });


  $.validator.methods.userName = function(value) {
    return /^[а-яёА-ЯЁa-zA-Z\s]+$/.test(value);
  };

  $.validator.methods.userPhone = function(value) {
    return /\+7\([0-9]{3}\)[0-9]{3}\-[0-9]{2}\-[0-9]{2}/.test(value);
  };

  $.validator.methods.userMsg = function(value) {
    return /[^\<\>\[\]%'`]+$/.test(value);
  };

})();