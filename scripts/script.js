$(document).ready(function() {
    $('#carrossel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        dots: true, // Ativar indicadores
        prevArrow: '<div class="seta anterior"></div>',
        nextArrow: '<div class="seta seguinte"></div>',
    });
});
