export class BurgerMenu {

	static burgerButton = document.querySelector('.js-header-burger');
	static headerMenu = document.querySelector('.js-header-menu');

	static init() {
			if (this.burgerButton && this.headerMenu) {
					this.burgerButton.addEventListener('click', () => {
							this.burgerButton.classList.toggle('is-active');
							this.headerMenu.classList.toggle('is-open');
					});
			}
	}
}