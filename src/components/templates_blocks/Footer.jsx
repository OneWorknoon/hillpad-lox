import logo from '../../assets/images/hillpad-transparent.png';
import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube, FaTiktok, FaLinkedin, FaChevronDown } from 'react-icons/fa';
import { MdOutlineMail, MdClose } from 'react-icons/md';
import axios from 'axios';
import Modal from './newsLetterModal';
import config from '../../config';
const Popup = ({ message, type, onClose }) => {
  const handleOutsideClick = useCallback((e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" >
      <div className={`bg-white p-6 rounded-lg shadow-xl ${type === 'success' ? 'border-green' : 'border-red'} border-t-4 relative`}>
        {/* <p className='text-black font-bold cursor-pointer relative left-[95%]' onClick={handleOutsideClick}>X</p> */}

        <button
          onClick={onClose}
          className="absolute block top-2 right-2 text-grey hover:text-grey"
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
          className="absolute cursor-pointer top-2 right-2 text-grey hover:text-grey"
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
              className="mt-1 text-black block w-full px-3 py-2 border border-grey  rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue"
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
              className="mt-1 text-black block w-full px-3 py-2 border border-grey rounded-md shadow-sm focus:outline-none focus:ring-blue focus:border-blue"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-orange text-white font-semibold px-4 py-2 rounded-md hover:bg-red transition "
          >
            Confirm Subscription
          </button>
        </form>
      </div>
    </div>
  );
};

export default function Footer() {
  const APP_BASE_URL = config.VITE_BASE_URL;
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [showNamePopup, setShowNamePopup] = useState(false);
  const [popup, setPopup] = useState({ show: false, message: '', type: '' });
  const [activeSection, setActiveSection] = useState('');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Check on mount
    window.addEventListener('resize', handleResize); // Check on window resize

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSubscribe = () => {
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

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? '' : section);
  };
  if (isMobile) {
    return (
      <footer className="bg-navy_blue text-white">
        <div className="max-w-7xl mx-auto px-4 py-8 md:p-8">
          {/* Logo and Social Media - Always visible */}
          <div className="mb-8 md:mb-0">
            <img className="w-32 md:w-1/3 mb-6" src={logo} alt="Hillpad Logo" />
            <div className="flex flex-wrap gap-4 md:gap-6">
              <Link to="https://facebook.com/hillpadHQ/" className="text-2xl hover:text-light"><FaFacebook /></Link>
              <Link to="https://twitter.com/hillpadhq" className="text-2xl hover:text-light"><FaTwitter /></Link>
              <Link to="https://www.instagram.com/hillpadcom/" className="text-2xl hover:text-light"><FaInstagram /></Link>
              <Link to="https://www.youtube.com/@hillpad" className="text-2xl hover:text-light"><FaYoutube /></Link>
              <Link to="https://www.tiktok.com/@hillpadhq" className="text-2xl hover:text-light"><FaTiktok /></Link>
              <Link to="https://www.linkedin.com/company/hillpad-com" className="text-2xl hover:text-light"><FaLinkedin /></Link>
            </div>
          </div>

          {/* Newsletter Section - Always visible */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">Subscribe to our newsletter</h3>
            <p className="mb-4 text-sm text-[#ffffffa6]">Don't miss any relevant tips and announcements!</p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdOutlineMail className="w-5 h-5 text-grey-400" />
              </div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full pl-10 pr-24 py-3 bg-[#ffffff0a] rounded-full border border-[#ffffffa6] focus:outline-none focus:border-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="absolute right-2 top-2 bg-orange text-white font-semibold px-4 py-1 rounded-full hover:bg-red-600 transition duration-300"
                onClick={handleSubscribe}
              >
                Subscribe
              </button>
            </div>
          </div>

          {/* Collapsible Sections */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
            {/* Resources Section */}
            <div className="border-b md:border-none border-[#ffffff1a]">
              <button
                className="w-full flex justify-between items-center py-4 md:block md:py-0"
                onClick={() => toggleSection('resources')}
              >
                <h3 className="font-semibold mb-0 md:mb-4">Resources</h3>
                <FaChevronDown className={`md:hidden transition-transform duration-300 ${activeSection === 'resources' ? 'rotate-180' : ''}`} />
              </button>
              <ul className={`space-y-2 overflow-hidden transition-all duration-300 ${activeSection === 'resources' ? 'max-h-96 pb-4' : 'max-h-0 md:max-h-full'}`}>
                {/* <li><Link to="/coursefinder?tuition=0%2C-1" className="block hover:text-light text-sm text-[#ffffffa6]">Free Courses</Link></li> */}
                <li><Link to="/coursefinder?programme=undergraduate" className="block hover:text-light text-sm text-[#ffffffa6]">Undergraduates</Link></li>
                <li><Link to="/coursefinder?programme=postgraduate" className="block hover:text-light text-sm text-[#ffffffa6]">Graduates</Link></li>
                <li><Link to="/coursefinder?programme=Executive+Education" className="block hover:text-light text-sm text-[#ffffffa6]">Executive Education</Link></li>
                <li><Link to="/coursefinder?programme=Short+Courses" className="block hover:text-light text-sm text-[#ffffffa6]">Short Courses</Link></li>
                <li><Link to="/coursefinder?programme=Certificate+Courses" className="block hover:text-light text-sm text-[#ffffffa6]">Certificate Courses</Link></li>
                {/* <li><Link to="/countries" className="block hover:text-light text-sm text-[#ffffffa6]">Browse by country</Link></li> */}
                <li><Link to="/discipline/" className="block hover:text-light text-sm text-[#ffffffa6]">Browse by discipline</Link></li>
              </ul>
            </div>

            {/* Quick Links Section */}
            <div className="border-b md:border-none border-[#ffffff1a]">
              <button
                className="w-full flex justify-between items-center py-4 md:block md:py-0"
                onClick={() => toggleSection('quickLinks')}
              >
                <h3 className="font-semibold mb-0 md:mb-4">Quick Links</h3>
                <FaChevronDown className={`md:hidden transition-transform duration-300 ${activeSection === 'quickLinks' ? 'rotate-180' : ''}`} />
              </button>
              <ul className={`space-y-2 overflow-hidden transition-all duration-300 ${activeSection === 'quickLinks' ? 'max-h-96 pb-4' : 'max-h-0 md:max-h-full'}`}>
                <li><Link to="/about" className="block hover:text-orange text-sm text-[#ffffffa6]">About Us</Link></li>
                <li><Link to="/contact-us" className="block hover:text-light text-sm text-[#ffffffa6]">Contact Us</Link></li>
                <li><Link to="/faq" className="block hover:text-light text-sm text-[#ffffffa6]">FAQs</Link></li>
                <li><Link to="https://hillpad.com/blog/news-resources" className="block hover:text-light text-sm text-[#ffffffa6]">Blogs</Link></li>
              </ul>
            </div>
          </div>

          {/* Copyright Section */}
          <div className="mt-8 pt-8 border-t border-[#ffffff1a]">
            <div className="flex flex-col md:flex-row md:justify-between items-center gap-4 text-sm text-[#ffffffa6]">
              <p className="text-center md:text-left">
                &copy; 2024 <a className="hover:text-light" href="https://hillpad.com">Hillpad.com</a>, Inc. All rights reserved.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="https://hillpad.com/blog/privacy-policy/" className="hover:text-light text-sm" target="_blank">Privacy policy</Link>
                <Link to="https://hillpad.com/blog/terms-of-use/" className="hover:text-light text-sm" target="_blank">Terms of use</Link>
                <Link to="https://hillpad.com/blog/disclaimer" className="hover:text-light text-sm" target="_blank">Disclaimer</Link>

              </div>
            </div>
          </div>
        </div>

        {/* Modals */}
        {showModal && <Modal onClose={() => setShowModal(false)} />}
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
      </footer>
    );
  } else {
    return (<footer className="bg-navy_blue text-white p-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-1">
          <div className="col-span-1">
            <img className='space-x-4 mb-4 w-1/3' src={logo} />

            {/* <h2 className="text-3xl font-bold mb-4 text-orange">hillPad</h2> */}
            <div className="flex space-x-4 mb-4">
              <Link to="https://facebook.com/hillpadHQ/" className="text-2xl hover:text-light"><FaFacebook /></Link>
              <Link to="https://twitter.com/hillpadhq" className="text-2xl hover:text-light"><FaTwitter /></Link>
              <Link to="https://www.instagram.com/hillpadcom/" className="text-2xl hover:text-light"><FaInstagram /></Link>
            </div>
            <div className="flex space-x-4">
              <Link to="https://www.youtube.com/@hillpad" className="text-2xl hover:text-light"><FaYoutube /></Link>
              <Link to="https://www.tiktok.com/@hillpadhq" className="text-2xl hover:text-light"><FaTiktok /></Link>
              <Link to="https://www.linkedin.com/company/hillpad-com" className="text-2xl hover:text-light"><FaLinkedin /></Link>
            </div>
          </div>

          <div className="col-span-1">
            <h3 className=" font-semibold mb-4">Resources</h3>
            <ul className="space-y-">
              {/* <li><Link to="/coursefinder?tuition=0%2C-1" className="hover:text-light text-sm text-[#ffffffa6]">Free Courses</Link></li> */}
              <li><Link to="/coursefinder?programme=undergraduate" className="hover:text-light text-sm text-[#ffffffa6]">Undergraduates</Link></li>
              <li><Link to="/coursefinder?programme=postgraduate" className="hover:text-light text-sm text-[#ffffffa6]">Graduates</Link></li>
              <li><Link to="/coursefinder?programme=Executive+Education" className="hover:text-light text-sm text-[#ffffffa6]">Executive Education</Link></li>
              <li><Link to="/coursefinder?programme=Short+Courses" className="hover:text-light text-sm text-[#ffffffa6]">Short Courses</Link></li>
              <li><Link to="/coursefinder?programme=Certificate+Courses" className="hover:text-light text-sm text-[#ffffffa6]">Certificate Courses</Link></li>

              {/* <li><Link to="/countries" className="hover:text-light text-sm text-[#ffffffa6]">Browse by country</Link></li> */}
              <li><Link to="/discipline/" className="hover:text-light text-sm text-[#ffffffa6]">Browse by discipline</Link></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className=" font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-">
              <li><a href="/about" className="hover:text-orange  text-sm text-[#ffffffa6]">About Us</a></li>
              <li><a href="/contact-us" className="hover:text-light text-sm text-[#ffffffa6]">Contact Us</a></li>
              <li><a href="/faq" className="hover:text-light text-sm text-[#ffffffa6]">FAQs</a></li>
              <li><a href="https://hillpad.com/blog/news-resources" className="hover:text-light text-sm text-[#ffffffa6]">Blogs</a></li>
            </ul>
          </div>

          <div className="col-span-1">
            <h3 className="text-2xl font-semibold mb-4">Subscribe to our newsletter</h3>
            <p className="mb-4 text-sm text-[#ffffffa6]">Don't miss any relevant tips and announcements!</p>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <MdOutlineMail className="w-5 h-5 text-grey-400" />
              </div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full pl-10 pr-20 py-3 bg-[#ffffff0a] rounded-full border border-[#ffffffa6] focus:outline-none focus:border-white"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                className="absolute right-2  top-2 bg-orange text-white font-semibold px-2 py-1 rounded-full hover:bg-red-600 transition duration-300"
                onClick={handleSubscribe}
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-20 border-t border-t-[0.2px] border-opacity-40 w-[150vw] relative right-40 text-[#4b4b4ba6] border-grey-700">
        </div>
        <div className="  text-[#ffffffa6] border-grey-700">
          <div className="flex text-sm text-[#ffffffa6] flex-wrap justify-between items-center">
            <p>&copy; 2025 <a className='hover:text-light' href="https://hillpad.com">Hillpad.com, </a>Inc. All rights reserved.</p>
            <div className="flex space-x-4 mt-4 sm:mt-0">
              <Link to="https://hillpad.com/blog/privacy-policy/" className="hover:text-light text-sm" target="_blank">Privacy policy</Link>
              <Link to="https://hillpad.com/blog/terms-of-use/" className="hover:text-light text-sm" target="_blank">Terms of use</Link>
              <Link to="https://hillpad.com/blog/disclaimer" className="hover:text-light text-sm" target="_blank">Disclaimer</Link>

            </div>
          </div>
        </div>
      </div>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
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
    </footer>
    )
  }
}