function jekyllSlideshow() {
    'use strict';
    var jesl = {
        findImagesInLists: function () {
            // return lists containing images with data-fullimage attributes
            // give those lists a scroller thumbs class for css to hook into
            $('ul:has(li:has(img[data-fullimage]))')
                .addClass('jesl-scroller-thumbs');
            return $('ul li img');
        },

        switchImage: function (img) {
            var newImg = $(img).clone().attr('src', $(img)
                                                    .attr('data-fullimage'));
            // when the image loads, align the lightbox
            newImg.load(function () {
                // change which image is shown in the lightbox
                $('.jesl-box .image')
                    .fadeOut(300, function () {
                        $(this).html(newImg);
                        $('.jesl-box .image').fadeIn(400, function () {
                            // set the dimensions of the holder based on img width
                            $('.jesl-box')
                                .animate({
                                    width: $('.jesl-box img').width(),
                                    height: $('.jesl-box img').height(),
                                    marginTop: (-$('.jesl-box img').height() / 2),
                                    marginLeft: (-$('.jesl-box img').width() / 2)
                                }, 300, function () {
                                // display the correct scroll arrows
                                    if ($(img).parent().prev().length) {
                                        $('.jesl-scroller.left').fadeIn(300);
                                    } else {
                                        $('.jesl-scroller.left').fadeOut(300);
                                    }
                                    if ($(img).parent().next().length) {
                                        $('.jesl-scroller.right').fadeIn(300);
                                    } else {
                                        $('.jesl-scroller.right').fadeOut(300);
                                    }
                                });
                        });
                    });
            });
            // remember the current image
            this.current = img;
        },

        scrollGallery: function (dir) {
            // scroll the lightbox in the direction passed.
            // only do it if there's something to scroll to (link shouldn't)
            // be displayed if there isn't, but just in case...
            var img = this.current;
            if (img) {
                if (dir === 'left' && $(img).parent().prev().length) {
                    this.switchImage($(img).parent().prev().children()[0]);
                } else if (dir === 'right' && $(img).parent().next().length) {
                    this.switchImage($(img).parent().next().children()[0]);
                }
            }
        },

        showLightbox: function () {
            // show the lightbox
            $('.jesl-modal-overlay').fadeIn('fast', function () {
                $('.jesl-box').fadeIn(300);
            });
        },

        hideLightbox: function () {
            // hide the lightbox
            $('.jesl-box').fadeOut(300, function () {
                $('.jesl-modal-overlay').fadeOut(300);
            });
        },

        init: function () {
            var that = this;
            // add all the needed markup: dark overlay, and a div for the
            // image box containing a div for the image as well as scroller
            // and closer buttons
            $('body')
                .append($('<div class="jesl-modal-overlay"></div>')
                    .hide()
                    .click(function () {
                        that.hideLightbox();
                    })
                    )
                .append($($('<div class="jesl-box"></div>')
                    .append($('<div class="jesl-close-button"></div>')
                        .click(function () {
                            that.hideLightbox();
                        })
                        )
                    .append($('<div class="jesl-scroller left"></div>')
                        .click(function () {
                            that.scrollGallery('left');
                        })
                        )
                    .append($('<div class="jesl-scroller right"></div>')
                        .click(function () {
                            that.scrollGallery('right');
                        })
                        )
                    .append($('<div class="image"></div>'))
                    .hide()
                    ));

            // find images in the lists, then add the event listener
            // to them all, so that we get the lightboxy goodness
            this.findImagesInLists().click(function () {
                that.switchImage(this);
                that.showLightbox();
            });
            // listen for keyboard presses to hide / navigate the slideshow
            $(document).keydown(function (e) {
                // We don't need to worry about unbinding these events
                // This is because hideLightbox() doesn't do anything of
                // significance if the lightbox is already hidden, and
                // scrollGallery() only scrolls if there's something to
                // scroll to.
                if (e.keyCode === 27) {
                    // this is the escape key
                    that.hideLightbox();
                }
                if (e.keyCode === 37) {
                    // this is the left arrow
                    that.scrollGallery('left');
                }
                if (e.keyCode === 39) {
                    // this is the right arrow
                    that.scrollGallery('right');
                }
            });
        }
    };
    // once we've instantiated the object, run the init method and let the
    // happiness flow
    jesl.init();
}

$(document).ready(function () {
    'use strict';
    jekyllSlideshow();
});