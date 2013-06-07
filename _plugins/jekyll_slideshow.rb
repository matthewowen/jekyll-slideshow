require 'RMagick'
require 'nokogiri'
include Magick

module Jekyll

  class ThumbGenerator < Generator
    safe true
    
    def generate(site)
      # go through all the images in the site, generate thumbnails for each one

      # if we don't have values set for thumbnails, use a sensible default
      if Jekyll.configuration({}).has_key?('slideshow')
        config = Jekyll.configuration({})['slideshow']
      else 
        config = Hash["width", 100, "height", 100]
      end
      to_thumb = Array.new
      # create a list of images to be thumbed
      # avoids problem with running over and over the old thumb
      site.static_files.each do |file|
        if (File.extname(file.path).downcase == ('.jpg' || '.png')) &&
          (!File.basename(file.path).include? "-thumb")
            to_thumb.push(file)
        end
      end
      to_thumb.each do |file|
          img = Magick::Image::read(file.path).first
          thumb = img.resize_to_fill(config['width'], config['height'])
          path = file.path.sub(File.extname(file.path),
            '-thumb' << File.extname(file.path))
          thumb.write path
          site.static_files << StaticFile.new(thumb, site.source,
            File.dirname(file.path).sub(site.source, ''),
            File.basename(file.path).sub(File.extname(file.path),
              '-thumb' << File.extname(file.path)))
      end
    end
  end

  module ImageThumbs
    def slideshows(content)
      # go through content using the slideshows filter
      # for any imgs in <ul>s, change the src to use the new thumbs
      # set a data attribute referencing the original (fullsize) image
      doc = Nokogiri::HTML.fragment(content)
      doc.css('ul li img').each do |img|
        url = img['src']
        newurl = File.dirname(url) << '/' << File.basename(url,
          File.extname(url)) << '-thumb' << File.extname(url)
        img['src'] = newurl
        img['data-fullimage'] = url
      end
      return doc.to_s

    end
  end

end

Liquid::Template.register_filter(Jekyll::ImageThumbs)