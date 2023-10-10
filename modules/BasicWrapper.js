import Navigo from 'navigo';
import logoImgSVG from '/public/img/logo.svg';

export class BasicWrapper {

  mountElement;

  constructor(elementTag, elementClassName) {
    this.element = document.createElement(elementTag);
    this.element.classList.add(elementClassName);

    this.mountElement = this.element;
  };

  addContainer(containerClassNames) {
    const container = document.createElement('div');

    containerClassNames.forEach(cl => {
      container.classList.add(cl);
    });
  
    this.element.append(container);

    if (containerClassNames) {
      this.mountElement = container;
    }
    return container;
  };

  getLogo(linkClassName, imageLinkClassName, altLinkText) {
    const logoLink = document.createElement('a');
    logoLink.classList.add(linkClassName);
    logoLink.href = '/';

    const imgLogo = document.createElement('img');
    imgLogo.classList.add(imageLinkClassName);
    imgLogo.src = logoImgSVG;
    imgLogo.alt = altLinkText;

    logoLink.append(imgLogo);

    this.mountElement.append(logoLink);
  };

  mount(parrentElement = '') {
    if (this.isMounted) {
      return;
    }

    if (parrentElement) {
      parrentElement.append(this.element);
    } else {
      document.body.append(this.element);
    }
    
    this.isMounted = true;

    return this.mountElement;
  };

  unmount() {
    this.element.remove();
    this.isMounted = false;
  };

  clear() {
    this.element.textContent = '';
    // this.isMounted = false;
  };

  setNotFoundpage() {
    this.element.innerHTML = `
    <div class="not-found">
      <h2 class="not-found__title">Страница не найдена</h2>
      <p class="not-found__text">Через 5 секунд вы бедете перенаправлены на <a class="not-found__link" href="/">главную страницу</a></p>
    </div>`;
  }

}