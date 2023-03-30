/* PRINCIPES DU FONTIONS SITE
 - toutes les instructions habituelles doiventa ller dans site_init();
 - les instructions liées à smoothstate doivent s'initialiser dans site_onPageLoad()
 - pour le chgt de page en AJAX, caler des update / restart dans le site_onAjaxLoad
 */

/*//  DEMARRAGE ///////////////////////////////*/
$.jgo.prm = {
  defaultActiveClass: 'active',
  replaceSVGtoPNG: true,
  aspireSVG: true,
  handleIframeWmode: true,
  watchScroll: true,
  scrollPoint: $('header').height()
};

$(document).ready(function () {
  $.jgo.init(); // init le .scrolled
  site_init();
  // MiniScript Additionels //
  $('.txt_masque').each(function () {
    let height = $(this).height(); // on récupère la hauteur de l'élément
    $(this).css('margin-bottom', '-' + height + 'px'); // on injecte à l'élément une margin negative = à sa hauter (let height)
  });
  
  $('.encart_select').hover(function () {
    let dataSelect = $(this).attr('data-slide');
    $(this).addClass('active').siblings().removeClass('active');
    console.log(dataSelect);
    $('.encart-slide .screen').removeClass('active');
    $('.encart-slide .screen[data-slide="' + dataSelect + '"').addClass('active');
  });

});

$(window).on("load", site_onPageLoad);


/*//  INITIALISATION  ///////////////////////////////
 -> tous les codes qui s'executent au demarrage
 */


