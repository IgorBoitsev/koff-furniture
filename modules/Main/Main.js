import { BasicWrapper } from "../BasicWrapper";

export class Main extends BasicWrapper {
  
  static instance = null;

  constructor() {
    super('main', 'main')
    //// Проверка наличия уже существующего образца
    if (!Main.instance) {
      Main.instance = this;

      //// this.element = document.createElement('main');
      //// Свойство для определения вставки элемента на странице
      this.isMounted = false;
    }
    
    return Main.instance;
  };

  mount(insertElement) {
    this.mountElement.textContent = '';
    super.mount(insertElement);
  };

  //// unmount() {
   // // this.element.remove();
   // // this.isMounted = false;
  //// }

}