
/*

	HESITEZ PAS A VOUS SERVIR DE LA DOCUMENTATION
	https: //greensock.com/cheatsheet/

*/




if ($(window).width() >= 640) {




	if ($.jgo.elementExiste('.trigger_rotation1')) {

		const rotation_1 = document.querySelectorAll('.trigger_rotation1');
		rotation_1.forEach((section) => {

			gsap.to(section, {
				rotate: 200,
				scrollTrigger: {
					trigger: section,
					start: 'top bottom-=100', // [trigger] [scroller] positions
					scrub: 0,
					toggleActions: 'play none none reverse',
					// markers: true
				}
			});

		});

	}






	if ($.jgo.elementExiste('.trigger_parallax1')) {
		
		const parallax_1 = document.querySelectorAll('.trigger_parallax1');
		parallax_1.forEach((section) => {

			gsap.from(section, {
				y: 100,
				scrollTrigger: {
					trigger: section,
					start: 'top bottom-=100', // [trigger] [scroller] positions
					scrub: 0,
					/* toggleActions: 'play none none reverse', */
					// markers: true
				}
			});

		});

	}




	if ($.jgo.elementExiste('.trigger_parallax01')) {
		
		const parallax_1 = document.querySelectorAll('.trigger_parallax1');
		parallax_1.forEach((section) => {

			gsap.from(section, {
				y: -100,
				scrollTrigger: {
					trigger: section,
					start: 'top bottom-=100', // [trigger] [scroller] positions
					scrub: 0,
					/* toggleActions: 'play none none reverse', */
					// markers: true
				}
			});

		});

	}






	if ($.jgo.elementExiste('.trigger_clippath1')) {

		const clippath_1 = document.querySelectorAll('.trigger_clippath1');
		clippath_1.forEach((section) => {

			gsap.to(section, {
				clipPath: "polygon(0% 0, 100% 0, 100% 100%, 0% 100%)",
				scrollTrigger: {
					trigger: section,
					start: 'top bottom-=100', // [trigger] [scroller] positions
					scrub: 0,
					/* toggleActions: 'play none none reverse', */
				}
			});
		});
		
	}
	
	
	


	if ($.jgo.elementExiste('.trigger_parallax2')) {
		
		const parallax_21 = document.querySelectorAll('.trigger_parallax2');
		parallax_21.forEach((section) => {

			let tl = gsap.timeline({
				scrollTrigger: {
					trigger: section,
					start: "top center", // [trigger] [scroller] positions
					scrub: 0,
					markers: false,
					pin: false,
				},
			});
			
			
			tl.fromTo(section, {
				yPercent: -30,
				scale: 1.1,
			}, {
				yPercent: 30,
				scale: 1.4,
			})

		});
		
	}
	
	
	
}