function site_init() {

  $('body').addClass('ready');
  // cas ios7
  if (is_iOs()) {
    $('html').addClass('badios');
  }

  $('img:not([src])').addClass('lazyload');



  $(".text2_bout").click(function () {
    $('.text2_txt').toggleClass('op');
    $('.text2_bout').toggleClass('fermer');
});

  /*///// CODE JQUERY HORS JGO*/ /////

  /* AJOUTE UNE CLASSE is-scrolled au header quand le menu est scrollé (mobile) */
  $('nav.nav > ul').on('scroll', function (e) {
    if ($('nav.nav > ul').scrollTop() > 0) {
      $('header').addClass('is-scrolled');
    } else {
      $('header').removeClass('is-scrolled');
    }
  });

  $(".filtre_accordeon").click(function () {
    $(this).toggleClass("ouvre");
  });

  // Filtre gauche //
  $("#filtrerOuvre").click(function () {
    $(this).toggleClass("ouvre-filtre");
    $(".ouvreFiltre").toggleClass("ouvre-filtre");
    $('body').addClass('ouvre-filtre');
  });

  $("#filterClose").click(function () {
    $(this).toggleClass("ouvre-filtre");
    $(".ouvreFiltre").toggleClass("ouvre-filtre");
    $('body').removeClass('ouvre-filtre');
  });
  // Fin Filtre gauche //

  /* Header_multisites*/
  if ($(window).width() <= 1025) {
    $(".domaines > li > a").attr("href", "javascript:void(0)");
  } 
  const arrowRotate = document.querySelectorAll('.arrowRotate')
  arrowRotate.forEach(flecheDeg => {
    flecheDeg.addEventListener('click', () => {
      flecheDeg.classList.toggle('aRotate')
    })
  });
  // if ($.jgo.elementExiste('.nav_multi > ul.domaines')) {
  //   $('.nav_multi > ul.domaines').click(function () {
  //     $('.sites').removeClass('active');
  //     $(this).addClass('aRotate').next().addClass('active');
  //   });
  // }

  /* AJOUTE OU ENLEVE une classe au body selon si le menu doit apparaitre ou non */
  $('input[name="ouvre-menu"]').off('change');
  $('input[name="ouvre-menu"]').on('change', function (e) {
    var inp = $(this);
    if (inp.prop('checked') == true) {
      $('body').addClass('menu-active');
    } else {
      $('body').removeClass('menu-active');
    }
  });

  // scrolle la fenetre toujours en bas de page quand on altère le checkbox du pdp (bug sous EDGE : le site remonte en haut dès qu'on clique)
  $('input[name="ouvre-footer"]').off('change');
  $('input[name="ouvre-footer"]').on('change', function (e) {
    $('html, body').scrollTop($(document).height());
  });
  

  $('iframe').each((i, el) => {
    $(el).attr({
      loading: "lazy"
    }).addClass('lazyload');
  })
  

  //gestion de l'intro
  if ($.jgo.elementExiste('.diaporama--intro')) {
    $(".diaporama--intro").not('.slick-initialized').slick({
      lazyLoad: 'anticipated', // ondemand progressive anticipated 
      infinite: true,
      arrows: false,
      fade: true,
      speed: 400,
      autoplay: false
    });
                      
    // le survol des liens de l'intro affiche l'image correspondante
    $('.intro_url').each((i, el) => {
      $(el).on('mouseenter', () => {
        $('.diaporama--intro').not('.slick-initialized').slick('slickGoTo', [i]);
      });
    });

    //gestion suppression de l'intro au scroll
/*     if ($(window).width() >= 1025) { */
      if ($('body').hasClass('accueil')) {
        $(window).scroll(function () {
          if ($(window).scrollTop() >= $(window).height() && $.jgo.elementExiste('.intro')) {
            $('.intro').remove();
            $('html, body').scrollTop(0);
            $.jgo.prm.scrollPoint = $('#accueil').offset().top;
            ScrollTrigger.refresh()
          }
        });
      }
  /*   } */
 

    //en option : ajoute une ancre sur l'url accueil quand on vient d'une autre page ( évite de retomber sur l'intro)
    if (!$('nav.nav > ul > li').eq(0).hasClass('active')) {
      var href = "/";
      $('nav.nav > ul > li:first-child > a ').attr('href', href + '#accueil');
    }
    var ancre = $(location).attr('hash');
    if (ancre == "#accueil") {
      $('.intro').remove();
    }

  }


  if ($.jgo.elementExiste('#delete_sort')) {
    $([document.documentElement, document.body]).animate({
      scrollTop: $("#delete_sort").offset().top - 200
    }, 500);
  }


  // rajoute un flex end quand il n'y a qu'un enfant dans la pagination
  /*$('.bts--flex.pagination').each(function(){
     var bloc = $(this);
     if(bloc.children('*').length == 1 && bloc.children('.pagination').length == 1){
     bloc.children('*').addClass('margin-auto-left');
     }
   });*/


  $(".bout").click(function () {
  $(".video_hover").addClass('actif');
  $(this).remove();
  });



  /*///// CODE SLICK /////*/
  $('.diaporama, .diaporama--accueil, .diaporama--laius, .diaporama--fond').not('.slick-initialized').slick({
    dots: false,
    lazyLoad: 'ondemand', // a décommenter pour gagner en perf
    infinite: false,
    arrows: false,
    speed: 700,
    fade: true,
    cssEase: 'linear',
    autoplay: true,
    autoplaySpeed: 5000

  });


  if ($.jgo.elementExiste('.diaporama--fiche')) {

    $(".diaporama--fiche").slick({
      pauseOnHover: false,
      lazyLoad: 'ondemand',
      dots: false,
      infinite: true,
      arrows: true,
      speed: 700,
      fade: true,
      cssEase: 'linear',
      autoplay: true, // a commenter pour avoir une transition horizontal
      autoplaySpeed: 5000,

      responsive: [ //ici on customise le responsive du diaporama--fiche en vesion mobile tactile ;)
        {
          breakpoint: 640,
          settings: {
            centerMode: true,
            centerPadding: '60px',
            arrows: false,
            fade: false,
            autoplay: false,
            slidesToShow: 1,
            speed: 300,
            adaptiveHeight: true
          }
        }
      ]
    });

  }

  if ($.jgo.elementExiste('.slideshow')) {

    $(".slideshow").slick({
      lazyLoad: 'anticipated', // ondemand progressive anticipated
      infinite: false,
      arrows: true,
      autoplay: true,
      dots: false,
      autoplaySpeed: 6000,
      pauseOnHover: false,

      responsive: [{
        breakpoint: 600,
        settings: {
          arrows: true,
          dots: false,
        }
      }]
    });

  }

  if ($.jgo.elementExiste('.slideshow-duo')) {

    $(".slideshow-duo").slick({
      lazyLoad: 'anticipated', // ondemand progressive anticipated
      infinite: false,
      arrows: false,
      autoplay: true,
      dots: true,
      autoplaySpeed: 5000,
      pauseOnHover: false,

      responsive: [{
        breakpoint: 600,
        settings: {
          adaptiveHeight: true,
          dots: false,
        }
      }]
    });
  }

  if ($.jgo.elementExiste('.slideshow-center')) {

    $(".slideshow-center").slick({
      lazyLoad: 'anticipated', // ondemand progressive anticipated
      autoplay: true,
      dots: true,
      autoplaySpeed: 6000,
      pauseOnHover: false,
      centerMode: true,
      centerPadding: '13%',
      prevArrow: $('.btnprev'), 
      nextArrow: $('.btnnext'), 

      responsive: [{
        breakpoint: 600,
        settings: {
          adaptiveHeight: true,
          centerPadding: '0px'
        }
      }]

    });

  }

  if ($.jgo.elementExiste('.slide-avis')) {
    $(".slide-avis").slick({
      lazyLoad: 'anticipated',
      arrows: false,
      autoplay:true,
      dots: true, 
      autoplaySpeed: 6000,
      pauseOnHover:false,
      slidesToShow: 3,
      slidesToScroll: 3,
      centerPadding: '13%',
  
      responsive: [
        {
          breakpoint: 1023,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true, // Commenter cette ligne si : truncate //
            centerPadding: '0px'
          }
        }
      ]
    });
  }

  if ($.jgo.elementExiste('.slide-avis-50-50')) {
    $(".slide-avis-50-50").slick({
      lazyLoad: 'anticipated',
      arrows: false,
      autoplay:true,
      dots: false, 
      autoplaySpeed: 6000,
      pauseOnHover:false,
      slidesToShow: 1,
      slidesToScroll: 1,
      centerPadding: '13%',
    });
  }

  if ($.jgo.elementExiste('.slide-logos')) {

    $(".slide-logos").slick({
      lazyLoad: 'anticipated', // ondemand progressive anticipated
      infinite: true,
      arrows: false,
      dots: true,
      centerPadding: '0px',
      slidesToShow: 4,
      slidesToScroll: 4,
      
      responsive: [{
        breakpoint: 800,
        settings: {
          adaptiveHeight: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          centerPadding: '20px'
        }
      }]
    });

  }
  
    //Affichage des du slide en cours
    if ($.jgo.elementExiste('.slideshow-center')) {
      $('.btnarr').click(function () {
        var currentSlide = $('.slideshow-center').slick('slickCurrentSlide');
        var finalResult = currentSlide + 1;
        var inject = $('#currenSlide');
        inject.html(finalResult); 
      });
    };

  /*///// CODE PLUGINS /////
   -> plugins = nouveaux blocs de jgo rendus independants
   tu peux les appeller au besoin dans n'importe quelle situtation
   */

  /*fourrage en background-image d'un img
   ------------
   *: n'execute pas le code si on met la classe no-js a un img--back*/

  if (!Modernizr.objectfit) {
    $.site.imgback = $('*[class*="img--back"], .slick-slide > div ').jalisImgBack();
  } else {
    //il faut imperativement traiter le img--back avant le .slide
    $.site.imgback = $('*[class*="img--back"]:not(.no-js)').jalisImgBack();

  }


  // VSY -> ajoute ( et peut enlever ) une classe quand un element arrive à l'écran
  ScrollTrigger.batch(".vsy", {
    toggleClass: "view-on",
    once: false
  });
  
  //
  ScrollTrigger.batch(".incrementation", {
    onEnter: () => finalcountdown(),
  });

  // clic & scroll (ancien goclic)
  $.site.scrollto = $('.go').jalisScrollTo();


  // zoom quand survol
  $.site.zoom = $('.zoom').jalisZoom({
    zoomCssClass: 'fiche-img-cover'
  });


  //sticky
  // $.site.sticky = $('.sticky').jalisSticky({
  //   topModulator: function () {
  //     return $('body.scrolled header').outerHeight(true) + 36;
  //   }
  // });


  // liens miniatures / img
  $('.grille-images .miniatures *[class*="img"]').mouseover(function (e) {
    $('.fiche-img img, .fiche-img > .zoom > img').attr('src', $(e.target).attr('href'));
    $('.fiche-img .zoom').attr('href', $(e.target).attr('href'));
    $('.zoom > img').attr('style', 'opacity:1');

    try {
      $.site.zoom.update()
    } catch (e) {}
  });

  // => survol des miniatures
