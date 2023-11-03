import { api } from '../config';

const path = '/v1/catalog';

interface Product {
  name: string;
}

export default {
  async get(query = null) {
    let params = '';
    if (query) {
      params = '?' + new URLSearchParams(query).toString();
    }
    const resp = await api.get(`${path}/product${params}`);

    return resp.data.data;
  },

  async getProduct(code: number): Promise<Product> {
    const resp = await api.get(`${path}/product/${code}`);

    return resp.data.data;
  },
  async getProductImages(code: number) {
    const resp = await api.get(`${path}/product/${code}/images`);

    return resp.data.data;
  }
};
