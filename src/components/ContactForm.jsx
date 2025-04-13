import { useState, useEffect } from 'react';
import '../styles/ContactForm.css';

const ContactForm = ({ addContact, currentContact, updateContact, clearCurrent }) => {
  const [contact, setContact] = useState({
    name: '',
    email: '',
    phone: '',
    type: 'personal'
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (currentContact) {
      setContact({
        ...currentContact
      });
      
      // Handle image preview based on the image data type
      if (currentContact.image) {
        if (typeof currentContact.image === 'string') {
          // If image is a URL/path string
          setImagePreview(currentContact.image);
        } else if (currentContact.image.data || currentContact.image.contentType) {
          // If image is stored in database, construct URL to the image endpoint
          setImagePreview(`${window.location.origin.replace(':5173', ':1000')}/api/contact/${currentContact._id}/image`);
        } else {
          setImagePreview(null);
        }
      } else {
        setImagePreview(null);
      }
    } else {
      setContact({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
      });
      setImage(null);
      setImagePreview(null);
    }
  }, [currentContact]);

  const handleChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleImageChange = e => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImage(null);
      setImagePreview(null);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    
    // Create FormData object to handle file upload
    const formData = new FormData();
    
    // Add contact data to FormData
    formData.append('name', contact.name);
    formData.append('email', contact.email || '');
    formData.append('phone', contact.phone || '');
    formData.append('type', contact.type);
    
    // Add image file to FormData if available
    if (image) {
      console.log("Adding image to form data:", image);
      formData.append('image', image);
    }
    
    if (currentContact) {
      // Pass the ID separately
      updateContact(formData);
    } else {
      addContact(formData);
    }
  
    // Reset form
    setContact({
      name: '',
      email: '',
      phone: '',
      type: 'personal'
    });
    setImage(null);
    setImagePreview(null);
  };

  return (
    <div className="form-card">
      <div className="form-card-body">
        <h3 className="form-title">
          {currentContact ? 'Edit Contact' : 'Add Contact'}
        </h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-input"
              id="name"
              name="name"
              value={contact.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-input"
              id="email"
              name="email"
              value={contact.email || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-input"
              id="phone"
              name="phone"
              value={contact.phone || ''}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Contact Type</label>
            <div className="radio-group">
              <div className="radio-option">
                <input
                  className="radio-input"
                  type="radio"
                  name="type"
                  id="personal"
                  value="personal"
                  checked={contact.type === 'personal'}
                  onChange={handleChange}
                />
                <label className="radio-label" htmlFor="personal">
                  Personal
                </label>
              </div>
              <div className="radio-option">
                <input
                  className="radio-input"
                  type="radio"
                  name="type"
                  id="professional"
                  value="professional"
                  checked={contact.type === 'professional'}
                  onChange={handleChange}
                />
                <label className="radio-label" htmlFor="professional">
                  Professional
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="image" className="form-label">
              Image
            </label>
            <input
              type="file"
              className="form-input"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
            />
            {imagePreview && (
              <img 
                src={imagePreview} 
                alt="Preview" 
                className="image-preview" 
              />
            )}
          </div>
          <button type="submit" className="submit-button">
            {currentContact ? 'Update Contact' : 'Add Contact'}
          </button>
        </form>
        {currentContact && (
          <button
            className="clear-button"
            onClick={clearCurrent}
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
};

export default ContactForm;