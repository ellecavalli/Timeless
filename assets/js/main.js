/**
* Template Name: iPortfolio - v1.4.1
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
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

})(jQuery);
String.prototype.tpl = function(o) {
			var r = this ;
			for (var i in o) {
				r = r.replace(new RegExp("\\$"+i, 'g'),o[i])
			}
			return r
		}

		var listItemTpl = `<li><a href='#' onclick='load("$url")'>$label</a></li>`

		$(document).ready(main);

		function main() {
			$.ajax({
				method: 'GET',
				url: 'assets/js/filelist.json',
				success: function(d) {
					for (var i=0; i<d.length; i++) {
						$('#list').append(listItemTpl.tpl({url:d[i].url, label: d[i].label}))
					}
				},
				error: function() {
					alert('No document to show')
				}
			});

			$('#showperson').click(function() {
				if (this.checked)
					$('.person').addClass('text-person')
				else
					$('.person').removeClass('text-person')
			})
			$('#showplace').click(function() {
				if (this.checked)
					$('.place').addClass('text-place')
				else
					$('.place').removeClass('text-place')
			})
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
					$('.show').prop("checked", false)
					addIds()
					filltabs()
					$('#title').html($('#file h1'))
				},
				error: function() {
					alert('Could not load file '+file)
				}
			});
		}

		function addIds() {
			addId('.person','person')
			addId('.place','place')
			addId('.aside','aside')
			addId('q.speech', 'speech')
			addId('q:not(.speech)', 'quote')
		}

		function addId(what, prefix) {
			var id = '0'
			var elements = $(what);
			for (var i=0; i<elements.length; i++) {
				elements[i].id = prefix + "-" + id++
			}
		}
		function filltabs(){
			fillInfo("#file", "#info")
			filltab("#file .person","list-person","#person")
			filltab("#file .place","list-place","#place")
			filltab("#file .aside","list-aside","#asides")
			filltab("#file q.speech","list-speech","#speeches")
			filltab("#file q:not(.speech)","list-quote","#quotes")
		}

		function fillInfo(from, where) {
			var item = `
				<p class="list title"><b>Title: </b> $title</p>
				<p class="list author"><b>Author: </b> $author</p>
				<p class="list author"><b>Headings: </b><ul>$headings</ul></p>
				<p class="list author"><b>Keywords: </b><ul>$keywords</ul></p>
				` ;
			$(where).empty();

			var title = $(from + ' h1')[0].innerText
			var author = $(from + ' .byline')[0].innerText
			var headingList = $(from + ' h2')
			var keywordList = $(from + ' meta[name="keywords"]').prop('content').split(', ')
			var headings = ""
			var keywords = ""
			for (var i=0; i<headingList.length; i++) {
				headings += "<li class='small'>"+headingList[i].innerHTML+"</li>"
			}
			for (var i=0; i<keywordList.length; i++) {
				keywords += "<li class='small'>"+keywordList[i]+"</li>"
			}
			$(where).append(item.tpl( {
				author: author,
				title: title,
				headings: headings,
				keywords: keywords
			}))
		}

		function filltab(what,style,where) {
			var list = `<li class="list $style"><a href="#" onclick="goto('$place')">$content</a></li>`
			var elements = $(what);
			$(where+' ul').empty();
			for (var i=0; i<elements.length; i++) {
				$(where+' ul').append(list.tpl({
					style:style,
					place: '#'+elements[i].id,
					content: elements[i].innerHTML
				}) )
			}
		}

		function goto(id) {
			var t = $(id)[0].offsetTop;
			$('body').animate({ scrollTop: t }, 200);
			$(id).addClass('animate');
			setTimeout(function(){
				$(id).removeClass('animate');
			},5000);
		}

		function textToAudio() {
			let msg = document.getElementById("readAloud").textContent;

			let speech = new SpeechSynthesisUtterance();
			speech.lang = "en-US";

			speech.text = msg;
			speech.volume = 1;
			speech.rate = 1.5;
			speech.pitch = 1;

			window.speechSynthesis.speak(speech);
		}

		function textCancel1() {

			let speech = new SpeechSynthesisUtterance();

			window.speechSynthesis.cancel(speech);
		}

		function textPause() {

			let speech = new SpeechSynthesisUtterance();

			window.speechSynthesis.pause(speech);
		}

		function textResume() {
			let msg = document.getElementById("readAloud").textContent;

			let speech = new SpeechSynthesisUtterance();
			speech.lang = "en-US";

			speech.text = msg;
			speech.volume = 1;
			speech.rate = 1;
			speech.pitch = 1;

			window.speechSynthesis.resume(speech);
		}

		$(".1500").on('click', function() {
			$("#stylez").attr("href", "first.css");
		});
		$(".1800").on('click', function() {
			$("#stylez").attr("href", "second.css");
		});
		$(".1900").on('click', function() {
			$("#stylez").attr("href", "third.css");
		});
		$(".1950").on('click', function() {
			$("#stylez").attr("href", "futurism.css");
		});
		$(".1980").on('click', function() {
			$("#stylez").attr("href", "second.css");
		});
		$(".2040").on('click', function() {
			$("#stylez").attr("href", "third.css");
		});

		$("#fSize").click(function(){
      $("body").toggleClass("foSize");
    });

		$("#dMode").click(function(){
       $("body").toggleClass("daMode");
			 if ($("body").hasClass("daMode")) {
	       $(".tab-pane").addClass("whiteBg");
				 $("#info").addClass("blackInf");
				 $("#checkblist").addClass("blackInf");
				 $(".h3fcol").addClass("blackInf");
				 $("#footerInd3").addClass("blackInf");
				 $(".timeX").addClass("nightBlue");
				 $(".timeY").addClass("nightBlue");
	     }
    });
