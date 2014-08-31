$(function(){
  var $body = $('body');
  var $doc = $(document);

  var animationRunning = false;
  var bodyWidth = $body.width();

  var Slides = {
    $container: $('.slides-container'),
    $el: $('.slide'),
    el_counter: 0,

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
      this.$el_current = this.$el.eq(this.el_counter);
    },
    animCtrl: function(dir){
      var self = this;
      var $currentSlide = this.$el_current;
      var $currentChild = $currentSlide.find('.slide-child').not('.is-show').first();
      var hasChild = $currentChild.length > 0;

      if(hasChild && dir === 'next')
        this.animChild($currentChild);
      else
        this.animSlide(dir, $currentSlide);
    },
    animChild: function($el, cb){
      var self = this;
      var animClass = $el.attr('data-animation');

      $el.addClass(animClass+ ' animated');

      setTimeout(function(){
        $el.toggleClass('is-show animated '+ animClass);
        animationRunning = false;
      }, 600);
    },
    animSlide: function(dir){
      var self = this;
      var $currentSlide = this.$el_current;
      var $nextSlide;

      if(dir === 'next'){
        $nextSlide = $currentSlide.next('.slide');
        this.el_counter++;
      }
      else{
        $nextSlide = $currentSlide.prev('.slide');
        this.el_counter--;
      }

      var nextSlideAnimation = $nextSlide.attr('data-animation');

      $currentSlide.addClass('fadeOut animated');
      $nextSlide.addClass(nextSlideAnimation + ' is-current animated');

      setTimeout(function(){
        $currentSlide.removeClass('fadeOut animated is-current')
          .find('.slide-child.is-show')
            .removeClass('is-show');

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
      canAnim = (Slides.el_counter < Slides.slidesLength - 1);
    }
    else if(keyCode === 37){
      dir = 'prev';
      canAnim = (Slides.el_counter > 0);
    }

    if(canAnim && !animationRunning){
      animationRunning = true;
      Slides.animCtrl(dir);
    }
  });
});