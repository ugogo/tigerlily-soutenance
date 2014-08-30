$(function(){
  var $body = $('body');
  var $doc = $(document);

  var animationRunning = false;
  var bodyWidth = $body.width();

  var Slides = {
    $container: $('.slides-container'),
    $el: $('.slide'),
    counter: 0,

    init: function(){
      var slidesLength = this.$el.length;
      this.slidesLength = slidesLength;

      // set container size
      this.$container.width( slidesLength * this.body_width );

      // set width & z-index on each slide
      this.$el.each(function(i, el){
        $(el).css({
          'width': bodyWidth,
          'z-index': (slidesLength - i) * 10
        });
      });

      // set current slide
      this.updateCurrent();
    },
    updateCurrent: function(){
      this.$el_current = this.$el.eq(this.counter);
    },
    anim: function(dir){
      var self = this;
      var $currentSlide = this.$el_current;
      var $nextSlide;

      if(dir === 'next'){
        $nextSlide = $currentSlide.next('.slide');
        this.counter++;
      }
      else{
        $nextSlide = $currentSlide.prev('.slide');
        this.counter--;
      }

      var nextSlideAnimation = $nextSlide.attr('data-animation');

      $currentSlide.addClass('fadeOut animated');
      $nextSlide.addClass(nextSlideAnimation + ' slide--current animated');

      setTimeout(function(){
        $currentSlide.removeClass('fadeOut animated slide--current');
        $nextSlide.removeClass(nextSlideAnimation + ' animated');
        self.updateCurrent();
        animationRunning = false;
      }, 1000);
    }
  };

  Slides.init();

  // keyboard navigation
  $doc.on('keydown', function(e){
    var dir;
    var canAnim = false;
    var keyCode = e.keyCode;

    if(keyCode === 39){
      dir = 'next';
      canAnim = (Slides.counter < Slides.slidesLength - 1);
    }
    else if(keyCode === 37){
      dir = 'prev';
      canAnim = (Slides.counter > 0);
    }

    if(canAnim && !animationRunning){
      animationRunning = true;
      Slides.anim(dir);
    }
  });
});