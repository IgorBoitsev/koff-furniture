export class LocalStorageService {
  
  constructor(key) {
    this.lsKey = key;
  };

  get() {
    const data = localStorage.getItem(this.lsKey);
    if (data) {
      // console.log(`Данные с ключом ${this.lsKey} успешно получены из хранилища: ${data}`);
      return data;
    } else {
      // console.log('В хранилище нет данных с таким ключом.');
      return null;
    }
  };

  set(content) {
    if (typeof(content) === 'string' || typeof(content) === 'number') {
      localStorage.setItem(this.lsKey, content);
      // console.log(`Данные ${content} с ключом ${this.lsKey} успешно записаны в хранилище.`);
    } else if (typeof(content) === 'object') {
      localStorage.setItem(this.lsKey, JSON.stringify(content));
      // console.log(`Данные ${content} с ключом ${this.lsKey} успешно записаны в хранилище.`);
    } else {
      // console.log('Переданные данные должны быть в формате строки.');
    }
  };

  delete() {
    const data = localStorage.getItem(this.lsKey);
    if (data) {
      localStorage.removeItem(this.lsKey);
      // console.log(`Данные ${data} с ключом ${this.lsKey} успешно удалены из хранилища.`);
    } else {
      // console.log('В хранилище нет данных с таким ключом.');
    }
  };
}

export class FavoriteService extends LocalStorageService {

  static instance;

  constructor(key = 'favorite') {
    if (!FavoriteService.instance) {
      super(key);
      this.favorite = new Set(this.get());
      FavoriteService.instance = this;
    }

    return FavoriteService.instance;
  }

  get() {
    const data = super.get();

    if (data) {
      const favorite = JSON.parse(data);
      if (Array.isArray(favorite)) {
        return favorite;
      }
    }

    return [];
  }

  add(value) {
    this.favorite.add(value);
    this.set([...this.favorite]);
  }

  remove(value) {
    if (this.check(value)) {
      this.favorite.delete(value);
      this.set([...this.favorite]);
      return true;
    } else {
      return false;
    }
  }

  check(value) {
    return this.favorite.has(value);
  }

}

export class AccessKeyService extends LocalStorageService {

  static instance;

  constructor(key = 'accessKey') {
    if (!AccessKeyService.instance) {
      super(key);
      AccessKeyService.instance = this;
    }

    return AccessKeyService.instance;
  }

}