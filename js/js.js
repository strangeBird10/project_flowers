'use strict'

$(document).ready(function () {
    new WOW({
        animateClass: 'animate__animated',
    }).init();

    $('.multiple-items').slick({
        dots: true,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 1047,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: false,
                    adaptiveHeight: true,
                }
            },
        ]
    });
    $('.multiple-items').on('afterChange', function (event, slick) {
        $("#num-slide").html(slick.currentSlide + 1 + "/" + slick.slideCount);
    });

    const domElements = {
        formFields: {
            name: $('#name'),
            phone: $('#phone'),
            product: $('#product'),

        },
        borderInput: $('.order-input'),
        checkbox: $('#checkbox'),
        checkboxCustom: $('.checkbox-custom'),
        loader: $('#loader'),
        submit:$('#submit')
    }
    const errorMessages = {
        name: 'Введите корректное имя',
        phone: 'Введите номер телефона',
        product: 'Выберете продукт',
        checkbox: 'Необходимо согласиться с условиями',
    }

    domElements.submit.on ('click', onRegister );

    function onRegister() {
        if (isFormValid()) {
            domElements.loader.css('display', 'flex');
            $.ajax({
                method: "POST",
                url: "https://testologia.site/checkout",
                data: {product: domElements.formFields.product.val(), name: domElements.formFields.name.val(), phone:domElements.formFields.phone.val()}
            })
                .done(function (msg) {
                    domElements.loader.hide();
                    if (msg.success) {
                        $('.form-container').hide();
                        $('.success-order').css('display', 'block');
                    } else {
                        alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                    }
                });
        }
    }

    function isFormValid() {
        resetErrorMessage();
        let isValid = true;

        if (!domElements.formFields.name.val()) {
            showValidationMessage(domElements.formFields.name, errorMessages.name);
            isValid = false;
        }
        if (!domElements.formFields.phone.val()) {
            showValidationMessage(domElements.formFields.phone, errorMessages.phone);
            isValid = false;
        }
        if (!domElements.formFields.product.val()) {
            showValidationMessage(domElements.formFields.product, errorMessages.product);
            isValid = false;
        }

        if (!domElements.checkbox.prop("checked")) {
            showValidationMessage(domElements.checkboxCustom, errorMessages.checkboxCustom);
            isValid = false;
        }

        return isValid;
    }


    function resetErrorMessage() {
        $('.error-input').hide();
        domElements.borderInput.css('border-color', 'black');
        domElements.checkboxCustom.css('border-color', 'black');
    }

    function showValidationMessage(element, message) {
        element.next().text(message).show();
        element.css('border-color', 'red');
    }


    $('.close-order').on("click", function () {
        $(".success-order").remove();
        $(".order-input").val("");
        $('.checkbox').prop("checked", false);

        $("#form").show();

    });


    $('.menu-item a').on('click', function (event) {
        let anchor = $(this).attr('href');
        smoothScrollToElement(anchor);
        event.preventDefault();
    });

    $('.btn-main').on('click', function (event) {
        let anchor = $('.products');
        smoothScrollToElement(anchor);
        event.preventDefault();
    });

    function smoothScrollToElement(targetElement) {
        $('html, body').stop().animate({
            scrollTop: $(targetElement).offset().top
        }, {
            duration: 2000,
            specialEasing: {
                width: 'linear',
                height: 'easeInOutCubic'
            }
        });
    }


    $('#follow').on('click', function () {
        const eMail = $('.e-mail-input')
        eMail.css('border-color', 'rgb(214, 117, 21)')

        if (!eMail.val()) {
            $('#eMail').css('border-color', 'red')
        } else {
            $('.footer-input-container').remove();
            $('.e-mail-success').css('display', 'block');
        }

    })
    $("#burger").click(function () {
        $("#menu").addClass("open");
    });
    $("#menu > *").click(function () {
        $("#menu").removeClass("open");
    });


})