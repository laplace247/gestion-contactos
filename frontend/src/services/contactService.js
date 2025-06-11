const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ContactService {
  async getAllContacts() {
    try {
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include' // Para CORS con credenciales
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error fetching contacts:', error);
      throw new Error('Error al obtener contactos: ' + error.message);
    }
  }

  async getContactById(id) {
    try {
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error fetching contact:', error);
      throw new Error('Error al obtener contacto: ' + error.message);
    }
  }

  async createContact(contactData) {
    try {
      console.log('Creating contact:', contactData); // Debug
      
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(contactData)
      });

      console.log('Response status:', response.status); // Debug

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error creating contact:', error);
      throw new Error('Error al crear contacto: ' + error.message);
    }
  }

  async updateContact(id, contactData) {
    try {
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(contactData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.data || data;
    } catch (error) {
      console.error('Error updating contact:', error);
      throw new Error('Error al actualizar contacto: ' + error.message);
    }
  }

  async deleteContact(id) {
    try {
      const response = await fetch(`${API_URL}/contacts/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting contact:', error);
      throw new Error('Error al eliminar contacto: ' + error.message);
    }
  }
}

export default new ContactService();