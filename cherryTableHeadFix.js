;(function(){
	const сTHF = function сTHF (selector, offsetTop) {

		const elements = document.querySelectorAll(selector)

		if(!offsetTop){
			offsetTop == 0;
		}

		const core = {}

		core.init = function() {

			for(const element of elements){
				
				const originalThead = element.querySelector('thead')
				let cloneThead = false

				const fixed = function () {
					const position = element.getBoundingClientRect()
					const positionY = position.y
					const positionBottom = position.bottom
					const elementWidth = element.offsetWidth


					if(positionY < -80 && positionBottom > 0 + originalThead.offsetHeight){
						if(cloneThead){
							return true
						} else {
							cloneThead = originalThead.cloneNode(true)
							if(!cloneThead.classList.contains('cTHF')){
								cloneThead.classList.add('cTHF')
								element.appendChild(cloneThead)
								document.querySelector('.cTHF').style.cssText = "\
									position: fixed; \
									top: 0; \
									margin-top: " + offsetTop + "px; \
									width: " + elementWidth + "px;"

								const arrTh = Array.from(originalThead.querySelectorAll('tr > th'))
								const arrClonedTh = Array.from(cloneThead.querySelectorAll('tr > th'))


								for (let i = 0; i < arrTh.length; i++) {
									let thWidth = arrTh[i].offsetWidth
									arrClonedTh[i].style.cssText = "min-width: " + thWidth + "px;"
									console.log(arrClonedTh[i])
								}
							}
						}

					} else {
						if (cloneThead) {
							cloneThead = false
							document.querySelector('.cTHF').parentNode.removeChild(document.querySelector('.cTHF'))
						}
					}
				}

				fixed()
				document.addEventListener('scroll', function () {
					fixed()
				})
				document.addEventListener('resize', function() {
					fixed()
				})
			}
			return core
		}


		return core
	}

	window.сTHF = сTHF
})();