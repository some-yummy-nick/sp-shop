const cart = () => {
	const button = document.getElementById('js-cart');
	const aside = document.getElementById('js-sidebar');

	function handleCartClick() {
		aside.classList.toggle('active');
		button.classList.toggle('active');
	}

	button.addEventListener('click', handleCartClick);

	if (module.hot) {
		module.hot.dispose(() => {
			button.removeEventListener('click', handleCartClick);
		});
	}
};

export default cart;
