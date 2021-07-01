import 'core-js/stable';
import 'regenerator-runtime/runtime';

// import jquery from 'jquery';
// global.jquery = jquery;

import { gsap } from 'gsap';

import hamburger from 'modules/hamburger';
import cart from 'modules/cart';
import basket from 'modules/basket';

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
			hamburger();
			cart();
			basket();
		});
	}
}

global.ProjectApp = new ProjectApp();

if (module.hot) {
	module.hot.accept();
}
