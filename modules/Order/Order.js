import { BasicWrapper } from "../BasicWrapper";

export class Order extends BasicWrapper {

  static instance = null;

  constructor() {
    super('section', 'order');

    // Проверка наличия уже существующего образца
    if (!Order.instance) {
      Order.instance = this;
      this.containerElement = this.addContainer(['container', 'order__container']);
      
      // Свойство для определения вставки элемента на странице
      this.isMounted = false;
    }
    
    return Order.instance;
  };

  getOrderHTML() {
    return `
      <div class="order__layout">
        <div class="order__content">
        <h2 class="order__title">Заказ успешно размещен</h2>
        <p class="order__price">20 000 ₽</p>
        <p class="order__number">№43435</p>

        <h2 class="order__subtitle">Данные доставки</h2>
        <table class="order__info table">
          <tr>
            <td class="table__field">Получатель</td>
            <td class="table__value">Иванов Петр Александрович</td>
          </tr>
          <tr>
            <td class="table__field">Телефон</td>
            <td class="table__value">+7 (737) 346 23 00</td>
          </tr>
          <tr>
            <td class="table__field">E-mail</td>
            <td class="table__value">Ivanov84@gmail.com</td>
          </tr>
          <tr>
            <td class="table__field">Адрес доставки</td>
            <td class="table__value">Москва, ул. Ленина, 21, кв. 33</td>
          </tr>
          <tr>
            <td class="table__field">Способ оплаты</td>
            <td class="table__value">Картой при получении</td>
          </tr>
          <tr>
            <td class="table__field">Способ получения</td>
            <td class="table__value">Доставка</td>
          </tr>
        </table>

        <button href="/" class="order__btn" type="button">На главную</button>
      </div>
      <!-- /.order__content -->
    </div>
    <!-- /.order__layout -->`;
  };
  
  mount(insertElement) {
    this.containerElement.insertAdjacentHTML('beforeend', this.getOrderHTML());
    super.mount(insertElement);
  };

}