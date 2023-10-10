import { BasicWrapper } from "../BasicWrapper";

export class Catalog extends BasicWrapper {
  
  static instance = null;

  constructor() {
    super('nav', 'catalog')
    // Проверка наличия уже существующего образца
    if (!Catalog.instance) {
      Catalog.instance = this;

      this.containerElement = this.addContainer(['container', 'catalog__container']);
      // Свойство для определения вставки элемента на странице
      this.isMounted = false;
    }
    
    return Catalog.instance;
  };

  renderListElem(data) {
    const listElem = document.createElement('ul');
    listElem.classList.add('catalog__list');

    const listItems = data.map(item => {
      const listItemElem = document.createElement('li');
      listItemElem.classList.add('catalog__item');
      const link = document.createElement('a');
      link.classList.add('catalog__link');
      link.href = `/category?slug=${item}`;
      link.textContent = item;

      listItemElem.append(link);

      return listItemElem;
    });

    listElem.append(...listItems);

    this.containerElement.append(listElem);
  }

  mount(parrentElement, data) {

    this.renderListElem(data);
    parrentElement.prepend(this.element);
    // super.mount(parrentElement);
  };

}