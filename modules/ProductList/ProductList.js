import { Card } from "../../features/Card/Card";
import { BasicWrapper } from "../BasicWrapper";

export class ProductList extends BasicWrapper {

  static instance = null;

  constructor() {
    super('section', 'goods')
    // Проверка наличия уже существующего образца
    if (!ProductList.instance) {
      ProductList.instance = this;

      this.containerElement = this.addContainer(['container', 'goods__container']);

      // Свойство для определения вставки элемента на странице
      this.isMounted = false;
    }
    
    return ProductList.instance;
  };

  updateListElem(data = [], listClassName, itemClassName) {
    const listElem = document.createElement('ul');
    listElem.classList.add(listClassName);
    
    const listItems = data.map(({ id, images: [image], name: title, price }) => {
      const listItemElem = document.createElement('li');
      listItemElem.classList.add(itemClassName);
      listItemElem.append(new Card(id, image, title, price).create());

      return listItemElem;
    });

    listElem.append(...listItems);

    this.containerElement.append(listElem);
  };

  mount(parrentElement = '', sectionData, sectionTitle, sectionTitleClassName, emptyText) {
    this.mountElement.textContent = '';

    const title = document.createElement('h2');
    if (sectionTitle) {
      title.textContent = sectionTitle;

      if (sectionTitleClassName) {
        title.classList.add(sectionTitleClassName);
      };
    } else {
      title.textContent = 'Список товаров';
      title.classList.add('goods__set', 'visually-hidden');
    };

    this.mountElement.append(title);

    if (sectionData && sectionData.length) {
      this.updateListElem(sectionData, 'goods__list', 'goods__item');
    } else  {
      this.containerElement.insertAdjacentHTML('beforeend', `
        <p class="goods__empty">${emptyText || 'Произошла непредвиденная ошибка...'}</p>
      `)
    }

    super.mount(parrentElement);
  };

}