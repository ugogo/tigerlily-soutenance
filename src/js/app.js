$(function(){
  var $body = $('body');
  var $doc = $(document);

  var animationRunning = false;
  var bodyWidth = $body.width();

  var Slides = {
    $container: $('.slides-container'),
    $el: $('.slide'),
    counter: 0,

    init: function(cb){
      var slidesLength = this.$el.length;

      // set container size
      this.$container.width( slidesLength * this.body_width );

      // set width & z-index on each slide
      this.$el.each(function(i, el){
        $(el).css({
          'width': bodyWidth,
          'z-index': (slidesLength - i) * 10
        });
      });

      if(cb) cb();
    }
  };

  Slides.init(function(){
    // ready to do stuff

  });
});