/* eslint-disable no-console */
/* global */
/* exported */



console.log('hello World');

let slickInitDone = false;
      let previousImageId = 0,
        currentImageId = 0;
      let pageAlign = "right";
      let bgCycle;
      let links;
      let eachNavLink;

      window.onload = function() {
        jQuery("body").addClass("loaded");
      };

      function navLinkClick(e) {
        if (jQuery(e.target).hasClass("external")) {
          return;
        }

        e.preventDefault();

        if (jQuery(e.target).data("align")) {
          pageAlign = jQuery(e.target).data("align");
        }

        // Change bg image
        previousImageId = currentImageId;
        currentImageId = jQuery(e.target).data("linkid");
        bgCycle.cycleToNextImage(previousImageId, currentImageId);

        // Change menu item highlight
        jQuery(`.tm-nav-item:eq(${previousImageId})`).removeClass("active");
        jQuery(`.tm-nav-item:eq(${currentImageId})`).addClass("active");

        // Change page content
        jQuery(`.tm-section-${previousImageId}`).fadeOut(function(e) {
            jQuery(`.tm-section-${currentImageId}`).fadeIn();
          // Gallery
          if (currentImageId === 2) {
            setupSlider();
          }
        });

        adjustFooter();
      }

      jQuery(document).ready(function() {
        // Set first page
        jQuery(".tm-section").fadeOut(0);
        jQuery(".tm-section-0").fadeIn();

        // Set Background images
        // https://www.jqueryscript.net/slideshow/Simple-jQuery-Background-Image-Slideshow-with-Fade-Transitions-Background-Cycle.html
        bgCycle = jQuery("body").backgroundCycle({
          imageUrls: [
            "<?php echo get_theme_file_uri('/img/photo-02.jpg'); ?>",
            "<?php echo get_theme_file_uri('/img/photo-03.jpg'); ?>",
            "<?php echo get_theme_file_uri('/img/photo-04.jpg'); ?>",
            "<?php echo get_theme_file_uri('/img/photo-05.jpg'); ?>"
          ],
          fadeSpeed: 2000,
          duration: -1,
          backgroundSize: SCALING_MODE_COVER
        });

        eachNavLink = jQuery(".tm-nav-link");
        links = jQuery(".tm-nav-links");

        // "Menu" open/close
        if (links.hasClass("open")) {
          links.fadeIn(0);
        } else {
          links.fadeOut(0);
        }

        jQuery("#tm_about_link").on("click", navLinkClick);
        jQuery("#tm_work_link").on("click", navLinkClick);

        // Each menu item click
        eachNavLink.on("click", navLinkClick);

        jQuery(".tm-navbar-menu").click(function(e) {
          if (links.hasClass("open")) {
            links.fadeOut();
          } else {
            links.fadeIn();
          }

          links.toggleClass("open");
        });

        // window resize
        $(window).resize(function() {
          // If current page is Gallery page, set it up
          if (currentImageId === 2) {
            setupSlider();
          }

          // Adjust footer
          adjustFooter();
        });

        adjustFooter();
      }); // DOM is ready

      function adjustFooter() {
        const windowHeight = jQuery(window).height();
        const topHeight = jQuery(".tm-top-container").height();
        const middleHeight = jQuery(".tm-content").height();
        let contentHeight = topHeight + middleHeight;

        if (pageAlign === "left") {
          contentHeight += jQuery(".tm-bottom-container").height();
        }

        if (contentHeight > windowHeight) {
            jQuery(".tm-bottom-container").addClass("tm-static");
        } else {
            jQuery(".tm-bottom-container").removeClass("tm-static");
        }
      }

      function setupSlider() {
        let slidesToShow = 4;
        let slidesToScroll = 2;
        let windowWidth = jQuery(window).width();

        if (windowWidth < 480) {
          slidesToShow = 1;
          slidesToScroll = 1;
        } else if (windowWidth < 768) {
          slidesToShow = 2;
          slidesToScroll = 1;
        } else if (windowWidth < 992) {
          slidesToShow = 3;
          slidesToScroll = 2;
        }

        if (slickInitDone) {
            jQuery(".tm-gallery").slick("unslick");
        }

        slickInitDone = true;

        jQuery(".tm-gallery").slick({
          dots: true,
          customPaging: function(slider, i) {
            var thumb = jQuery(slider.$slides[i]).data();
            return `<a>${i + 1}</a>`;
          },
          infinite: true,
          prevArrow: false,
          nextArrow: false,
          slidesToShow: slidesToShow,
          slidesToScroll: slidesToScroll
        });

        // Open big image when a gallery image is clicked.
        jQuery(".slick-list").magnificPopup({
          delegate: "a",
          type: "image",
          gallery: {
            enabled: true
          }
        });
      }