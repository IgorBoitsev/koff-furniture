import { likeSVG } from "../LikeSVG/LikeSVG";

export class LikeButton {

  constructor(btnClassName) {
    this.btnClassName = btnClassName;
  }

  create(id) {
    const button = document.createElement('button');
    button.classList.add(this.btnClassName);
    button.dataset.id = id;
    button.textContent = this.btnText;

    button.innerHTML = likeSVG();

    button.addEventListener('click', () => {
      console.log('Добавить товар в избранное');
    });

    return button;
  }

}