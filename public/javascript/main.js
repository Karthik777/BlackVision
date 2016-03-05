(function() {

	"use strict";

	// Methods/polyfills.

		// canUse
			window.canUse=function(p){if(!window._canUse)window._canUse=document.createElement("div");var e=window._canUse.style,up=p.charAt(0).toUpperCase()+p.slice(1);return p in e||"Moz"+up in e||"Webkit"+up in e||"O"+up in e||"ms"+up in e};

		// classList | (c) @remy | github.com/remy/polyfills | rem.mit-license.org
			!function(){function t(t){this.el=t;for(var n=t.className.replace(/^\s+|\s+$/g,"").split(/\s+/),i=0;i<n.length;i++)e.call(this,n[i])}function n(t,n,i){Object.defineProperty?Object.defineProperty(t,n,{get:i}):t.__defineGetter__(n,i)}if(!("undefined"==typeof window.Element||"classList"in document.documentElement)){var i=Array.prototype,e=i.push,s=i.splice,o=i.join;t.prototype={add:function(t){this.contains(t)||(e.call(this,t),this.el.className=this.toString())},contains:function(t){return-1!=this.el.className.indexOf(t)},item:function(t){return this[t]||null},remove:function(t){if(this.contains(t)){for(var n=0;n<this.length&&this[n]!=t;n++);s.call(this,n,1),this.el.className=this.toString()}},toString:function(){return o.call(this," ")},toggle:function(t){return this.contains(t)?this.remove(t):this.add(t),this.contains(t)}},window.DOMTokenList=t,n(Element.prototype,"classList",function(){return new t(this)})}}();

	// Vars.
		var	$body = document.querySelector('body');

	// Disable animations/transitions until everything's loaded.
		if ('addEventListener' in window) {

			$body.classList.add('is-loading');

			window.addEventListener('load', function() {
				$body.classList.remove('is-loading');
			});

		}

	// IE?
		if (navigator.userAgent.match(/(MSIE|rv:11\.0)/))
			$body.classList.add('is-ie');

	// Banner.
		(function() {

			// Settings.
				var settings = {

					// Delay.
						delay: 6000

				};

			// Vars.
				var $banner = document.querySelector('#banner'),
					$sliders = document.querySelectorAll('#banner ul'),
                    $runtime = {},
					pos = 0, lastPos = 0;

			// Main loop.
                $.each($sliders, function(key, value) {
                    var images = $('li', value);
                    console.log(images);
                    $runtime[key] = images;
                });

				$runtime[0][pos].classList.add('visible');
				$runtime[0][pos].classList.add('top');
				$runtime[1][pos].classList.add('visible');
				$runtime[1][pos].classList.add('top');

				// Bail if we only have a single BG.
					if ($runtime[0].length == 1)
						return;

				window.setInterval(function() {

					lastPos = pos;
					pos++;

					// Wrap to beginning if necessary.
						if (pos >= $runtime[0].length)
							pos = 0;

					// Swap top images.
						$runtime[0][lastPos].classList.remove('top');
						$runtime[0][pos].classList.add('visible');
						$runtime[0][pos].classList.add('top');

						$runtime[1][lastPos].classList.remove('top');
						$runtime[1][pos].classList.add('visible');
						$runtime[1][pos].classList.add('top');

					// Hide last image after a short delay.
						window.setTimeout(function() {
							$runtime[0][lastPos].classList.remove('visible');
							$runtime[1][lastPos].classList.remove('visible');
						}, settings.delay / 2);

				}, settings.delay);

		})();

})();

// DOM events
