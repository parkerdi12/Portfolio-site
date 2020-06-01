$(function () {

  const worksSlider = $('[data-slider="slick"]');

  // Filter =======
  let filter = $("[data-filter]");

  filter.on("click", function (event) {
    event.preventDefault();

    let cat = $(this).data("filter");

    if (cat == "all") {
      $("[data-cat]").removeClass("hide");
    } else {
      $("[data-cat]").each(function () {
        let workCat = $(this).data("cat");

        if (workCat != cat) {
          $(this).addClass("hide");
        } else {
          $(this).removeClass("hide");
        }
      });
    }
  });

  // Modal =======

  let modalCall = $("[data-modal]");
  let modalClose = $("[data-close]");

  // Вызов модального окна

  modalCall.on("click", function (event) {
    event.preventDefault();

    let $this = $(this);
    let modalId = $this.data("modal");

    $(modalId).addClass("show");
    $("body").addClass("no-scroll");

    // Находим у .modal .modal_dialog и меняем rotate и делаем задержку появления окна 200 милисекунд
    setTimeout(function () {
      $(modalId).find(".modal__dialog").css({
        transform: "rotateX(0)",
      });
    }, 200);

    worksSlider.slick("setPosition");
  });

  // Закрытие модального окна
  modalClose.on("click", function (event) {
    event.preventDefault();

    let $this = $(this);
    let modalParent = $this.parents(".modal");

    modalParent.find(".modal__dialog").css({
      transform: "rotateX(90deg)",
    });

    setTimeout(function () {
      modalParent.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 200);
  });

  // При клике на .modal закрываем модальное окно и у body убираем скрол

  $(".modal").on("click", function (event) {
    let $this = $(this);

    $this.find(".modal__dialog").css({
      transform: "rotateX(90deg)",
    });

    setTimeout(function () {
      $this.removeClass("show");
      $("body").removeClass("no-scroll");
    }, 200);
  });

  // При клике на .modal_dialog мы отменяем событие клика по его родителю
  $(".modal__dialog").on("click", function (event) {
    event.stopPropagation();
  });

  // Slider ======= https://kenwheeler.github.io/slick/

  worksSlider.slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: true,
    arrows: false,
    dots: true,
  });

  $(".slickPrev").on("click", function (event) {
    event.preventDefault();

    let currentSlider = $(this).parents(".modal").find('[data-slider="slick"]');

    currentSlider.slick("slickPrev");
  });

  $(".slickNext").on("click", function (event) {
    event.preventDefault();

    // Берем родителя .modal находим в нем data-slider="slick"
    let currentSlider = $(this).parents(".modal").find('[data-slider="slick"]');

    currentSlider.slick("slickNext");
  });

  // Moblie nav burger

  const navToggle = $("#navToggle");
  const nav = $("#nav");

  navToggle.on("click", function(event) {
    event.preventDefault();

    nav.toggleClass("show");
  });
});
