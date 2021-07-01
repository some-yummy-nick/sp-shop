import utils from '../utils/utils';

const basket = () => {
	const basketCount = document.getElementById('js-basket-count');
	const subTotal = document.getElementById('js-subtotal');
	const total = document.getElementById('js-total');
	const tax = document.getElementById('js-tax');
	const shipping = document.getElementById('js-shipping');
	const sidebar = document.getElementById('js-sidebar');
	const empty = document.getElementById('js-empty');

	function replaceSpaces(str) {
		return str.replace(/\s+/g, '');
	}

	function calculateTotal() {
		const subTotalValueNumber = Number(replaceSpaces(subTotal.textContent));
		const taxValueNumber = Number(replaceSpaces(tax.textContent));
		const shippingValueNumber = Number(replaceSpaces(shipping.textContent));
		if (!subTotalValueNumber) {
			tax.textContent = 0;
			shipping.textContent = 0;
			total.textContent = 0;
			empty.classList.add('active');
			basketCount.remove();
			return;
		}
		total.textContent = utils.formatNumber(
			subTotalValueNumber + taxValueNumber + shippingValueNumber
		);
	}

	function handleCalculate(item, action) {
		const number = item.querySelector('.js-item-number');
		const price = item.querySelector('.js-item-price');
		const priceValue = replaceSpaces(price.dataset.price);
		const subTotalValue = replaceSpaces(subTotal.textContent);
		let priceValueNumber;
		let subTotalValueNumber;
		let count;

		if (action === 'plus') {
			count = Number(number.textContent) + 1;
			subTotalValueNumber = Number(subTotalValue) + Number(priceValue);
		}
		if (action === 'minus') {
			count = Number(number.textContent) - 1;
			if (count <= 0) {
				count = 1;
				subTotalValueNumber = Number(subTotalValue);
			} else {
				subTotalValueNumber = Number(subTotalValue) - Number(priceValue);
			}
		}

		priceValueNumber = count * Number(priceValue);
		number.textContent = count;
		price.textContent = utils.formatNumber(priceValueNumber);
		subTotal.textContent = utils.formatNumber(subTotalValueNumber);
		calculateTotal();
	}

	function removeItem(target) {
		const item = target.closest('.item');
		const price = item.querySelector('.js-item-price');
		const priceValue = replaceSpaces(price.textContent);
		const subTotalValue = replaceSpaces(subTotal.textContent);
		const subTotalValueNumber = Number(subTotalValue) - Number(priceValue);
		subTotal.textContent = utils.formatNumber(subTotalValueNumber);
		basketCount.textContent = Number(basketCount.textContent) - 1;
		calculateTotal();
		item.remove();
	}

	function handleClickBasket(e) {
		if (e.target.closest('.js-item-plus')) {
			handleCalculate(e.target.closest('.item'), 'plus');
		}
		if (e.target.closest('.js-item-minus')) {
			handleCalculate(e.target.closest('.item'), 'minus');
		}
		if (e.target.closest('.js-item-remove')) {
			removeItem(e.target);
		}
	}

	sidebar.addEventListener('click', handleClickBasket);
	if (module.hot) {
		module.hot.dispose(() => {
			sidebar.removeEventListener('click', handleClickBasket);
		});
	}
};

export default basket;
