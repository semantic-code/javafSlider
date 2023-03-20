function javafSlider(){}

javafSlider.start = function (option){
    var chk_slider = new ChkSlider(option);
    return chk_slider;
}

function ChkSlider(option){     
    this.init(option);
}

ChkSlider.prototype = {
    init: function({divId, speed, duration, animation, direction, isNavigation, isArrowButton, isPauseMouseOver}){
        var _this  = this;

		_this.speed = speed || 1000;
		_this.duration = duration || 1000;
        _this.animation = animation || "slide";
		_this.direction = direction || "left";
        _this.isNavigation = isNavigation || false;
		_this.isArrowButton = isArrowButton || false;
		_this.isPauseMouseOver = isPauseMouseOver || false;

        _this.divId = divId;
        _this.$div = $("#" + divId);
		_this.$visual = _this.$div.find('.item');
		_this.length = _this.$visual.length;        

		_this.setIntervalId = undefined;
		_this.current = 0;

        //css 적용을 위한 class 추가
		_this.$div.addClass("javaf-slider").addClass("is_"+_this.animation);

		//슬라이드 방향에 대한 class추가 
		if(_this.direction == 'left'){
			_this.$div.addClass("slide_to_left");
		}else if(_this.direction == "right"){
			_this.$div.addClass("slide_to_right");
		}else if(_this.direction == "up"){
			_this.$div.addClass("slide_to_up");
		}else if(_this.direction == "down"){
			_this.$div.addClass("slide_to_down");
		}
		_this.$div.find('.item').eq(_this.current).addClass('active');

		//페이드효과일 때, 기본값이 display:none 이라 처음에 나타나지 않는 문제 해결
        if(_this.animation == "fade"){
            _this.$div.find('.item.active').fadeIn(0);
        }

		//마우스오버일 때,  효과 멈추기
		if(_this.isPauseMouseOver){
			$("#" + _this.divId + " .items").on({
				mouseover:function(){
					_this.stopSlide();
				},
				mouseout:function(){
					_this.startInterval();
				}
			});
		}

        //네비게이션 생성
		if(_this.isNavigation) {
			_this.createNavigation();
		}

		//setInterval start
        _this.startInterval();

		if(_this.isArrowButton){
			_this.$div.append("<button class='btn-arrow btn-prev'>이전</button>");
			_this.$div.append("<button class='btn-arrow btn-next'>다음</button>");

			$(document).on("click", "#" + _this.divId + " .btn-next", function(){
				_this.handleClick(_this.current +1);
			});

			$(document).on("click", "#" + _this.divId + " .btn-prev", function(){
				var direction;
				switch (_this.direction){
					case "left" :
						direction = 'right';
						break;
					case "right" :
						direction = "left";
						break;
					case "up" :
						direction = "down";
						break;
					case "down" :
						direction = "up";
				}

				_this.handleClick(_this.current -1, direction);
			});
		}
    },
	startInterval: function(){
		var _this = this;
		if(_this.setIntervalId == undefined){
			_this.setIntervalId = setInterval(function(){
					_this.moveItem(_this.current + 1);
			}, _this.speed);
		}
	},
	moveItem: function(index,direction = null){
		var _this = this;
		if(_this.current == index) return false;

		var currentIndex;

		if(index < 0) {
			currentIndex = _this.length - 1
		} else if (index > _this.length - 1) {
			currentIndex = 0;
		} else {
			currentIndex = index;
		}

		if(_this.animation == "slide"){
			_this.slideItem(currentIndex, direction);
		}else if(_this.animation == "fade"){
			_this.fadeItem(currentIndex);
		}

		_this.$div.find("nav button").eq(currentIndex).addClass("active").siblings().removeClass("active");
		_this.$visual.eq(currentIndex).addClass("active").siblings().removeClass("active");

		_this.current = currentIndex;
	},
	slideItem: function(currentIndex, direction){
		var _this = this;
		var moveDirection = direction || _this.direction;

		if(moveDirection == "left"){
			_this.$visual.eq(_this.current).css({left: '0'}).stop().animate({left: '-100%'});
			_this.$visual.eq(currentIndex).css({left: '100%'}).stop().animate({left: '0'});
		}else if(moveDirection == "right"){
			_this.$visual.eq(_this.current).css({left: '0'}).stop().animate({left: '100%'});
			_this.$visual.eq(currentIndex).css({left: '-100%'}).stop().animate({left: '0'});
		}else if(moveDirection == "up"){
			_this.$visual.eq(_this.current).css({top: '0'}).stop().animate({top: '-100%'});
			_this.$visual.eq(currentIndex).css({top: '100%'}).stop().animate({top: '0'});
		}else if(moveDirection == "down"){
			_this.$visual.eq(_this.current).css({top: '0'}).stop().animate({top: '100%'});
			_this.$visual.eq(currentIndex).css({top: '-100%'}).stop().animate({top: '0'});
		}
	},
    fadeItem: function(next){
        var _this = this;
		
		_this.$visual.eq(_this.current).fadeOut(_this.duration);
	    _this.$visual.eq(next).fadeIn(_this.duration);

    },
    createNavigation: function(){
        var _this = this;

        _this.$div.append("<nav></nav>");
		_this.$div.find("nav").addClass("slide-navigation");

		for(i=0;i<_this.length;i++){
			_this.$div.find("nav").append("<button>"+ (i+1) +"</button>");
			_this.$div.find("nav").find("button").addClass("btn");
			_this.$div.find("nav").find("button").eq(i).addClass("btn"+(i+1));
			_this.$div.find("nav").find("button").eq(i).attr({"data-idx": (i+1)});
		}

		_this.$div.find('nav button').eq(_this.current).addClass('active');

		$(document).on("click", "#" + _this.divId + " nav button", function(){
			_this.handleClick($(this).index());
		});
    },
	handleClick: function (index, direction = null){
		var _this = this;

		_this.stopSlide();		
		_this.moveItem(index, direction);
		_this.startInterval();	
	},
	stopSlide: function(){
		var _this = this;
		clearInterval(_this.setIntervalId);
		_this.setIntervalId = undefined;
	}
}; 