/*   $('body  *[class*="img--back"]').each((i, el) => {
    $(el).on('mouseenter', () => {
      $('.diaporama--fiche').slick('slickGoTo', [i]); 
    });
  }) */


// pour l'extension web2store :
  deleteNoScriptTag();
  $(".click").click(function () {
    $('.cnt').toggleClass('ouvre');
    $('.shut').toggleClass('show');
  });

  $(".plan--premier").click(function () {
    $('.cnt').removeClass('ouvre');
    $('.shut').removeClass('show');
  });
}


/*//  LOAD  ///////////////////////////////
 -> tous les codes qui s'executent lors du load du DOM
 */

function site_onPageLoad() {
  $('body').addClass('loaded');
  //pour changer la class par défault :
  /*  lazySizes.cfg.lazyClass = 'img:not([src])'; */
}



/*//  AJAX  ///////////////////////////////
 -> ici les instructions à placer quand un site est rafraichi par l'ajax
 */
function site_onAjaxLoad() {
  tryRefresh($.site.imgback.update, 'img back update');
}

/*===== FONCTIONS COMPLÉMENTAIRES  =====*/
//incrémentation des chiffres
function finalcountdown(){
  $('.counter').each(function() {
    var $this = $(this),
        countTo = $this.attr('data-count');
    $({ countNum: $this.text()}).animate({
      countNum: countTo
    },
    {
      duration: 1500,
      easing:'linear',
      step: function() {
        $this.text(Math.floor(this.countNum));
      },
      complete: function() {
        $this.text(this.countNum);
        //alert('finished');
      }
    });  
  });
}
/*===== FONCTIONS EXTERNES CAPTAIN 6.0  =====*/

