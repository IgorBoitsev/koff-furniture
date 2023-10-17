import { BasicWrapper } from "../BasicWrapper";

export class Cart extends BasicWrapper {

  static instance = null;

  constructor() {
    super('section', 'cart');

    // Проверка наличия уже существующего образца
    if (!Cart.instance) {
      Cart.instance = this;
      this.containerElement = this.addContainer(['container', 'cart__container']);
      
      // Свойство для определения вставки элемента на странице
      this.isMounted = false;
    }
    
    return Cart.instance;
  };

  renderProducts() {
    



  //   <section class="cart" hidden>
  //   <div class="container cart__container">

  //     <h2 class="cart__title">Корзина</h2>

  //     <ul class="cart__products">
  //       <li class="cart__product">
  //         <img src="./public/img/photo.jpg" alt="Кресло с подлокотниками" class="cart__image">
  //         <h3 class="cart__title-product">Кресло с подлокотниками</h3>

  //         <p class="cart__price">5&nbsp;000&nbsp;₽</p>
  //         <p class="cart__article">арт. 84348945757</p>
  //         <div class="cart__product-control">
  //           <button class="cart__product-btn">-</button>
  //           <p class="cart__product-count">1</p>
  //           <button class="cart__product-btn">+</button>
  //         </div>
  //       </li>
        
  //       <li class="cart__product">
  //         <img src="./public/img/photo.jpg" alt="Кресло с подлокотниками" class="cart__image">
  //         <h3 class="cart__title-product">Кресло с подлокотниками</h3>

  //         <p class="cart__price">10&nbsp;000&nbsp;₽</p>
  //         <p class="cart__article">арт. 84348945757</p>
  //         <div class="cart__product-control">
  //           <button class="cart__product-btn">-</button>
  //           <p class="cart__product-count">2</p>
  //           <button class="cart__product-btn">+</button>
  //         </div>
  //       </li>

  //       <li class="cart__product">
  //         <img src="./public/img/photo.jpg" alt="Кресло с подлокотниками" class="cart__image">
  //         <h3 class="cart__title-product">Кресло с подлокотниками</h3>

  //         <p class="cart__price">5&nbsp;000&nbsp;₽</p>
  //         <p class="cart__article">арт. 84348945757</p>
  //         <div class="cart__product-control">
  //           <button class="cart__product-btn">-</button>
  //           <p class="cart__product-count">1</p>
  //           <button class="cart__product-btn">+</button>
  //         </div>
  //       </li>
  //     </ul>
  //     <!-- /.cart__goods -->

  //     <div class="cart__placing">
  //       <h3 class="cart__subtitle">Оформление</h3>

  //       <div class="cart__placing-info">
  //         <p class="cart__placing-count">4 товара на сумму:</p>
  //         <p class="cart__placing-price">20 000 ₽</p>
  //       </div>

  //       <p class="cart__placing-delivery">Доставка 0 ₽</p>

  //       <button class="cart__placing-btn" type="submit" form="order">Оформить заказ</button>
  //     </div>
  //     <!-- /.cart__placing -->

  //     <form action="" class="cart__delivery-form delivery-form" id="delivery-form">
  //       <h3 class="cart__subtitle">Данные для доставки</h3>

  //       <fieldset class="delivery-form__fieldset delivery-form__fieldset-input">
  //         <input type="text" class="delivery-form__input" name="name" placeholder="Фамилия Имя Отчество">
  //         <input type="tel" class="delivery-form__input" name="phone" placeholder="Телефон">
  //         <input type="email" class="delivery-form__input" name="email" placeholder="E-mail">
  //         <input type="text" class="delivery-form__input" name="address" placeholder="Адрес доставки">

  //         <textarea class="delivery-form__textarea" name="comments" placeholder="Комментарий к заказу"></textarea>
  //       </fieldset>

  //       <fieldset class="delivery-form__fieldset delivery-form__fieldset-radio">
  //         <legend class="delivery-form__legend">Доставка</legend>
  //         <label class="delivery-form__label radio">
  //           <input type="radio" class="radio__input" name="deliveryType" value="delivery">
  //           Доставка
  //         </label>
  //         <label class="delivery-form__label radio">
  //           <input type="radio" class="radio__input" name="deliveryType" value="pickup">
  //           Самовывоз
  //         </label>
  //       </fieldset>

  //       <fieldset class="delivery-form__fieldset delivery-form__fieldset-radio">
  //         <legend class="delivery-form__legend">Оплата</legend>
  //         <label class="delivery-form__label radio">
  //           <input type="radio" class="radio__input" name="paymentType" value="card">
  //           Картой при получении
  //         </label>
  //         <label class="delivery-form__label radio">
  //           <input type="radio" class="radio__input" name="deliveryType" value="cash">
  //           Наличными при получении
  //         </label>
  //       </fieldset>
  //       <fieldset class="delivery-form__fieldset delivery-form__fieldset-radio"></fieldset>
  //     </form>
  //     <!-- /#delivery-form.cart__delivery-form -->

  //   </div>
  //   <!-- /.container cart__container -->
  // </section>
  // <!-- /.cart -->

  };

  renderPlace() {

  };

  renderForm() {

  };


  async mount(parrentElement, data, emptyText) {
    const cartTitle = document.createElement('h2');
    cartTitle.classList.add('cart__title');
    cartTitle.textContent = 'Корзина';

    this.cartData = data;

    if (data.products && data.products.length) {
      this.renderProducts();
      this.renderPlace();
      this.renderForm();
    } else {
      this.containerElement.insertAdjacentHTML('beforeend', `
        <p class="goods__empty">${emptyText || 'Произошла непредвиденная ошибка...'}</p>
      `);
    }

    this.containerElement.append(cartTitle);
    super.mount(parrentElement);
  };

  unmount() {
    super.unmount();
  };

}