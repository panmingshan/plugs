var scrllDir = function (el, param) {

    if (el && $(el).length) {
        var wrap = $(el)
        this.el = {
            wrap: wrap,
        }

        this._init(param);
    } else {
        console.log("scroll element is empty")
    }
}

scrllDir.prototype = {
    constructor: scrllDir,
    _init: function (param) {
        this._initParam(param)
            ._initEvent()
    },
    _initParam: function (param) {
        param = param || {};

        this.cb = {
            slideStart : param.slideStart,
            sliding: param.sliding,
            slideEnd: param.slideEnd
        }

        this.config = $.extend({}, this.getDefaultConfig(), param.config)

        var _el = this.el,
            wrap = _el.wrap;

        return this;
    },
    getDefaultConfig: function () {
        return {
            type: "normal",
            scrollFor: ""
        }
    },
    _initEvent: function () {
        var YStart = 0,
            YMoveing = 0,
            _this = this,
            lock = false,
            canSlide = null,
            scrollTop = 0,
            scrollBottom = 0;
        this.el.wrap.on("touchstart", function (e) {
                if (event.touches.length >= 2) {
                    lock = true;
                    return
                }

                canSlide = null;

                var touch = event.touches[0];
                YStart = touch.pageY;
                scrollTop = _this.el.wrap.scrollTop();

                _this.cb.slideStart&&_this.cb.slideStart();
            })
            .on("touchmove", function (e) {
                if (lock) {
                    return
                }
                var touch = event.touches[0];
                YMoveing = touch.pageY - YStart;

                if(canSlide === null){
                    if(_this.config.type == "scroll"){
                        canSlide = true;
                    }
                    else{
                        if((scrollTop == 0) && (YMoveing > 0)){
                            canSlide = true;
                        }
                        else{
                            canSlide = false;
                        }
                    }
                }

                if (canSlide === true) {
                    _this.cb.sliding&&_this.cb.sliding(YMoveing);
                    e.preventDefault();
                }

            })
            .on("touchend", function (e) {
                if(event.touches.length < 1){
                    lock = false;
                }
                if (canSlide === true) {
                    _this.cb.slideEnd&&_this.cb.slideEnd(YMoveing)
                }

            })
    }
}