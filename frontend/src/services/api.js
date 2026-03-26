import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const contactService = {
  // Get all contacts, with optional search term and favorite filter
  getAll: async (search = '', favorite = false) => {
    let query = '';
    if (search) query += `search=${search}&`;
    if (favorite) query += `favorite=true`;
    
    // Remove trailing & if it exists
    query = query.replace(/&$/, '');
    
    const url = query ? `/contacts?${query}` : '/contacts';
    const response = await api.get(url);
    return response.data;
  },
  
  // Get single contact by ID
  getById: async (id) => {
    const response = await api.get(`/contacts/${id}`);
    return response.data;
  },
  
  // Create a new contact
  create: async (contactData) => {
    const response = await api.post('/contacts', contactData);
    return response.data;
  },
  
  // Update an existing contact
  update: async (id, contactData) => {
    const response = await api.put(`/contacts/${id}`, contactData);
    return response.data;
  },
  
  // Delete a contact
  delete: async (id) => {
    const response = await api.delete(`/contacts/${id}`);
    return response.data;
  }
};

export default api;
