import React, { useState } from 'react';
import axios from 'axios';
import { MdClose } from 'react-icons/md';
import config from '../../config';
import newsletterImage from '../../assets/images/newl.jpeg';

const Popup = ({ message, type, onClose }) => {
  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={handleOutsideClick}>
      <div className={`bg-white p-6 rounded-lg shadow-xl ${type === 'success' ? 'border-green' : 'border-red'} border-t-4 relative`}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-grey hover:text-grey"
          aria-label="Close"
        >
          <MdClose size={24} />
        </button>
        <p className={`text-lg ${type === 'success' ? 'text-green' : 'text-red'} pr-6`}>{message}</p>
      </div>
    </div>
  );
};

const NamePopup = ({ email, onSubmit, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, firstName, lastName });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-6 rounded-lg shadow-xl relative" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-grey hover:text-grey"
          aria-label="Close"
        >
          <MdClose size={24} />
        </button>
        <h3 className="text-xl text-grey font-semibold mb-4">Complete your subscription</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-grey">First Name</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-grey rounded-md shadow-sm focus:outline-none focus:ring-blue"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-grey">Last Name</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-grey rounded-md shadow-sm focus:outline-none focus:ring-blue"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange text-white font-semibold px-4 py-2 rounded-md hover:bg-red transition duration-300"
          >
            Confirm Subscription
          </button>
        </form>
      </div>
    </div>
  );
};

const NewsletterSubscription = () => {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const [email, setEmail] = useState('');
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: '' });

  const handleSubscribe = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      setShowNamePopup(true);
    } else {
      setPopup({ show: true, message: 'Email is not valid!', type: 'error' });
    }
  };

  const handleConfirmSubscription = ({ email, firstName, lastName }) => {
    axios.post(`${APP_BASE_URL}subscription/add`, { email, first_name: firstName, last_name: lastName })
      .then(response => {
        if (response.status === 201) {
          setPopup({ show: true, message: 'Successfully subscribed!', type: 'success' });
          setEmail('');
          setShowNamePopup(false);
        }
      })
      .catch(error => {
        let errorMessage = 'An error occurred. Please try again.';
        if (error.response) {
          errorMessage = `Error: ${error.response.data.message || 'Unknown error'}`;
        } else if (error.request) {
          errorMessage = 'No response received from the server.';
        } else {
          errorMessage = `Error: ${error.message}`;
        }
        setPopup({ show: true, message: errorMessage, type: 'error' });
        setShowNamePopup(false);
      });
  };

  return (
    <div className="flex hidden md:flex w-full max-w-full bg-white rounded-lg overflow-hidden">
      <div className="p-8 pr-0 flex flex-col justify-center">
        <h2 className="text-sm text-gray-600 mb-2 opacity-50">Hillpad Newsletter</h2>
        <h1 className="text-4xl font-bold mb-4">
          Stay Ahead in <span className="text-orange">Online Learning!</span>
        </h1>
        <p className="text-gray-600 w-[80%] opacity-50 mb-6">
          Unlock the latest trends in online education, get personalized course
          recommendations, and stay informed about upcoming opportunities.
        </p>
        <form onSubmit={handleSubscribe} className="flex w-[90%]">
          <input
            type="email"
            placeholder="Your E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-5 rounded-full border-2 border-grey border-opacity-[10%] shadow-md focus:outline-none"
            required
          />
          <button
            type="submit"
            className="bg-orange relative right-[110px] top-[8px] text-white h-[50px] w-[100px] rounded-full hover:bg-red-600 transition duration-300"
          >
            Subscribe
          </button>
        </form>
      </div>
      <div className="w-[70%]">
        <img
          src={newsletterImage}
          alt="Woman learning online"
          className="object-cover w-full h-full"
        />
      </div>
      {popup.show && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ show: false, message: '', type: '' })}
        />
      )}
      {showNamePopup && (
        <NamePopup
          email={email}
          onSubmit={handleConfirmSubscription}
          onClose={() => setShowNamePopup(false)}
        />
      )}
    </div>
  );
};

export default NewsletterSubscription;