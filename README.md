# Single Page Nav
---

Single Page Nav is a light-weight and simple to use jQuery plugin. With this plugin you can quickly setup navigation on a single page website.

It picks up every link with an anchor in it, but can also be used as main navigation.

## Basic example
---
    <!doctype html>
	<html>
	<head>
    	<meta charset="utf-8">
    	<link rel="stylesheet" href="basic.css">
	</head>
	<body>

    	<div>
        	<ul class="menu">
            	<li><a href="#home">Home</a></li>
            	<li><a href="#projects">Projects</a></li>
            	<li><a href="#who-are-we">Who we are</a></li>
            	<li><a href="#contact">Contact</a></li>
            	<li><a href="http://www.google.com">External link</a></li>
        	</ul>
    	</div>

    	<div style="clear:both"></div>

    	<section id="home">
        	Home or go to <a href="#contact">Contact</a>
    	</section>
    	<section id="projects">
        	Projects
    	</section>
    	<section id="who-are-we">
        	Who are we
    	</section>
    	<section id="contact">
        	Contact
    	</section>

    	<script type="application/javascript" src="../jquery.min.js"></script>
    	<script type="application/javascript" src="../jquery.singlepagenav.js"></script>
    	<script type="application/javascript">
        	jQuery(function(){
            	jQuery('.menu').singlePageNav();
        	});
    	</script>

	</body>
	</html>


## Options
---
    $(selector).singlepagenav({
    	offset: 0, 					// Offset from top
    	currentClass: 'current', 	// Class added to menu link when section is active
        currentThreshold: 0, 		// Threshold for triggering current section action
        duration: 500, 				// Duration of scroll animation in milliseconds 
        effect: 'swing', 			// Effect for scroll animation
        started: function (){}, 	// Callback at start of animation
        finished: function (){} 	// Callback after animation is finished
    });




