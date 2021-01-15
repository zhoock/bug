"use strict"

var TARBABY = TARBABY || {};


//гамбургер меню
TARBABY.hamburger = function() {
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

    return this;
};


//scrollTo
TARBABY.scrollTo = function() {
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

    return this;    
};

// share
TARBABY.share = function() {

    function shareOnFacebook(e) {
        "this" == e && (e = window.location.href);
        var t = "https://www.facebook.com/sharer/sharer.php?u=" + encodeURIComponent(e);
        popUpWindow(t, "Share on Facebook", "464", "210", "no", "center");
    }

    function shareOnTwitter(e) {
        "this" == e && (e = window.location.href);
        var t = "https://twitter.com/home?status=" + encodeURIComponent(e);
        popUpWindow(t, "Share on Twitter", "464", "210", "no", "center");
    }

    function popUpWindow(e, t, n, o, a, i) {
      "center" == i
        ? ((LeftPosition = screen.width ? (screen.width - n) / 2 : 100),
          (TopPosition = screen.height ? (screen.height - o) / 2 : 100))
        : (("center" != i && "random" != i) || null == i) &&
          ((LeftPosition = 0), (TopPosition = 20)),
        (settings =
          "width=" +
          n +
          ",height=" +
          o +
          ",top=" +
          TopPosition +
          ",left=" +
          LeftPosition +
          ",scrollbars=" +
          a +
          ",location=no,directories=no,status=no,menubar=no,toolbar=no,resizable=no"),
        (win = window.open(e, t, settings));
    }


    $(".js-share-item li:first-child").on("click", function (t) {
        t.preventDefault(),
        $(".js-share-item li").toggleClass("show");
    });


    $(".js-share-item a").on("click", function (t) {
        t.preventDefault();
        
        $(this).hasClass("icon-facebook1") && shareOnFacebook("this"),
        $(this).hasClass("icon-twitter") && shareOnTwitter("this");
    });

    return this;
};


$(function(){
    TARBABY.hamburger().scrollTo().share();
});