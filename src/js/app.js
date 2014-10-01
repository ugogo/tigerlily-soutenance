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

      // set width & z-index on each slide
      this.$el.each(function(i, el){
        $(el).css({
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

      $el.addClass(animClass+ ' animated')
        .bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(){
          $el.toggleClass('is-show animated '+ animClass);
          animationRunning = false;
          $el.unbind();
        });
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

      $nextSlide.addClass(nextSlideAnimation + ' is-current animated');

      $currentSlide.addClass('fadeOut animated')
        .bind('animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd', function(){
          $currentSlide.removeClass('fadeOut animated is-current')
            .find('.slide-child.is-show')
              .removeClass('is-show');
          $nextSlide.removeClass(nextSlideAnimation + ' animated');
          self.updateCurrent();
          animationRunning = false;
          $currentSlide.unbind();
        });
    }
  };


  Slides.init();

  // keyboard navigation
  $doc.on('keydown', function(e){
    var dir;
    var canAnim = false;
    var keyCode = e.keyCode;
    var hasChild = Slides.$el_current.find('.slide-child').not('.is-show').length > 0;
    if(keyCode === 39){
      dir = 'next';
      canAnim = (Slides.el_counter < Slides.slidesLength - 1);
    }
    else if(keyCode === 37){
      dir = 'prev';
      canAnim = (Slides.el_counter > 0);
    }

    if(!animationRunning && (canAnim || hasChild)){
      animationRunning = true;
      Slides.animCtrl(dir);
    }
  });
});