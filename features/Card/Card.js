import { API_URL } from "../../const";
import { CartButton } from "../CartButton/CartButton";
import { LikeButton } from "../LikeButton/LikeButton";

export class Card {

  constructor(id, image, title, price) {
    this.id = id;
    this.image = image;
    this.title = title;
    this.price = price;
    this.cartButton = new CartButton('card__btn', 'В корзину');
    this.likeButton = new LikeButton('card__favorite');
  }

  create() {
    const article = document.createElement('article');
    article.classList.add('goods__card', 'card');

    const link = document.createElement('a');
    link.classList.add('card__link', 'card__link-image');
    link.href = `/product/${this.id}`;

    const img = document.createElement('img');
    img.classList.add('card__image');
    img.src = `${API_URL}${this.image}`;
    img.alt = this.title;
    link.append(img);

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card__info');
    const cardTitle = document.createElement('h3');
    cardTitle.classList.add('card__title');

    const cardLink = document.createElement('a');
    cardLink.classList.add('card__link');
    cardLink.href = `/product/${this.id}`;
    cardLink.textContent = this.title;
    cardTitle.append(cardLink);
    
    const cardPrice = document.createElement('p');
    cardPrice.classList.add('card__price');
    cardPrice.innerHTML = `${this.price.toLocaleString()}&nbsp;₽`;

    const btnCart = this.cartButton.create(this.id);
    const btnFavorite = this.likeButton.create(this.id);

    cardInfo.append(cardTitle, cardPrice);
    article.append(link, cardInfo, btnCart, btnFavorite);

    return article;
  }

}