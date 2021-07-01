import 'core-js/stable';
import 'regenerator-runtime/runtime';

// import jquery from 'jquery';
// global.jquery = jquery;

import { gsap } from 'gsap';

// import { ScrollToPlugin } from 'gsap/ScrollToPlugin.js';
// gsap.registerPlugin(ScrollToPlugin);

global.gsap = gsap;

gsap.defaults({
	overwrite: 'auto',
});

class ProjectApp {
	constructor() {
		this.env = require('./utils/env').default;
		this.utils = require('./utils/utils').default;
		this.classes = {
			Signal: require('./classes/Signal').default,
		};
		this.components = {};
		this.helpers = {};
		this.modules = {};
		document.addEventListener('DOMContentLoaded', () => {
			document.documentElement.classList.remove('_loading');
		});
	}
}

global.ProjectApp = new ProjectApp();

const hamburger = document.getElementById('js-hamburger');
const cart = document.getElementById('js-cart');
const aside = document.getElementById('js-sidebar');
const menu = document.getElementById('js-header-menu');

function handleCartClick() {
	aside.classList.toggle('active');
	cart.classList.toggle('active');
}

function handleHamburgerClick() {
	hamburger.classList.toggle('active');
	menu.classList.toggle('active');
}

cart.addEventListener('click', handleCartClick);
hamburger.addEventListener('click', handleHamburgerClick);

if (module.hot) {
	module.hot.dispose(() => {
		cart.removeEventListener('click', handleCartClick);
		hamburger.removeEventListener('click', handleHamburgerClick);
	});
}

if (module.hot) {
	module.hot.accept();
}
