import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const GetContact = ({ id, setId }) => {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  
  const [isLoader, setIsLoader] = useState(false);

  const [counter, setCounter] = useState(0);

  const deleteContact = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/api/${id}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setCounter(counter + 1);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  };

  const fetchData = async () => {
    try {
      setIsLoader(true);
      const response = await axios.get('http://localhost:1000/api/getcontacts', {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      setContacts(response.data.contacts);
      setIsLoader(false);
    } catch (error) {
      console.error('Error fetching contacts:', error);
      setIsLoader(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [counter]);

  const editContact = (id) => {
    setId(id);
    navigate('/addcontact');
  };

  return (
    <>
      {isLoader ? (
        
        <div>.......Loading .........</div>
      ) : (
        <div className="container">
          {contacts.map((data) => (
            <div className="container my-5 bg-success text-center p-5" key={data._id}>
              <h1>{data.name}</h1>
              <h2>{data.phone}</h2>
              <h3>{data.gmail}</h3>
              {data.ctype ? (
                <button className="btn btn-warning mx-3">Personal</button>
              ) : (
                <button className="btn btn-danger mx-3">Professional</button>
              )}
              <button onClick={() => editContact(data._id)} className="btn btn-info mx-3">
                Edit
              </button>
              <button onClick={() => deleteContact(data._id)} className="btn btn-primary mx-3">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default GetContact;
