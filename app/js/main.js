@import 'vendor/jquery-1.10.2.min.js'
@import 'vendor/parallax.min.js'
@import 'vendor/waypoints.min.js'

var BUG = BUG || {};

// гамбургер меню
BUG.hamburger = function(){
    var isActive = false,
        $hamburgerToggle = $(".b-menu-hamburger__toggle");

    $('.js-menu-hamburger').on('click', function () {
        if (isActive) {
            $(this).find($hamburgerToggle).removeClass('active');
            $('body').removeClass('menu-open');
        } else {
            $(this).find($hamburgerToggle).addClass('active');
            $('body').addClass('menu-open');
        }

        isActive = !isActive;

    });

    $(".js-menu a").on("click", function () {
        if (isActive) {
            $hamburgerToggle.removeClass('active');
            $('body').removeClass('menu-open');
        } else {
            $hamburgerToggle.addClass('active');
            $('body').addClass('menu-open');
        }

        isActive = !isActive;

    });
};



//parallax
BUG.parallax = function(){
    $('.parallax-window').parallax({
        positionY: 'center',
        positionX: 'left',
        androidFix: 'false'
    }); 
};



//menufooter
BUG.menufooter = function(){
    $('.js-menu-footer').on('click', function (e) {
        $(this)
            .closest(".b-nav-col")
            .find(".b-expandable")
            .stop(true,true)
            .toggle();

        e.preventDefault();
    }); 
};



//scrollTo
BUG.scrollTo = function() {
    $('a[href^="#"]').on("click", function() {

        var target = $(this).attr('href');

        window.parent.$('html, body').animate({ scrollTop: $(target).offset().top + -45 }, 1000);
        return false;
    });



    $('.js-section')
        .waypoint(function(direction) {

            var $links = $('a[href="#' + this.id + '"]');
            $links.toggleClass('selected', direction === 'down');

        }, {
            offset: 47.123
        })
        .waypoint(function(direction) {

            var $links = $('a[href="#' + this.id + '"]');
            $links.toggleClass('selected', direction === 'up');

        }, {
            offset: function() {
                return -($(this).height() - 47.123);
            }
        });
};



$(function(){
    BUG.hamburger();
    BUG.parallax();
    BUG.menufooter();
    BUG.scrollTo();
});






