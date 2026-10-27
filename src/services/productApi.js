import apiClient from './apiClient';
import { mockProducts } from '../data/mockProducts';

export const productApi = {
  getAll: async (params = {}) => {
    try {
      const res = await apiClient.get('/products', { params });
      return res.data;
    } catch {
      let filtered = [...mockProducts];
      if (params.category && params.category !== 'all') {
        filtered = filtered.filter(p => p.category === params.category);
      }
      if (params.search) {
        const query = params.search.toLowerCase();
        filtered = filtered.filter(p => 
          p.name.toLowerCase().includes(query) ||
          p.farmerName.toLowerCase().includes(query) ||
          p.farmLocation.toLowerCase().includes(query)
        );
      }
      if (params.farmerId) {
        filtered = filtered.filter(p => p.farmerId === params.farmerId);
      }
      return filtered;
    }
  },

  getById: async (id) => {
    try {
      const res = await apiClient.get(`/products/${id}`);
      return res.data;
    } catch {
      return mockProducts.find(p => p.id === id) || null;
    }
  },

  getFeatured: async () => {
    try {
      const res = await apiClient.get('/products/featured');
      return res.data;
    } catch {
      return mockProducts.filter(p => p.isFeatured);
    }
  }
};

export default productApi;
