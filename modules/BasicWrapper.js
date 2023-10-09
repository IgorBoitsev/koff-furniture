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

  mount(insertElement = '') {
    if (this.isMounted) {
      return;
    }

    if (insertElement) {
      insertElement.append(this.element);
    } else {
      document.body.append(this.element);
    }

    this.isMounted = true;

    console.log(this.mountElement);
    return this.mountElement;
  };

  unmount() {
    this.element.remove();
    this.isMounted = false;
  };

  clear() {
    console.log('clear');
    this.element.textContent = '';
    this.isMounted = false;
  }

}