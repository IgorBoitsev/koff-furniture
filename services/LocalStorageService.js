export class LocalStorageService {
  
  constructor(key) {
    this.lsKey = key;
  };

  getLSItem() {
    const data = localStorage.getItem(this.lsKey);
    if (data) {
      console.log(`Данные с ключом ${this.lsKey} успешно получены из хранилища: ${data}`);
      return localStorage.getItem(this.lsKey);
    } else {
      console.log('В хранилище нет данных с таким ключом.');
    }
  };

  setLSItem(content) {
    if (typeof(content) === 'string') {
      localStorage.setItem(this.lsKey, content);
      console.log(`Данные ${content} с ключом ${this.lsKey} успешно записаны в хранилище.`);
    } else {
      console.log('Переданные данные должны быть в формате строки.');
    }
  };

  deleteLSItem() {
    const data = localStorage.getItem(this.lsKey);
    if (data) {
      localStorage.removeItem(this.lsKey);
      console.log(`Данные ${data} с ключом ${this.lsKey} успешно удалены из хранилища.`);
    } else {
      console.log('В хранилище нет данных с таким ключом.');
    }
  };
}