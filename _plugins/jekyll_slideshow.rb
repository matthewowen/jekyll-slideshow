require 'RMagick'
require 'nokogiri'
include Magick

module Jekyll

  class ThumbGenerator < Generator
    safe true
    
    def generate(site)

      site.static_files.each do |file|
        if File.extname(file.path) == '.JPG' && file.path.index("-thumb") == nil
            img = Magick::Image::read(file.path).first
            thumb = img.resize_to_fill(150, 150)
            path = file.path.sub('.JPG', '-thumb.JPG')
            thumb.write path
            site.static_files << StaticFile.new(thumb, site.source, File.dirname(file.path).sub(site.source, ''), File.basename(file.path).sub('.JPG', '-thumb.JPG'))
        end
      end
    end
  end

  module ImageThumbs
    def slideshows(content)    
      doc = Nokogiri::HTML(content)
      doc.css('ul li img').each do |img|
        url = img['src']
        newurl = File.dirname(url) << '/' << File.basename(url, File.extname(url)) << '-thumb' << File.extname(url)
        img['src'] = newurl
        img['data-fullimage'] = url
      end
      return doc

    end
  end

end

Liquid::Template.register_filter(Jekyll::ImageThumbs)