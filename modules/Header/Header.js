import { Logo } from "../../features/Logo/Logo";
import { BasicWrapper } from "../BasicWrapper";

export class Header extends BasicWrapper {
  
  static instance = null;

  constructor() {
    super('header', 'header');

    // Проверка наличия уже существующего образца
    if (!Header.instance) {
      Header.instance = this;
      this.containerElement = this.addContainer(['container', 'header__container']);
      
      // Свойство для определения вставки элемента на странице
      this.isMounted = false;
    }
    
    return Header.instance;
  };

  getSearchForm(parrentElement, formClassName, inputClassName, buttonClassName) {
    const searchFrom = document.createElement('form');
    searchFrom.classList.add(formClassName);
    searchFrom.method = 'get';

    const input = document.createElement('input');
    input.classList.add(inputClassName);
    input.type = 'search';
    input.name = 'search';
    input.placeholder = 'Пишите сюда';

    const button = document.createElement('button');
    button.classList.add(buttonClassName);
    button.type = 'submit';
    button.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M7.66671 13.9999C11.1645 13.9999 14 11.1644 14 7.66659C14 4.16878 11.1645 1.33325 7.66671 1.33325C4.1689 1.33325 1.33337 4.16878 1.33337 7.66659C1.33337 11.1644 4.1689 13.9999 7.66671 13.9999Z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14.6667 14.6666L13.3334 13.3333" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    searchFrom.append(input, button);
    parrentElement.append(searchFrom);
  };

  getNavigation(parrentElement, navClassName, navLinkClassName) {
    const navigation = document.createElement('nav');
    navigation.classList.add(navClassName);

    const favoriteLink = document.createElement('a');
    favoriteLink.classList.add(navLinkClassName);
    favoriteLink.href = '/favorite';
    favoriteLink.innerHTML = `
      <span class="${navLinkClassName}-text">Избранное</span>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8.41337 13.8733C8.18671 13.9533 7.81337 13.9533 7.58671 13.8733C5.65337 13.2133 1.33337 10.46 1.33337 5.79332C1.33337 3.73332 2.99337 2.06665 5.04004 2.06665C6.25337 2.06665 7.32671 2.65332 8.00004 3.55998C8.67337 2.65332 9.75337 2.06665 10.96 2.06665C13.0067 2.06665 14.6667 3.73332 14.6667 5.79332C14.6667 10.46 10.3467 13.2133 8.41337 13.8733Z" stroke="#1C1C1C" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    const cartLink = document.createElement('a');
    cartLink.classList.add(navLinkClassName);
    cartLink.href = '/cart';

    const spanText = document.createElement('span');
    spanText.classList.add(navLinkClassName + '-text');
    spanText.textContent = 'Корзина';

    const spanCount = document.createElement('span');
    spanCount.classList.add('header__count');
    spanCount.textContent = '(0)';
  
    const cartSVG = document.createElement('span');
    cartSVG.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5.87329 1.33325L3.45996 3.75325" stroke="#1C1C1C" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M10.1267 1.33325L12.54 3.75325" stroke="#1C1C1C" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M1.33337 5.23324C1.33337 3.9999 1.99337 3.8999 2.81337 3.8999H13.1867C14.0067 3.8999 14.6667 3.9999 14.6667 5.23324C14.6667 6.66657 14.0067 6.56657 13.1867 6.56657H2.81337C1.99337 6.56657 1.33337 6.66657 1.33337 5.23324Z" stroke="#1C1C1C"/>
        <path d="M6.50671 9.33325V11.6999" stroke="#1C1C1C" stroke-linecap="round"/>
        <path d="M9.57336 9.33325V11.6999" stroke="#1C1C1C" stroke-linecap="round"/>
        <path d="M2.33337 6.66675L3.27337 12.4267C3.48671 13.7201 4.00004 14.6667 5.90671 14.6667H9.92671C12 14.6667 12.3067 13.7601 12.5467 12.5067L13.6667 6.66675" stroke="#1C1C1C" stroke-linecap="round"/>
      </svg>
    `;

    cartLink.append(spanText, spanCount, cartSVG);
    navigation.append(favoriteLink, cartLink);
    parrentElement.append(navigation);

    this.countElement = spanCount;

  };

  changeCount(count) {
    this.countElement.textContent = `(${count})`;
  };

  mount() {
    new Logo().create(this.containerElement, 'header__link-logo', 'header__logo', 'Логотип Мебельного онлайн-магагзина Koff');
    this.getSearchForm(this.containerElement, 'header__search', 'header__input', 'header__btn');
    this.getNavigation(this.containerElement, 'header__control', 'header__link');

    super.mount();
  };

}