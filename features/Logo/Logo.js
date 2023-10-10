import logoImgSVG from '/public/img/logo.svg';

export class Logo {

  constructor() {

  }

  create(mountElement, linkClassName, imageLinkClassName, altLinkText) {
    const logoLink = document.createElement('a');
    logoLink.classList.add(linkClassName);
    logoLink.href = '/';
  
    const imgLogo = document.createElement('img');
    imgLogo.classList.add(imageLinkClassName);
    imgLogo.src = logoImgSVG;
    imgLogo.alt = altLinkText;
  
    logoLink.append(imgLogo);
  
    mountElement.append(logoLink);
  }

};