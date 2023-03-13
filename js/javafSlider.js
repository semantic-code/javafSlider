function javafSlider(){}

javafSlider.start = function (option){
    var javaf_slider = new javafSlider(option);
    return javaf_slider;
}

function javafSlider(option){     
    this.init(option);
}

javafSlider.prototype = {
    init: function({divId, isNav, interval, isAutoplay, animation}){
        var _this  = this;
        _this.divId = divId;
        _this.$div = $("#" + divId);
        _this.interval = interval ? interval : 3000;
        _this.animation = animation ? animation : 'slide';
        _this.current = 0;

        _this.$div.addClass('javaf-slider').addClass(_this.animation);

        if(_this.animation == "fade"){
            _this.$div.find('.item').eq(0).addClass('active').fadeIn(0);
        }


        var setIntervalId = setInterval(function(){
            var next = _this.current +1;
            if(next == _this.$div.find('.item').length) next = 0;

            if(_this.animation == 'fade'){
                _this.fadeItem(next);

            }else{
                _this.moveSlide(next);
            }
        }, _this.interval);
},
    moveSlide:function(next){
        var _this = this;
        var $visual = _this.$div.find('.item');
        $visual.eq(_this.current).css({left: '0'}).stop().animate({left: '-100%'});
        $visual.eq(next).css({left: '100%'}).stop().animate({left: '0'});

        _this.current = next;
    },
    fadeItem: function(next){
        var _this = this;
        var $visual = _this.$div.find('.item');

        console.log(_this.current, next)

        $visual.eq(_this.current).removeClass('active').fadeOut(1000);
        $visual.eq(next).addClass('active').fadeIn(1000);

        _this.current = next;
    }
};
