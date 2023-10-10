import axios from 'axios';
import { API_URL } from '../const.js';

export class ApiService {
  #apiUrl = API_URL;

  constructor() {
    this.accessKey = localStorage.getItem('accessKey');
  };

  async getAccessKey() {
    try {
      const response = await axios.get(`${this.#apiUrl}api/users/accessKey`);
      this.accessKey = response.data.accessKey;
      localStorage.setItem('accessKey', this.accessKey);
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
        localStorage.removeItem('accessKey');

        return this.getData(pathname, params);
      } else {
        console.warn(error);
      }
    }
  };

  async getProducts(page = 1, limit = 12, list, category, q) {
    return await this.getData('api/products', {
      // page,
      // limit,
      // list,
      // category,
      // q
    });
  };

  async getProductsCategories() {
    return await this.getData('api/productCategories');
  };

  async getProductsById(id) {
    return await this.getData(`api/products/${id}`);
  }
}