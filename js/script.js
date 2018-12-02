$(function(){
  $('.slider').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows:true,
    centerMode:true
});
$('.sliderWe').slick({
  infinite: true,
  arrows:false,
  autoplay:true,
  autoplaySpeed:3000,
  pauseOnHover:false
});
 });
 $(window).scroll(function(){
  var scroll_position = $(window).scrollTop()/2;
  $('header').css({
    'background-position-x' : - scroll_position + 'px',
  })
})