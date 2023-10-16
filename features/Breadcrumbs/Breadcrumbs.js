import { router } from "../../main";
import { BasicWrapper } from "../../modules/BasicWrapper";

export class Breadcrumbs extends BasicWrapper {

  static instance = null;

  constructor() {
    super('div', 'breadcrumbs');
    if (!Breadcrumbs.instance) {
      Breadcrumbs.instance = this;
      this.containerElement = this.addContainer(['container', 'breadcrumbs__container']);
    }

    return Breadcrumbs.instance;
  };

  render(list) {
    this.containerElement.textContent = '';
    const listElem = document.createElement('ul');
    listElem.classList.add('breadcrumbs__list');

    const breadcrumbsList = [{ text: 'Главная', href: '/' }, ...list];

    const listItems = breadcrumbsList.map(item => {
      const listItemElem = document.createElement('li');
      listItemElem.classList.add('breadcrumbs__item')

      const link = document.createElement('a');
      link.classList.add('breadcrumbs__link');

      link.textContent = item.text;

      if (item.href) {
        link.href = item.href;
      }

      const separator = document.createElement('span');
      separator.classList.add('breadcrumbs__separator');
      separator.innerHTML = '&gt;';

      listItemElem.append(link, separator);

      return listItemElem;
    });

    listElem.append(...listItems);
    this.containerElement.append(listElem);
  }

  mount(parrentElement, data) {
    this.render(data);
    parrentElement.append(this.element);
    router.updatePageLinks();
  };

  unmount() {
    super.unmount();
  }

}