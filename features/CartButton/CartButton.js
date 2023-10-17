import { ApiService } from "../../services/ApiService";

export class CartButton {

  constructor(btnClassName, btnText) {
    this.btnClassName = btnClassName;
    this.btnText = btnText;
  }

  create(id) {
    const button = document.createElement('button');
    button.classList.add(this.btnClassName);
    button.dataset.id = id;
    button.textContent = this.btnText;

    button.addEventListener('click', () => {
      new ApiService().postProductToCart(id);
    });

    return button;
  }

}