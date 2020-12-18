/**
* Template Name: iPortfolio - v1.4.1
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
$(function() {
  $(document).scroll(function() {
    var $nav = $("#mainNavbar");
    $nav.toggleClass("scrolled", $(this).scrollTop() > $nav.height());
  });
});

String.prototype.tpl = function(o) {
  var r = this;
  for (var i in o) {
    r = r.replace(new RegExp("\\$" + i, 'g'), o[i])
  }
  return r
}

var listItemTpl = `<li><a href='#' onclick='load("$url")'>$label</a></li>`

$(document).ready(main);

function main() {
  $.ajax({
    method: 'GET',
    url: 'filelist.json',
    success: function(d) {
      for (var i = 0; i < d.length; i++) {
        $('#list').append(listItemTpl.tpl({
          url: d[i].url,
          label: d[i].label
        }))
      }
    },
    error: function() {
      alert('No document to show')
    }
  });


  $('#showasides').click(function() {
    if (this.checked)
      $('.aside').addClass('text-aside')
    else
      $('.aside').removeClass('text-aside')
  })
  $('#showspeeches').click(function() {
    if (this.checked)
      $('q.speech').addClass('text-speeches')
    else
      $('q.speech').removeClass('text-speeches')
  })
  $('#showquotes').change(function() {
    if (this.checked)
      $('q:not(.speech)').addClass('text-quotes')
    else
      $('q:not(speech)').removeClass('text-quotes')
  })
}

function load(file) {
  $.ajax({
    method: 'GET',
    url: file,
    success: function(d) {
      $('#file').html(d)
      $('#title').html($('#file h1'))
      $('.show').prop("checked", false)
      addIds()
      filltabs()
    },
    error: function() {
      alert('Could not load file ' + file)
    }
  });
}

function addIds() {
  addId('.aside', 'aside')
  addId('q.speech', 'speech')
  addId('q:not(.speech)', 'quote')
}

function addId(what, prefix) {
  var id = '0'
  var elements = $(what);
  for (var i = 0; i < elements.length; i++) {
    elements[i].id = prefix + "-" + id++
  }
}

function filltabs() {
  filltab("#file .aside", "list-aside", "#asides")
  filltab("#file q.speech", "list-speech", "#speeches")
  filltab("#file q:not(.speech)", "list-quote", "#quotes")
}

function filltab(what, style, where) {
  var list = `<li class="list $style"><a href="#" onclick="goto('$place')">$content</a></li>`
  var elements = $(what);
  $(where + ' ul').empty();
  for (var i = 0; i < elements.length; i++) {
    $(where + ' ul').append(list.tpl({
      style: style,
      place: '#' + elements[i].id,
      content: elements[i].innerHTML
    }))
  }
}

function goto(id) {
  var t = $(id)[0].offsetTop;
  $('body').animate({
    scrollTop: t
  }, 200);
  $(id).addClass('animate');
  setTimeout(function() {
    $(id).removeClass('animate');
  }, 5000);
}
/** ************NEW START!!!!*********** **/
$(".1500").on('click',function(){$("#stylez").attr("href","first.css");});
$(".1800").on('click',function(){$("#stylez").attr("href","second.css");});
$(".1900").on('click',function(){$("#stylez").attr("href","third.css");});
$(".1950").on('click',function(){$("#stylez").attr("href","first.css");});
$(".1980").on('click',function(){$("#stylez").attr("href","second.css");});
$(".2040").on('click',function(){$("#stylez").attr("href","third.css");});
/** ************NEW END!!!!*********** **/

!(function($) {
  "use strict";

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function(e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function() {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  $(document).click(function(e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function() {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function() {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function() {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // Porfolio isotope and filter
  $(window).on('load', function() {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function() {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
      $('.venobox').venobox();
    });
  });

  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true
    });
  }
  $(window).on('load', function() {
    aos_init();
  })

  // Switcher style
  $(".time1500").on('click', function() {
    $("#stylez").attr("href", "asset/css/1500.css");
  });
  $(".time1800").on('click', function() {
    $("#stylez").attr("href", "asset/css/1800.css");
  });
  $(".time1980").on('click', function() {
    $("#stylez").attr("href", "asset/css/1980.css");
  });
  $(".time2040").on('click', function() {
    $("#stylez").attr("href", "asset/css/2040.css");
  });

})(jQuery);