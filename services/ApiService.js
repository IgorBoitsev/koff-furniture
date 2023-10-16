import axios from 'axios';
import { API_URL } from '../const.js';
import { AccessKeyService } from './LocalStorageService.js';

export class ApiService {
  #apiUrl = API_URL;

  constructor() {
    this.accessKeyService = new AccessKeyService('accessKey');
    this.accessKey = this.accessKeyService.get();
  };

  async getAccessKey() {
    try {
      const response = await axios.get(`${this.#apiUrl}api/users/accessKey`);
      this.accessKey = response.data.accessKey;
      this.accessKeyService.set(this.accessKey);
    } catch (error) {
        console.warn('error: ', error);
    }
  };

  async getData(pathname, params = {}) {
    if (!this.accessKey) {
      await this.getAccessKey();
    }

    try {
      const response = await axios.get(`${this.#apiUrl}${pathname}`, {
        headers: {
          Authorization: `Bearer ${this.accessKey}`
        },
        params
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 401) {
        this.accessKey = null;
        this.accessKeyService.delete();

        return this.getData(pathname, params);
      } else {
        console.warn(error);
      }
    }
  };

  async getProducts(params) {
      return await this.getData('api/products', params);
  };

  async getProductsCategories() {
    return await this.getData('api/productCategories');
  };

  async getProductsById(id) {
    return await this.getData(`api/products/${id}`);
  }
}