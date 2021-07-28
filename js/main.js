(function ($) { 
    "use strict";
    var slideWrapper = $(".main-slider"),
    iframes = slideWrapper.find('.embed-player'),
    lazyImages = slideWrapper.find('.slide-image'),
    lazyCounter = 0;

// POST commands to YouTube or Vimeo API
function postMessageToPlayer(player, command){
  if (player == null || command == null) return;
  player.contentWindow.postMessage(JSON.stringify(command), "*");
}

// When the slide is changing
function playPauseVideo(slick, control){
  var currentSlide, slideType, startTime, player, video;

  currentSlide = slick.find(".slick-current");
  slideType = currentSlide.attr("class").split(" ")[1];
  player = currentSlide.find("iframe").get(0);
  startTime = currentSlide.data("video-start");

  if (slideType === "vimeo") {
    switch (control) {
      case "play":
        if ((startTime != null && startTime > 0 ) && !currentSlide.hasClass('started')) {
          currentSlide.addClass('started');
          postMessageToPlayer(player, {
            "method": "setCurrentTime",
            "value" : startTime
          });
        }
        postMessageToPlayer(player, {
          "method": "play",
          "value" : 1
        });
        break;
      case "pause":
        postMessageToPlayer(player, {
          "method": "pause",
          "value": 1
        });
        break;
    }
  } else if (slideType === "youtube") {
    switch (control) {
      case "play":
        postMessageToPlayer(player, {
          "event": "command",
          "func": "mute"
        });
        postMessageToPlayer(player, {
          "event": "command",
          "func": "playVideo"
        });
        break;
      case "pause":
        postMessageToPlayer(player, {
          "event": "command",
          "func": "pauseVideo"
        });
        break;
    }
  } else if (slideType === "video") {
    video = currentSlide.children("video").get(0);
    if (video != null) {
      if (control === "play"){
        video.play();
      } else {
        video.pause();
      }
    }
  }
}

// Resize player
function resizePlayer(iframes, ratio) {
  if (!iframes[0]) return;
  var win = $(".main-slider"),
      width = win.width(),
      playerWidth,
      height = win.height(),
      playerHeight,
      ratio = ratio || 16/9;

  iframes.each(function(){
    var current = $(this);
    if (width / ratio < height) {
      playerWidth = Math.ceil(height * ratio);
      current.width(playerWidth).height(height).css({
        left: (width - playerWidth) / 2,
         top: 0
        });
    } else {
      playerHeight = Math.ceil(width / ratio);
      current.width(width).height(playerHeight).css({
        left: 0,
        top: (height - playerHeight) / 2
      });
    }
  });
}

// DOM Ready
$(function() {
  // Initialize
  slideWrapper.on("init", function(slick){
    slick = $(slick.currentTarget);
    setTimeout(function(){
      playPauseVideo(slick,"play");
    }, 1000);
    resizePlayer(iframes, 16/9);
  });
  slideWrapper.on("beforeChange", function(event, slick) {
    slick = $(slick.$slider);
    playPauseVideo(slick,"pause");
  });
  slideWrapper.on("afterChange", function(event, slick) {
    slick = $(slick.$slider);
    playPauseVideo(slick,"play");
  });
  slideWrapper.on("lazyLoaded", function(event, slick, image, imageSource) {
    lazyCounter++;
    if (lazyCounter === lazyImages.length){
      lazyImages.addClass('show');
      // slideWrapper.slick("slickPlay");
    }
  });

  //start the slider
  slideWrapper.slick({
    // fade:true,
    autoplaySpeed:4000,
    lazyLoad:"progressive",
    speed:600,
    arrows:false,
    dots:true,
    cssEase:"cubic-bezier(0.87, 0.03, 0.41, 0.9)"
  });
});

// Resize event
$(window).on("resize.slickVideoPlayer", function(){  
  resizePlayer(iframes, 16/9);
});

//sticky nav bar
$(document).ready(function () {
  var $sticky = $('.sticky');
  var stickyOffsetTop = $sticky.offset().top;

  $(window).scroll(function (e) {
      e.preventDefault();

      var scrollTop = $(window).scrollTop();

      if (scrollTop > stickyOffsetTop) {
          $sticky.addClass('is-fixed');
      } else {
          $sticky.removeClass('is-fixed');
      }
  });
});
 //scrolll
 $(document).ready(function() {
  
  var scrollLink = $('.scroll');
  
  // Smooth scrolling
  scrollLink.click(function(e) {
    e.preventDefault();
    $('body,html').animate({
      scrollTop: $(this.hash).offset().top
    }, 1000 );
  });
  
// Active link switching
$(window).scroll(function() {
var scrollbarLocation = $(this).scrollTop();

scrollLink.each(function() {
  
  var sectionOffset = $(this.hash).offset().top;
  
  if ( sectionOffset <= scrollbarLocation ) {
    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');
  }
})
   
})

})

//wow  .js
new WOW().init();

//first lignhgallery 
 $(document).ready(function() {
  $('#lightgallery').lightGallery({
    pager: true,
    useLeft:true,	
    thumbnail:true

  });
});
$(document).ready(function() {
  var $lightgallery = $('#lightgallery');
  $lightgallery.lightGallery();
  var data = $lightgallery.data('lightGallery');
  
  $lightgallery.on('onBeforeSlide.lg', function(event, prevIndex, index){
    var img = data.$items.eq(index).attr('data-src');
    $('.lg-backdrop').css('background-image', 'url('+img+')');
  });
});
// Second lightgallery 
$(document).ready(function() {
  $('#lightgalleryanother').lightGallery({
    pager: true,
    useLeft:true,
    thumbnail:true,	

  });
});
$(document).ready(function() {
  var $lightgallery = $('#lightgalleryanother');
  $lightgallery.lightGallery();
  var data = $lightgallery.data('lightGallery');
  
  $lightgallery.on('onBeforeSlide.lg', function(event, prevIndex, index){
    var img = data.$items.eq(index).attr('data-src');
    $('.lg-backdrop').css('background-image', 'url('+img+')');
  });
});


//model
$(document).ready(function() {

  $(".buttnOne").click(function(){
    $(".imageone").css('display','block');
    $(".imagetwo").css('display','none');
  });
  $(".buttnTwo").click(function(){
    $(".imageone").css('display','none');
    $(".imagetwo").css('display','block');
  });
});


//scroll to top
$(window).scroll(function(){
  if($(this).scrollTop() > 300) {
      $(".auto-scroll-to-top").addClass("visible");                    
  } else {
      $(".auto-scroll-to-top").removeClass("visible");
  }        
});
  
$(".auto-scroll-to-top").click(function(){
  $("html, body").animate({scrollTop: 0}, 1000);
});

//navbar toggle
$(document).ready(function() {
  $(".spa_1").click(function(){

      $(this).css('display','none');
      $(".spa_2").css('display','block')
  });
  $(".spa_2").click(function(){

    $(this).css('display','none');
    $(".spa_1").css('display','block');
});
});

//nice scroll
$("body").niceScroll({
  cursorcolor:"rgb(255,101,1)",
  cursorborderradius:6,
  cursorborder:'none',
  zindex:900,
  scrollspeed:80
  
  });


})(jQuery);
