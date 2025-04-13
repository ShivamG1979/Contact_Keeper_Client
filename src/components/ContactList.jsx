import React from 'react';
import '../styles/ContactList.css';

const ContactList = ({ contacts, loading, deleteContact, setCurrent, toggleFavorite }) => {
  if (loading) {
    return <div className="loading-text">Loading contacts...</div>;
  }

  if (contacts.length === 0) {
    return <div className="empty-text">No contacts found</div>;
  }

  // Function to determine the image source properly
  const getImageSrc = (contact) => {
    if (!contact.image) return null;
    
    // If image data shows it exists
    if (contact.image && contact.image.exists) {
      // Use the proper API endpoint
      return `${window.location.origin.replace(':5173', ':1000')}/api/contact/${contact._id}/image`;
    }
    
    // If image is a string URL 
    if (typeof contact.image === 'string') {
      if (contact.image.startsWith('http')) {
        return contact.image;
      }
      return `${window.location.origin.replace(':5173', ':1000')}/uploads/${contact.image}`;
    }
    
    return null;
  };

  // Default avatar for when images fail to load
  const defaultAvatar = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='50' height='50' viewBox='0 0 50 50'%3E%3Ccircle cx='25' cy='25' r='25' fill='%23e0e0e0'/%3E%3Ccircle cx='25' cy='20' r='8' fill='%23bdbdbd'/%3E%3Cpath d='M25,50 C33.2842712,50 40.5,45 40.5,38 C40.5,31 33.2842712,28 25,28 C16.7157288,28 9.5,31 9.5,38 C9.5,45 16.7157288,50 25,50 Z' fill='%23bdbdbd'/%3E%3C/svg%3E";

  return (
    <div className="contact-list-container">
      {contacts.map(contact => (
        <div className="contact-card" key={contact._id}>
          <div className="contact-card-body">
            <div className="contact-header">
              {contact.image ? (
                <img
                  src={getImageSrc(contact)}
                  alt={contact.name}
                  className="contact-img"
                  onError={(e) => {
                    console.log(`Using default avatar for ${contact.name}`);
                    e.target.onerror = null;
                    e.target.src = defaultAvatar;
                  }}
                />
              ) : (
                <div className="contact-img-placeholder">
                  <i className="fas fa-user fa-2x"></i>
                </div>
              )}
              <div>
                <h5 className="contact-name">{contact.name}</h5>
                <span
                  className={`contact-badge ${
                    contact.type === 'professional' ? 'badge-success' : 'badge-primary'
                  }`}
                >
                  {contact.type.charAt(0).toUpperCase() + contact.type.slice(1)}
                </span>
              </div>
            </div>

            {contact.email && (
              <p className="contact-details">
                <i className="fas fa-envelope contact-icon"></i>
                {contact.email}
              </p>
            )}

            {contact.phone && (
              <p className="contact-details">
                <i className="fas fa-phone contact-icon"></i>
                {contact.phone}
              </p>
            )}

            <div className="contact-actions">
              <button
                className="action-button edit-button"
                onClick={() => setCurrent(contact)}
              >
                Edit
              </button>
              <button
                className="action-button delete-button"
                onClick={() => deleteContact(contact._id)}
              >
                Delete
              </button>
              <button
                className="action-button favorite-button"
                onClick={() => toggleFavorite(contact._id)}
              >
                <i
                  className={`star-icon ${contact.favorite ? 'favorite' : ''}`}
                >❤️</i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;