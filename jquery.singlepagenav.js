(function (jQuery) {

    jQuery.fn.singlePageNav = function (options) {

        // Settings
        var settings = jQuery.extend({
            offset: 0,
            currentClass: 'current',
            currentThreshold: 0,
            duration: 500,
            effect: 'swing',
            started: function () {},
            finished: function () {}
        }, options);


        // Plugin object (improves readability)
        var menu = $(this);
        var plugin = {

            window: null,
            sections: null,
            menu: null,

            // Get all section based on menu
            get_sections: function() {

                var sections = [];

                // Find all links in menu
                this.menu.find('a[href^="#"]').each(function() {

                    // Add sections
                    var id = $(this).attr('href');
                    var section = $(id);
                    if (section.length > 0) {
                        sections.push(section);
                    } else {
                        console.warn('Element ' + id + ' does not exist');
                    }
                });
                return sections;
            },

            // Get current section
            get_current_section: function() {

                // Calculate top
                var top = this.window.scrollTop() + settings.offset;

                // Check each section
                var current = null;
                $.each(this.sections, function() {
                    var position = this.position();
                    var start = position.top - settings.currentThreshold;
                    var end = start + this.outerHeight() + settings.offset + settings.currentThreshold;
                    if (top >= start && top <= end) {
                        current = this;
                    }
                });

                return current;
            },

            // Bind scroll event
            bind_scroll: function() {

                // Get all links
                var self = this;
                var links = this.menu.find('a[href^="#"]');
                this.window.bind('scroll', function() {

                    // Get current section
                    var current_section = self.get_current_section();
                    if (current_section != null) {
                        var id = current_section.attr('id');
                        var link = self.menu.find('a[href="#' + id + '"]');
                        links.removeClass(settings.currentClass);
                        link.addClass(settings.currentClass);
                    }
                });
            },

            // Bind click event
            bind_click: function() {

                var self = this;
                this.html.find('a[href^="#"]').bind('click', function (event) {

                    // Double bind buster (webkit hack)
                    var animated = false;

                    // Prevent default behaviour
                    event.preventDefault();

                    // Get hash and section
                    var hash = $(this).attr('href');
                    var section = $(hash);
                    if (section.length == 0) {
                        console.error('Element with id ' + hash + ' does not exist');
                        return;
                    }

                    // Set current class in menu
                    $(settings.menu).find('a').removeClass(settings.currentClass);
                    $(settings.menu).find('a[href="' + hash + '"]').addClass(settings.currentClass);

                    // Get position and scroll
                    var position = section.position();
                    var scroll = position.top - settings.offset;

                    // Animate and callback
                    settings.started();
                    self.html.animate({ scrollTop: scroll }, settings.duration, settings.effect,
                        function () {
                            if (!animated) {
                                settings.finished();
                                animated = true;
                            }
                        }
                    );
                });
            },

            // Run this plugin
            initialize: function () {

                // Elements
                this.window = $(window);
                this.html = $('html, body');
                this.menu = menu;
                this.sections = this.get_sections();

                // Binds
                this.bind_scroll();
                this.bind_click();

                // Highlight current on load
                var current = this.get_current_section();
                var link = this.menu.find('a[href="#' + current.attr('id') + '"]');

                link.addClass(settings.currentClass);
            }
        }

        // Run this plugin
        plugin.initialize();
    }
}(jQuery));