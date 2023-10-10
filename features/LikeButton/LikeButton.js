import { FavoriteService } from "../../services/LocalStorageService";
import { likeSVG } from "../LikeSVG/LikeSVG";

export class LikeButton {

  constructor(btnClassName) {
    this.btnClassName = btnClassName;
    this.favoriteService = new FavoriteService();
  }

  create(id) {
    const button = document.createElement('button');
    button.classList.add(this.btnClassName);
    button.dataset.id = id;
    button.textContent = this.btnText;

    button.innerHTML = likeSVG();

    if (this.favoriteService.check(id)) {
      button.classList.add(`${this.btnClassName}_active`);
    }

    button.addEventListener('click', () => {
      if (this.favoriteService.check(id)) {
        this.favoriteService.remove(id);
        button.classList.remove(`${this.btnClassName}_active`);
      } else {
        this.favoriteService.add(id);
        button.classList.add(`${this.btnClassName}_active`);
      }
    });

    return button;
  }

}