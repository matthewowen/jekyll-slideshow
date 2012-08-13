## Jekyll Slideshow

### What is Jekyll Slideshow?

Jekyll Slideshow is a plugin to help you create image slideshows on your Jekyll / Octopress site.

By slideshow, I mean those neat little JavaScript lightbox things. Instead of big images in your main content, you get a series of thumbnails. Click on one and it appears in a lightbox, and you can scroll left and right through the other items in the list.

### What does it do?

Jekyll Slideshow will take care of making thumbnail sized versions of all your images. It'll also do all the JavaScript and CSS necessary to make the slideshows work. Of course, you're welcome to change / add to the JavaScript and CSS to get the look and feel just as you'd like it.

### Usage

If you're already using plugins with your Jekyll install, drop the contents of the '_plugins' folder into your '_plugins' folder. If you aren't, just copy the folder across.

This plugin uses the nokogiri and RMagick gems, so you'll need to

    gem install nokogiri

and [install RMagick](http://rmagick.rubyforge.org/install-faq.html).

Copy the 'jesl' folder across into your project, too.

In your templates/layouts, include the relevant JS/CSS, and jQuery if you aren't already (for now, Jekyll Slideshow requires jQuery [sorry about that]):

    <link href="/jesl/jesl.min.css" rel="stylesheet" media="screen" type="text/css">
    <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js"> </script>
    <script src="/jesl/jesl.min.js"> </script>

For any content that you'd like the slideshow process to work on, use the filter 'slideshows' in your template, like so:

    {{ content | slideshows }}

The Javascript will look for images in lists in that content, and slideshowify them - if you're using Markdown, do it like so:

    * ![Example image](/images/300.jpg)
    * ![Example image](/images/420.jpg)
    * ![Example image](/images/600.jpg)
    * ![Example image](/images/an-image.jpg)
    * ![Example image](/images/some_image.jpg)

If you'd like to specify the thumbnail size, you can set this in _config.yml like so:

    slideshow:
        width: 150
        height: 100

If you checkout the branch 'example' you can see an example site.

### Browser support

The slideshow works in modern browsers, and IE7 up; please raise any problems as issues. The thumbnails are displayed using

    display: inline-block;

inline-block isn't supported on IE7, so if that matters you might want to add an appropriate CSS rule to get the desired styling.

### Questions, feedback, etc

I'd love to hear questions, feedback, suggestions, whatever. :).