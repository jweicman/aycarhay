/*
Title: Main Scripts
Theme Name: Ashoka
Author Name: GeeksLabs
Author URI: http://themeforest.net/user/geekslabs
Website: http://geekslabs.com
*/

$(function(){
    "use strict";
    // Full screen pre loader
    function dismissPreloader() {
        $("#pre-loader").delay(500).fadeOut(2000);
        $(".preload-logo").addClass('zoomOutUp');
        $(".loader").addClass('zoomOutDown');
    }
    if (document.readyState === "complete") dismissPreloader();
    else $(window).on("load", dismissPreloader);
    setTimeout(dismissPreloader, 5000);
    

    //Logo fadeIn fadeOut on 
    $(window).scroll(function(){
      if($(this).scrollTop() > $(window).height()/2.2) $('.logo-wrapper').fadeOut('slow');
      if($(this).scrollTop() < $(window).height()/2.2) $('.logo-wrapper').fadeIn('slow');
    });

    //Using the smooth scroll for smooth navigation    
    smoothScroll.init({
        speed: 500, // Integer. How fast to complete the scroll in milliseconds
        easing: 'easeInOutCubic', // Easing pattern to use
        updateURL: false, // Boolean. Whether or not to update the URL with the anchor hash on scroll
        offset: 0, // Integer. How far to offset the scrolling anchor location in pixels
        callbackBefore: function ( toggle, anchor ) {}, // Function to run before scrolling
        callbackAfter: function ( toggle, anchor ) {} // Function to run after scrolling
    });

    //wow animation by using with animate css
    var isiPad = (navigator.userAgent.match(/iPad/i) != null);
    if (($.browser.mobile)||(isiPad)) {
        // disable animation on mobile
        $("body").removeClass("wow");
    }
    else{
        var wow = new WOW(
          {
            boxClass:     'wow',      
            animateClass: 'animated', 
            offset:       0,          
            mobile:       true        
          }
        );
        wow.init();
    }

    // Full screen navigations
    var triggerBttn = document.getElementById( 'trigger-navbar' ),
        navbar = document.querySelector( 'section.navbar' ),
        closeBttn = navbar.querySelector( 'a.navbar-close' ),
        navClick = navbar.querySelector( 'section.navbar nav ul li a' ),
        transEndEventNames = {
            'WebkitTransition': 'webkitTransitionEnd',
            'MozTransition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'msTransition': 'MSTransitionEnd',
            'transition': 'transitionend'
        },
        transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
        support = { transitions : Modernizr.csstransitions };

        function toggleOverlay() {
        if( classie.has( navbar, 'open' ) ) {
            classie.remove( navbar, 'open' );
            classie.add( navbar, 'close' );
            var onEndTransitionFn = function( ev ) {
                if( support.transitions ) {
                    if( ev.propertyName !== 'visibility' ) return;
                    this.removeEventListener( transEndEventName, onEndTransitionFn );
                }
                classie.remove( navbar, 'close' );
            };
            if( support.transitions ) {
                navbar.addEventListener( transEndEventName, onEndTransitionFn );
            }
            else {
                onEndTransitionFn();
            }
        }
        else if( !classie.has( navbar, 'close' ) ) {
            classie.add( navbar, 'open' );
        }
    }

    triggerBttn.addEventListener( 'click', toggleOverlay );
    closeBttn.addEventListener( 'click', toggleOverlay );    
    $('section.navbar nav ul li a').click(function(){
        toggleOverlay();
    });

    //prepare video
    $('.video').height($(window).height());
    $('.home-text').css('top',$(window).height()/4+'px');
    $('.home-text-2').css('top',$(window).height()/4.5+'px');

    $(window).resize(function() {
        $('.video').height($(window).height());
        $('.home-text').css('top',$(window).height()/4+'px');
        $('.home-text-2').css('top',$(window).height()/4.5+'px');
    });
    $('.video .cont').addClass('visible');
    
    setTimeout(function() {
        $('.video .sdf, .video .suys, .video .arrow').addClass('visible');
    }, 2000);

    //bg video
    $.backgroundVideo($('#bg-video'), {
        "align": "centerXY",         
        "width": 846,
        "height": 476,
        "poster": "media/business-discussion-converted.jpg", // Change display image for video from here you want to use
        "path": "media/",        
        "filename": "business-discussion-converted", // Change video from here you want to use
        "types": ["mp4", "ogg", "webm"]
    });
    
    //play video
    $('.video .play').click(function() {
        //stop the video
        if (!window.isMobile){
            $('body').addClass('noscroll').append('<div class="previewer"><div><iframe src="//player.vimeo.com/video/81676731?title=0&amp;byline=0&amp;portrait=0&amp;color=ffffff&amp;autoplay=1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div><div class="close"></div></div>');
    
            //pause video
            $('body').addClass('paused');
            
            $('.previewer').click(function() {
                $('body').removeClass('noscroll');
                $(this).remove();
                
                //play video back
                $('body').removeClass('paused');
            });
            return false;
        }
    });

    // The retired Instagram API cannot serve this static site.
    $('#instafeed').append(
        $('<p class="text-center">').append(
            $('<a>', {href: 'https://www.facebook.com/aycarhaymultiespacio',
                target: '_blank', rel: 'noopener', text: 'Ver nuestras fotos y eventos'})
        )
    );

    // grid gallery (Portfolio)
    new CBPGridGallery( document.getElementById( 'grid-gallery' ) );

    // Carousel
    $("#home-text-slider").owlCarousel({ 
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      autoPlay : 5000,
      stopOnHover : false,
      paginationSpeed : 400,
      singleItem:true       
    });

    $("#testimonial-slider").owlCarousel({ 
      navigation : true, // Show next and prev buttons
      slideSpeed : 300,
      autoPlay : 5000,
      stopOnHover : false,
      paginationSpeed : 400,
      singleItem:true       
    });

    
    //Counter Up
    $('.counter').counterUp({
        delay: 5,
        time: 800
    });

    //theme style switcher
    $('#theme-customizer .cog').click(function(){
        $('#theme-options').slideToggle("slow")
    });

    // GitHub Pages has no PHP backend. Open a draft for the visitor to send.
    $("#submit").click(function(event) {
        event.preventDefault();
        var fields = $('#contactform input, #contactform textarea');
        var complete = true;
        fields.each(function() {
            var empty = !$.trim($(this).val());
            $(this).css('border-color', empty ? 'red' : '');
            if (empty) complete = false;
        });
        if (!complete) {
            $('#form_result').text('Completá todos los campos para continuar.');
            return;
        }
        var message = 'Hola Ay Carhay!\nNombre: ' + $.trim($('#name').val()) +
            '\nEmail: ' + $.trim($('#email').val()) +
            '\nTeléfono: ' + $.trim($('#phone').val()) +
            '\nConsulta: ' + $.trim($('#comments').val());
        window.open('https://wa.me/5491125742337?text=' + encodeURIComponent(message),
            '_blank', 'noopener');
        $('#form_result').text('Se abrió WhatsApp con tu consulta. Revisala y enviá el mensaje allí.');
    });
    $('#contactform input, #contactform textarea').on('input', function() {
        $(this).css('border-color', '');
        $('#form_result').empty();
    });
});
