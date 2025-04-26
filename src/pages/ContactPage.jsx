import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ContactForm from '../components/ContactForm';
import ContactList from '../components/ContactList';
import '../styles/ContactPage.css';

const ContactPage = ({ user, logout }) => {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  const fetchContacts = async () => {
    setLoading(true);
  
    // 🔍 Add this line to log the token
    const token = localStorage.getItem('authToken');
    console.log('Auth token in ContactPage:', token);
  
    try {
      let endpoint = '/api/getcontacts';
  
      if (activeTab === 'favorites') {
        endpoint = '/api/favorites/all';
      } else if (activeTab !== 'all') { 
        endpoint = `/api/category/${activeTab}`;
      }
  
      const res = await axios.get(endpoint);
      if (res.data.success) {
        setContacts(res.data.contacts);
      }
    } catch (error) {
      console.error('Error fetching contacts:', error);
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('authToken');
        navigate('/login');
      }
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchContacts();
  }, [activeTab]);

  const addContact = async (formData) => {
    try {
      setLoading(true); // Show loading indicator during the request
  
      const res = await axios.post('/api/addcontact', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      if (res.data.success) {
        console.log('Contact added successfully!', res.data);
        console.log('Image in response:', res.data.contact.image);
        fetchContacts();
        clearCurrent();
      } else {
        console.error("Error adding contact: ", res.data.message);
      }
    } catch (error) {
      console.error('Error adding contact:', error);
      console.error('Error details:', error.response ? error.response.data : 'No response data');
    } finally {
      setLoading(false);  // Hide the loading indicator
    }
  };

  const updateContact = async (contactData) => {
    try {
      if (!currentContact || !currentContact._id) {
        console.error('No contact selected for update');
        return;
      }
  
      const res = await axios.put(`/api/${currentContact._id}`, contactData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (res.data.success) {
        setCurrentContact(null);
        fetchContacts();
      }
    } catch (error) {
      console.error('Error updating contact:', error);
    }
  };

  const deleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        const res = await axios.delete(`/api/${id}`);
        if (res.data.success) {
          fetchContacts();
        }
      } catch (error) {
        console.error('Error deleting contact:', error);
      }
    }
  };

  const toggleFavorite = async (id) => {
    try {
      await axios.patch(`/api/${id}/favorite`);
      fetchContacts();
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const searchContacts = async (searchTerm) => {
    if (!searchTerm) {
      fetchContacts();
      return;
    }
    
    try {
      const res = await axios.get(`/api/search?q=${searchTerm}`);
      if (res.data.success) {
        setContacts(res.data.contacts);
      }
    } catch (error) {
      console.error('Error searching contacts:', error);
    }
  };

  const filteredContacts = contacts.filter(contact => {
    const searchRegex = new RegExp(filter, 'i');
    return (
      searchRegex.test(contact.name) || 
      searchRegex.test(contact.email) || 
      searchRegex.test(contact.phone)
    );
  });

  const clearCurrent = () => {
    setCurrentContact(null);
  };
  
  
  return (
    <div className="page-container">
      <div className="header-actions">
        <button className="logout-button" onClick={logout}>
          Logout ({user?.name})
        </button>
      </div>

      <div className="content-wrapper">
        <div className="form-section">
          <ContactForm 
            addContact={addContact} 
            currentContact={currentContact}
            updateContact={updateContact}
            clearCurrent={clearCurrent}
          />
        </div>
        
        <div className="list-section">
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Filter contacts..."
              value={filter}
              onChange={(e) => {
                setFilter(e.target.value);
                if (e.target.value.length >= 3) {
                  searchContacts(e.target.value);
                } else if (e.target.value.length === 0) {
                  fetchContacts();
                }
              }}
            />
          </div>
          
          <ul className="tabs-container">
            <li className="tab-item">
              <a 
                className={`tab-link ${activeTab === 'all' ? 'active' : ''}`}
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('all');
                }}
              >
                All
              </a>
            </li>
            <li className="tab-item">
              <a 
                className={`tab-link ${activeTab === 'personal' ? 'active' : ''}`}
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('personal');
                }}
              >
                Personal
              </a>
            </li>
            <li className="tab-item">
              <a 
                className={`tab-link ${activeTab === 'professional' ? 'active' : ''}`}
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('professional');
                }}
              >
                Professional
              </a>
            </li>
            <li className="tab-item">
              <a 
                className={`tab-link ${activeTab === 'favorites' ? 'active' : ''}`}
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  setActiveTab('favorites');
                }}
              >
                Favorites
              </a>
            </li>
          </ul>
          
          <ContactList 
            contacts={filteredContacts}
            loading={loading}
            deleteContact={deleteContact}
            setCurrent={setCurrentContact}
            toggleFavorite={toggleFavorite}
          />
        </div>
      </div>
    </div>
  );
};

export default ContactPage;