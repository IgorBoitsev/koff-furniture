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
  };

  async postProductToCart(productId, quantity = 1) {
    if (!this.accessKey) {
      await this.getAccessKey();
    }

    try {
      const response = await axios.post(`${this.#apiUrl}api/cart/products`, {
        productId, quantity
      }, {
        headers: {
          Authorization: `Bearer ${this.accessKey}`
        }
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status == 401) {
        this.accessKey = null;
        this.accessKeyService.delete();
      }

      console.error(error);
    }
  };

  async getCart() {
    return await this.getData('api/cart');
  };

  async deleteProductFromCart(productId) {
    if (!this.accessKey) {
      await this.getAccessKey();
    }

    try {
      const response = await axios.delete(`${this.#apiUrl}api/cart/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessKey}`
        }
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status == 401) {
        this.accessKey = null;
        this.accessKeyService.delete();
      }

      console.error(error);
    }
  };

  async changeQuantiyProductToCart(productId, quantity) {
    if (!this.accessKey) {
      await this.getAccessKey();
    }

    try {
      const response = await axios.put(`${this.#apiUrl}api/cart/products`, {
        productId, quantity
      }, {
        headers: {
          Authorization: `Bearer ${this.accessKey}`
        }
      });

      return response.data;
    } catch (error) {
      if (error.response && error.response.status == 401) {
        this.accessKey = null;
        this.accessKeyService.delete();
      }

      console.error(error);
    }
  };
}