//execute dans un try les methodes update puis restart (utile pour l'ajax)
function tryRefresh(fn, msg) {
  try {
    fn();
  } catch (e) {
    console.log('REFRESH ERR. : ' + msg + ' - ' + e);
  }
}

// determine si ios7
function is_iOs() {
  return navigator.userAgent.match('Version/7.0');
}

/*===== PLUGINS JALIS CAPTAIN 6.0  =====*/
(function ($) {
  /** JALIS SCROLLTO 1.0 CAPTAIN
   * Scroll vers un point determine quand on clic sur un autre
   * ex : <div class="go" data-go="#contact">contact</div>
   * rajouter data-go-origin="top|middle|bottom" pour lui dire ou placer le piont visé dans la page (middle par defaut)
   * rajouter $(jQueryObject).jalisScrollTo(); dans le ready pour activer
   * @param {String} scrollzone element ou s'applique le scroll ['html, body']
   * @param {String} anim_duration durée de l'animation
   */
  $.fn.jalisScrollTo = function (options) {

    function setListener() {
      elems.each(function () {
        var obj = $(this);
        unset_listener(obj);

        obj.on("click", function (e) {
          var desc = $(obj.attr('data-go'));
          var origin = obj.attr('data-go-origin');
          var shift = obj.attr('data-go-shift');
          desc = $(obj.attr('data-go'));
          e.preventDefault();
          var h;
          if (obj.attr('data-go') == "top") {
            h = 0;
          } else {

            var pos = desc.offset().top - $(prm.scrollzone).offset().top;

            if (prm.scrollzone != 'html, body') {
              pos += $(prm.scrollzone).scrollTop();
            }

            if (desc.outerHeight() > ($(window).height() * 0.8)) {
              h = pos - ($(window).height() / 2);
            } else {
              h = pos - (($(window).height() - desc.innerHeight()) / 2);
            }
            if (origin != undefined) {
              if (origin == "top") {
                h = pos;
              } else if (origin == "bottom") {
                h = pos - (desc.offset().top - desc.innerHeight());
              }
            }

            if (shift != undefined) {
              h -= parseFloat(shift);
            }
          }
          $(prm.scrollzone).animate({
            scrollTop: h
          }, {
            queue: false,
            duration: prm.anim_duration
          });
        });
      });
    }

    function unset_listener(item) {
      item.off('click');
    }

    var defaults = {
      scrollzone: 'html, body',
      anim_duration: 750
    }

    var elems = this;
    var selector = this.selector;
    var prm = $.extend(defaults, options);
    this.prm = prm;


    this.init = function () {
      setListener();
    }

    this.update = function () {
      //check le nb d'elements
      if (elems.length != $(selector).length) {
        elems = $(selector);
        setListener();
      }
    }

    this.kill = function () {
      unset_listener(elems);
    }

    this.init();

    return this;
  }



  /*
   JALISZOOM 1.0 CAPTAIN
   */
  $.fn.jalisZoom = function (options) {

    var elems = this.each(function () {

      var defaults = {
        imgSelector: 'img',
        zoomCssClass: 'fiche-image-cover',
        autoupdate: true
      }

      var prm = $.extend(defaults, options);

      var container = $(this);
      var img = $(this).find(prm.imgSelector);
      var frontCover;

      init();

      function init() {
        frontCover = "<span class='" + prm.zoomCssClass + "' style='background-image:url(" + img.attr('src') + ");'></span>";
        container.append(frontCover);
        setMouseEnter();
      }


      function onMouseMove(e) {
        var offset = container.offset();
        var sizes = {
          width: container.width(),
          height: container.height()
        }
        var mousePos = {
          top: e.pageY - offset.top,
          left: e.pageX - offset.left
        }

        var ratios = {
          top: (mousePos.top / sizes.height) * 100,
          left: (mousePos.left / sizes.width) * 100
        }

        container.find('.' + prm.zoomCssClass).css('background-position', ratios.left + '% ' + ratios.top + '%');
      }

      function onMouseEnter(e) {
        unsetMouseEnter();
        if (prm.autoupdate) {
          update();
        }
        setMouseLeave();
        setMouseMove();
      }

      function onMouseLeave(e) {
        unsetMouseLeave();
        unsetMouseMove();
        setMouseEnter();
      }


      function setMouseEnter() {
        container.on('mouseenter', onMouseEnter);
      }

      function unsetMouseEnter() {
        container.off('mouseenter', onMouseEnter);
      }


      function setMouseLeave() {
        container.on('mouseleave', onMouseLeave);
      }

      function unsetMouseLeave() {
        container.off('mouseleave', onMouseLeave);
      }


      function setMouseMove() {
        container.on('mousemove', onMouseMove);
      }

      function unsetMouseMove() {
        container.off('mousemove', onMouseMove);
      }


      function update() {
        var cover = container.find('.' + prm.zoomCssClass);
        var img = container.find(prm.imgSelector);
        if (!cover.css('background-image').match(img.attr('src'))) {
          cover.css('background-image', "url(" + img.attr('src'));
        }
      }

      this.update = update;

      this.stop = function () {
        unsetMouseEnter();
        unsetMouseLeave();
        unsetMouseMove();
        $('.' + prm.zoomCssClass).remove();
      }

      this.reset = function () {
        this.stop();
        init();
      }

      return this;

    });

    this.update = function () {
      for (var i = 0; i < elems.length; i++) {
        $(elems[i])[0].update();
      }
    }

    return this;


  }


  /*JALIS IMG BACK 1.0 CAPTAIN
   pushes <img>'s src to background-image
   */
  $.fn.jalisImgBack = function (options) {

    var defaults = {
      bgSize: 'cover',
      bgPos: 'center center',
      bgRpt: 'no-repeat'
    }

    var prm = $.extend(defaults, options);
    var elems = this;
    var selector = this.selector;

    set();

    /* look for a direct child img tag inside the selector,
     *  put the src attribute as inline background-image,
     *  removes the img tag
     */
    function set() {
      //parcours les images
      elems.each(function () {
        var img = $(this).find('img');
        img = img[0];

        if (img === undefined) {
          return;
        }
        //si le src de l'image est défini
        var src = img.getAttribute('src');
        //si le data-src est rempli pour le chargement différé des images lazyload
        if (typeof src === 'undefined' || src == null) {
          var src = img.getAttribute('data-src');
        }

        //si le data-src-slide est rempli pour le chargement différé des sliders
        var dataSrcSlide = img.getAttribute('data-src-slide');

        if (typeof src !== 'undefined' && src != null) {
          src = src.replace(new RegExp(' ', "gi"), '%20');
          $(this).css({
            'background-image': 'url("' + src + '")',
            'background-size': prm.bgSize,
            //'background-size': 'cover cover',
            'background-position': prm.bgPos,
            'background-repeat': prm.bgRpt
          });
          img.remove();

        }

        if (typeof dataSrcSlide !== 'undefined' && dataSrcSlide != null) {
          dataSrcSlide = dataSrcSlide.replace(new RegExp(' ', "gi"), '%20');
          $(this).css({
            'background-image': 'url("' + dataSrcSlide + '")',
            'background-size': prm.bgSize,
            //'background-size': 'cover cover',
            'background-position': prm.bgPos,
            'background-repeat': prm.bgRpt
          });
          img.remove();
        }
      });
    }
    /*function set() {
         elems.each(function () {
         var img = $(this).children('img');
         var src = img.attr('src');
         if (src != undefined) {
         src = src.replace(new RegExp(' ', "gi"), '%20');
         img.remove();
         $(this).css({
         'background-image': 'url("' + src + '")',
         'background-size': prm.bgSize,
         'background-position': prm.bgPos,
         'background-repeat': prm.bgRpt
         });
         }
         });
       }*/

    /* reverses the process by retrieving the img url,
     *  adding it to a new child img tag with the parsed src,
     * removes inline style
     */
    function unset() {
      elems.each(function () {
        var obj = $(this);
        var src = obj.css('background-image').slice(4, -1); // removes url()

        //parse url in case of quotes inside the url
        if (src.substring(0, 1) == '"' || src.substring(0, 1) == "'") {
          src = src.substring(1);
        }

        if (src.slice(-1) == '"' || src.slice(-1) == "'") {
          src = src.slice(0, -1);
        }

        if (src != undefined) {
          var img = "<img src='" + src + "' />";
          obj.append(img);
          obj.css({
            'background-image': 'none',
            'background-size': 'inherit',
            'background-position': 'inherit',
            'background-repeat': 'inherit'
          });
        }
      });
    }

    // updates the list of container, in case you would like to use AJAX ;)
    this.update = function () {
      if (elems.length != $(selector).length) {
        elems = $(selector);
      }
      set();
      return elems;
    }

    this.reset = function () {
      unset();
      return elems;
    }

    this.restart = function () {
      unset();
      this.update();
      set();
    }

    return this;

  }

  /**
   * methode qui permet un declenchement après un timeout sur la fin d'un scroll
   * @param  callback  l'action a declenché
   * @param  timeout   le de pause de scroll qu'il faut pour que l'action se déclenche
   */
  $.fn.scrollEnd = function (callback, timeout) {
    $(this).scroll(function () {
      var $this = $(this);
      if ($this.data('scrollTimeout')) {
        clearTimeout($this.data('scrollTimeout'));
      }
      $this.data('scrollTimeout', setTimeout(callback, timeout));
    });
  };

})(jQuery);


/*===== DELETE <noscript> =====*/
function deleteNoScriptTag() {
  var noscript = document.getElementsByTagName('noscript');
  var om = noscript.length - 1;
  for (om; om >= 0; om--) {
    noscript[om].parentNode.removeChild(noscript[om]);
  }
}