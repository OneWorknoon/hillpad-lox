import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RegisterInterestForm = ({ onClose, courseId, slug }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.userInfo);
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [formData, setFormData] = useState({
    title: '',
    firstName: user.firstName || '',
    lastName: user.lastame || '',
    email: user.email || '',
    sex: '',
    country: '',
    nationality: '',
    date_of_birth: '',
    phone_number: '',
    address: '',
    course: courseId
  });

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://api.hillpad.com/api/academics/country/list');
        if (!response.ok) {
          throw new Error('Failed to fetch countries');
        }
        const data = await response.json();
        setCountries(data.results);
      } catch (error) {
        console.error(error);
        setMessage({
          type: 'error',
          text: 'Failed to fetch countries. Please try again later.'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await fetch('https://api.hillpad.com/api/academics/course/create_interest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'An error occurred');
      }

      setMessage({
        type: 'success',
        text: 'Application submitted successfully!'
      });

      // Delay navigation to show success message
      setTimeout(() => {
        window.open(slug, '_blank');
      }, 2000);

      onClose();

    } catch (error) {
      setMessage({
        type: 'error',
        text: error.message || 'An error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const MessageAlert = ({ type, text }) => {
    if (!text) return null;

    const alertStyles = type === 'error' 
      ? 'bg-red-50 border-red-300 text-red-700'
      : 'bg-green-50 border-green-300 text-green-700';

    return (
      <div className={`p-4 mb-4 border rounded-md ${alertStyles}`} role="alert">
        <p className="font-medium">
          {type === 'error' ? 'Error' : 'Success'}
        </p>
        <p className="text-sm mt-1">
          {text}
        </p>
      </div>
    );
  };

  return (
    <div className="p-6 mt-10 relative overflow-y-auto">
      <h2 className="text-2xl text-black font-bold mb-4">Apply Here</h2>
      
      <MessageAlert type={message.type} text={message.text} />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <select
              name="title"
              className="w-full p-2 border rounded-md"
              required
              onChange={handleInputChange}
              value={formData.title}
            >
              <option value="">Select title</option>
              <option value="Mr">Mr</option>
              <option value="Mrs">Mrs</option>
              <option value="Miss">Miss</option>
              <option value="Dr">Dr</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Sex</label>
            <select
              name="sex"
              className="w-full p-2 border rounded-md"
              required
              onChange={handleInputChange}
              value={formData.sex}
            >
              <option value="">Select sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              className="w-full p-2 border rounded-md"
              required
              onChange={handleInputChange}
              value={formData.firstName}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              className="w-full p-2 border rounded-md"
              required
              onChange={handleInputChange}
              value={formData.lastName}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            className="w-full p-2 border rounded-md"
            required
            onChange={handleInputChange}
            value={formData.email}
            disabled={user.email}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Country of Residence</label>
            <select
              name="country"
              className="w-full p-2 border rounded-md"
              required
              onChange={handleInputChange}
              value={formData.country}
            >
              <option value="">Select country</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Nationality</label>
            <select
              name="nationality"
              className="w-full p-2 border rounded-md"
              required
              onChange={handleInputChange}
              value={formData.nationality}
            >
              <option value="">Select nationality</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Date of Birth</label>
            <input
              type="date"
              name="date_of_birth"
              className="w-full p-2 border rounded-md"
              required
              onChange={handleInputChange}
              value={formData.date_of_birth}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              name="phone_number"
              className="w-full p-2 border rounded-md"
              required
              onChange={handleInputChange}
              value={formData.phone_number}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <textarea
            name="address"
            className="w-full p-2 border rounded-md"
            rows="3"
            required
            onChange={handleInputChange}
            value={formData.address}
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded-md"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-orange text-white rounded-md"
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterInterestForm;