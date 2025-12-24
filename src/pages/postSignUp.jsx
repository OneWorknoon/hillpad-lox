import React, { useState, useEffect } from 'react';
import { CheckCircle, ChevronRight, ChevronLeft } from 'lucide-react';
import { useNavigate, useLocation } from "react-router-dom";
import axios from 'axios';
import config from '../config';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { fetchUser3 } from '../redux/userSlice';

const PostSignupSelection = () => {
    const [step, setStep] = useState(1);
    const user = useSelector((state) => state.user);
    const [selectedDisciplines, setSelectedDisciplines] = useState([]);
    const [selectedCountries, setSelectedCountries] = useState([]);
    const [disciplines, setDisciplines] = useState([]);
    const dispatch = useDispatch();
    const [countries, setCountries] = useState([
       { id: 17, name: "United States" },
       { id: 6, name: "United Kingdom" },
       { id: 18, name: "Canada" },
       { id: 12, name: "Australia" },
       { id: 7, name: "Germany" },
       { id: 23, name: "France" },
       { id: 26, name: "Japan" },
       { id: 163, name: "China" },
       { id: 22, name: "India" },
       { id: 8, name: "Italy" },
       { id: 72, name: "Singapore" },
       { id: 15, name: "South Korea" },
       { id: 10, name: "Spain" },
       { id: 62, name: "Switzerland" },
       { id: 89, name: "Hong Kong" },
       { id: 63, name: "Sweden" }
    ]);
    const navigate = useNavigate();
    const location = useLocation();
    const [userId, setUserId] = useState('');
    const [email, setEmail] = useState("");
    useEffect(() => {
        dispatch(fetchUser3());
        const fetchDisciplines = async () => {
            try {
                const response = await axios.get('https://api.hillpad.com/api/academics/discipline/list');
                setDisciplines(response.data.results);
            } catch (error) {
                console.error('Error fetching disciplines:', error);
            }
        };
        fetchDisciplines();

        // Check for Google parameter
        // const searchParams = new URLSearchParams(location.search);
        // if (searchParams.get('google') === 'true') {
        //     navigate('/welcome');
        // }

        return () => {
            if (user.userInfo.id) {
              setUserId(user.userInfo.id);
            }
        };
    }, [location, navigate]);

    const handleDisciplineToggle = (id) => {
        setSelectedDisciplines(prev =>
            prev.includes(id) ? prev.filter(d => d !== id) : [...prev, id]
        );
    };

    const handleCountryToggle = (id) => {
        setSelectedCountries(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const APP_BASE_URL = config.VITE_BASE_URL;
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const emailFromParams = searchParams.get("email");
        if (emailFromParams) {
          setEmail(emailFromParams);
        }
      }, []);
    const handleSubmit = async () => {
        try {
            axios.defaults.withCredentials = true;
            await axios.post(`${APP_BASE_URL}/account/user_interest`, {
                disciplines: selectedDisciplines,
                countries: selectedCountries,
            });
            // Set flag in sessionStorage before navigating
            sessionStorage.setItem('shouldReloadHome', 'true');
            
            // Navigate based on Google parameter
            const searchParams = new URLSearchParams(location.search);
            if (searchParams.get('google') === 'true') {
                navigate('/welcome');
                window.location.reload(); 
            }
            
            else {
                navigate(`/email-sent?email=${encodeURIComponent(email)}`)
                window.location.reload(); 
            }
        } catch (error) {
            console.error('Error submitting user interests:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-4xl w-full bg-white rounded-lg shadow-xl overflow-hidden">
                <div className="p-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        {step === 1 ? "Select Your Disciplines" : "Select Countries of Interest"}
                    </h2>

                    {step === 1 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {disciplines.map((discipline) => (
                                <button
                                    key={discipline.id}
                                    onClick={() => handleDisciplineToggle(discipline.id)}
                                    className={`p-4 rounded-lg text-left transition-colors ${selectedDisciplines.includes(discipline.id)
                                        ? 'bg-orange text-white'
                                        : 'bg-light_grey text-grey hover:bg-orange'
                                        }`}
                                >
                                    <span className="flex items-center">
                                        {selectedDisciplines.includes(discipline.id) && (
                                            <CheckCircle className="mr-2 h-5 w-5" />
                                        )}
                                        {discipline.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                            {countries.map((country) => (
                                <button
                                    key={country.id}
                                    onClick={() => handleCountryToggle(country.id)}
                                    className={`p-4 rounded-lg text-left transition-colors ${selectedCountries.includes(country.id)
                                        ? 'bg-orange text-white'
                                        : 'bg-light_grey text-grey hover:bg-orange'
                                        }`}
                                >
                                    <span className="flex items-center">
                                        {selectedCountries.includes(country.id) && (
                                            <CheckCircle className="mr-2 h-5 w-5" />
                                        )}
                                        {country.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                <div className="px-8 py-4 bg-light_grey border-t border-gray-200 flex justify-between">
                    {step === 2 && (
                        <button
                            onClick={() => setStep(1)}
                            className="px-6 py-2 bg-grey text-white rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 flex items-center"
                        >
                            <ChevronLeft className="mr-2 h-5 w-5" />
                            Back
                        </button>
                    )}
                    <div className="flex-grow"></div>
                    {step === 1 ? (
                        <button
                            onClick={() => setStep(2)}
                            className="px-6 py-2 bg-orange text-white rounded-md hover:bg-red focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center"
                        >
                            Next
                            <ChevronRight className="ml-2 h-5 w-5" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 bg-orange text-white rounded-md hover:bg-red focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                        >
                            Submit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostSignupSelection;