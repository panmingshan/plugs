
    var mySwiper = new Swiper('.swiper-container', {
        direction: 'vertical',

        noSwipingClass: 'test',
        on: {
            transitionEnd: function () {
                transing = false;
            },
        }
    })
    var start = 0;
    new scrllDir("#content",{
        type : "scroll",
        slideStart : function(){
            console.log("start")
            mySwiper.detachEvents()
            start = mySwiper.getTranslate();
            mySwiper.setTransition(0);
        },
        sliding : function(m){
            console.log("sliding",m)
            mySwiper.setTranslate(start + m);
        },
        slideEnd: function(m){
            mySwiper.attachEvents();
            if(m>100){
                mySwiper.slidePrev();
            }
            else{
                mySwiper.setTransition(300);
                mySwiper.setTranslate(start)
            }
            console.log("slideEnd",m)
        }
    })
