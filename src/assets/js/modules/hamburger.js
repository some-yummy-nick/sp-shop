const hamburger = () => {
	const button = document.getElementById('js-hamburger');
	const menu = document.getElementById('js-header-menu');

	function handleHamburgerClick() {
		button.classList.toggle('active');
		menu.classList.toggle('active');
	}

	button.addEventListener('click', handleHamburgerClick);

	if (module.hot) {
		module.hot.dispose(() => {
			hamburger.removeEventListener('click', handleHamburgerClick);
		});
	}
};

export default hamburger;
