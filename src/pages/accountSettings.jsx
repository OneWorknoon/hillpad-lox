import React, { useState, useEffect } from 'react';
import { FiUser } from 'react-icons/fi';
import { useSelector, useDispatch } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';

const AccountSettings = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const [isLoading, setIsLoading] = useState(true);
    const [isPasswordLoading, setIsPasswordLoading] = useState(false);
    const [countries, setCountries] = useState([]);
    // const [previewImage, setPreviewImage] = useState(null);
    // const [profilePicFile, setProfilePicFile] = useState(null);
    const [userData, setUserData] = useState(null);

    const [passwordVisibility, setPasswordVisibility] = useState({
        current_password: false,
        new_password: false,
        confirm_new_password: false
    });

    const [passwordFields, setPasswordFields] = useState({
        old_password: '',
        new_password: '',
        confirm_new_password: ''
    });

    const [passwordErrors, setPasswordErrors] = useState({
        old_password: '',
        new_password: '',
        confirm_new_password: ''
    });

    // Fetch user details and countries on component mount
    useEffect(() => {
        const fetchUserDetails = async () => {
            setIsLoading(true);
            try {
                // Fetch countries
                const countriesResponse = await fetch('https://api.hillpad.com/api/academics/country/list');
                const countriesData = await countriesResponse.json();
                setCountries(countriesData.results);

                // Fetch user details
                const userResponse = await fetch('https://api.hillpad.com/api/account/detail', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (!userResponse.ok) {
                    throw new Error('Failed to fetch user details');
                }

                const userData = await userResponse.json();
                console.log({ userData })
                setUserData(userData);

                // Set initial profile state with fetched data
                setProfile({
                    first_name: userData.first_name,
                    last_name: userData.last_name,
                    email: userData.email,
                    organization: '',
                    client_profile: {
                        profile_pic: userData.client_profile.profile_pic || '',
                        socials: {
                            instagram: '',
                            twitter: '',
                            facebook: ''
                        },
                        address: userData.client_profile.address || '',
                        employment_status: userData.client_profile.employment_status || '',
                        employment_sector: userData.client_profile.employment_sector || '',
                        employment_position: userData.client_profile.employment_position || '',
                        gender: userData.client_profile.gender || '',
                        date_of_birth: userData.client_profile.date_of_birth || null,
                        nationality: userData.client_profile.nationality || '',
                        country_of_residence: userData.client_profile.country_of_residence || '',
                        phone_number: userData.client_profile.phone_number || '',
                        website: userData.client_profile.website || '',
                        user: user.userInfo.id
                    }
                });

                // Set preview image if profile pic exists
                if (userData.client_profile.profile_pic) {
                    setPreviewImage(`https://api.hillpad.com${userData.client_profile.profile_pic}`);
                }

            } catch (error) {
                console.error('Error fetching user details:', error);
                toast.error('Failed to load user details. Please try again later.', {
                    position: "top-right",
                    autoClose: 3000,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserDetails();
    }, []);

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordFields(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear any previous error for this field
        setPasswordErrors(prev => ({
            ...prev,
            [name]: ''
        }));
    };

    // Validate password fields before submission
    const validatePasswordChange = () => {
        let isValid = true;
        const errors = {
            old_password: '',
            new_password: '',
            confirm_new_password: ''
        };

        // Old password check
        if (!passwordFields.old_password) {
            errors.old_password = 'Current password is required';
            isValid = false;
        }

        // New password checks
        if (!passwordFields.new_password) {
            errors.new_password = 'New password is required';
            isValid = false;
        } else if (passwordFields.new_password.length < 8) {
            errors.new_password = 'Password must be at least 8 characters long';
            isValid = false;
        }

        // Confirm password check
        if (!passwordFields.confirm_new_password) {
            errors.confirm_new_password = 'Please confirm your new password';
            isValid = false;
        } else if (passwordFields.new_password !== passwordFields.confirm_new_password) {
            errors.confirm_new_password = 'Passwords do not match';
            isValid = false;
        }

        setPasswordErrors(errors);
        return isValid;
    };
    const passwordInputs = [
        {
            id: 1,
            name: 'old_password',
            type: 'password',
            placeholder: 'Enter current password',
            label: 'Current Password*',
            errorMessage: 'Current password is required',
            required: true
        },
        {
            id: 2,
            name: 'new_password',
            type: 'password',
            placeholder: 'Enter new password',
            label: 'New Password*',
            errorMessage: 'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
            pattern: '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
            required: true
        },
        {
            id: 3,
            name: 'confirm_new_password',
            type: 'password',
            placeholder: 'Confirm new password',
            label: 'Confirm New Password*',
            errorMessage: 'Passwords must match',
            pattern: passwordFields.new_password,
            required: true
        }
    ];

    const handlePasswordChangeSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords
        if (!validatePasswordChange()) {
            return;
        }

        setIsPasswordLoading(true);

        try {
            const response = await fetch('https://api.hillpad.com/api/account/change_password', {
                method: 'PATCH',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    old_password: passwordFields.old_password,
                    new_password: passwordFields.new_password
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log({ errorData })
                const message = errorData.old_password || errorData.new_password || 'Failed to change password';
                throw new Error(message);
            }

            // Success toast
            toast.success('Password changed successfully!', {
                position: "top-right",
                autoClose: 3000
            });

            // Reset password fields
            setPasswordFields({
                old_password: '',
                new_password: '',
                confirm_new_password: ''
            });
        } catch (err) {
            // Error toast
            console.log({ err })
            toast.error(err.message || 'Failed to change password', {
                position: "top-right",
                autoClose: 3000
            });
        } finally {
            setIsPasswordLoading(false);
        }
    };

    const [profile, setProfile] = useState({
        first_name: user.userInfo.firstName,
        last_name: user.userInfo.lastame,
        email: user.userInfo.email,
        organization: '',
        client_profile: {
            profile_pic: '',
            socials: {
                instagram: '',
                twitter: '',
                facebook: ''
            },
            address: '',
            employment_status: '',
            employment_sector: '',
            employment_position: '',
            gender: '',
            date_of_birth: null,
            nationality: '',
            country_of_residence: '',
            phone_number: '',
            website: '',
            user: user.userInfo.id
        }
    });

    // Fetch countries on component mount
    useEffect(() => {
        const fetchCountries = async () => {
            setIsLoading(true);
            try {
                const response = await fetch('https://api.hillpad.com/api/academics/country/list');
                if (!response.ok) {
                    throw new Error('Failed to fetch countries');
                }
                const data = await response.json();
                setCountries(data.results);
            } catch (error) {
                console.error(error);
                toast.error('Failed to fetch countries. Please try again later.', {
                    position: "top-right",
                    autoClose: 3000,
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchCountries();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        // Handle nested socials separately
        if (name.startsWith('socials_')) {
            const socialKey = name.split('_')[1];
            setProfile(prev => ({
                ...prev,
                client_profile: {
                    ...prev.client_profile,
                    socials: {
                        ...prev.client_profile.socials,
                        [socialKey]: value
                    }
                }
            }));
        } else if (name.startsWith('client_profile_')) {
            const profileKey = name.split('_').slice(2).join('_');
            setProfile(prev => ({
                ...prev,
                client_profile: {
                    ...prev.client_profile,
                    [profileKey]: value
                }
            }));
        } else {
            setProfile(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // const handleImageUpload = (e) => {
    //     const file = e.target.files[0];
    //     if (file) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setPreviewImage(reader.result);
    //             setProfilePicFile(file);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Create FormData to send file and other data
        const formData = new FormData();

        // Append top-level profile data
        formData.append('first_name', profile.first_name);
        formData.append('last_name', profile.last_name);
        formData.append('email', profile.email);
        formData.append('organization', profile.organization || '');

        // Append client profile data
        formData.append('client_profile[id]', user.userInfo.clientProfileId);

        // Append socials as null
        formData.append('client_profile[socials]', null);

        // Append other client profile fields, even if empty
        const clientProfileKeys = [
            'address',
            'employment_status',
            'employment_sector',
            'employment_position',
            'gender',
            'date_of_birth',
            'nationality',
            'country_of_residence',
            'phone_number',
            'website',
            'user'
        ];

        clientProfileKeys.forEach(key => {
            const value = profile.client_profile[key];
            formData.append(`client_profile[${key}]`, value || null);
        });

        // Append profile picture file if exists
      
        try {
            const response = await fetch('https://api.hillpad.com/api/account/update_user_profile', {
                method: 'PATCH',
                credentials: 'include',
                body: formData
            });
            const response1 = await fetch('https://api.hillpad.com/api/account/detail', {
                method: 'GET',
                credentials: 'include',

            });
            console.log({ response1 })
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update profile');
            }

            const responseData = await response.json();
            console.log('Profile updated successfully:', responseData);

            // Success toast
            toast.success('Profile updated successfully!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        } catch (err) {
            console.error('Error updating profile:', err);

            // Error toast
            toast.error(err.message || 'Failed to update profile', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
            });
        } finally {
            setIsLoading(false);
        }
    };
    const togglePasswordVisibility = (field) => {
        setPasswordVisibility(prevState => ({
            ...prevState,
            [field]: !prevState[field]
        }));
    };
    return (
        <div className="max-w-6xl mx-auto p-6 bg-white mt-20 rounded-2xl">
            <ToastContainer />
            <h2 className="text-3xl font-bold mb-6 text-orange text-center">
                Account Settings
            </h2>
            {isLoading ? (
                <div className="flex justify-center items-center h-64">
                    <p>Loading user details...</p>
                </div>
            ) : (
                <>
                    {/* Email Verification Status */}

                    <form onSubmit={handleSubmit} className="space-y-6">
                
                        <div className="mb-6 flex items-center justify-center">
                            <p className="text-lg font- mr-2">
                                Email: {userData?.email || ''}
                            </p>
                            {userData?.email_verified ? (
                                <CheckCircle2 className="text-green" />
                            ) : (
                                <XCircle className="text-red" />
                            )}
                            {!userData?.email_verified && (
                                <span className="ml-2 text-red text-sm">
                                    (Email Not Verified)
                                </span>
                            )}
                        </div>
                        {/* Personal Information Grid */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {/* First Name */}
                            <div>
                                <label className="block text-orange-700 font-semibold mb-2">First Name</label>
                                <input
                                    type="text"
                                    name="first_name"
                                    value={profile.first_name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-orange"
                                    placeholder="Enter first name"
                                />
                            </div>

                            {/* Last Name */}
                            <div>
                                <label className="block text-orange-700 font-semibold mb-2">Last Name</label>
                                <input
                                    type="text"
                                    name="last_name"
                                    value={profile.last_name}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-orange"
                                    placeholder="Enter last name"
                                />
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-orange-700 font-semibold mb-2">Phone Number</label>
                                <input
                                    type="tel"
                                    name="client_profile_phone_number"
                                    value={profile.client_profile.phone_number}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-orange"
                                    placeholder="+1 (123) 456-7890"
                                />
                            </div>
                            <div>
                                <label className="block text-orange-700 font-semibold mb-2">Address</label>
                                <input
                                  name="client_profile_address"
                                //   value={profile.client_profile.address !== null ? profile.client_profile.address :''}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-orange"
                                  placeholder="Enter your full address"
                                />
                            </div>

                            {/* Date of Birth */}
                            <div>
                                <label className="block text-orange-700 font-semibold mb-2">Date of Birth</label>
                                <input
                                    type="date"
                                    name="client_profile_date_of_birth"
                                    value={profile.client_profile.date_of_birth || ''}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-orange"
                                />
                            </div>

                            {/* Gender */}
                            <div>
                                <label className="block text-orange-700 font-semibold mb-2">Gender</label>
                                <select
                                    name="client_profile_gender"
                                    value={profile.client_profile.gender}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-[11px] border border-orange-300 rounded-lg focus:outline-none focus:ring-orange"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer_not_to_say">Prefer Not to Say</option>
                                </select>
                            </div>

                            {/* Nationality */}
                            <div>
                                <label className="block text-orange-700 font-semibold mb-2">Nationality</label>
                                <select
                                    name="client_profile_nationality"
                                    value={profile.client_profile.nationality}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-[11px] border border-orange-300 rounded-lg focus:outline-none focus:ring-orange"
                                >
                                    <option value="">Select Nationality</option>
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Country of Residence */}
                            <div>
                                <label className="block text-orange-700 font-semibold mb-2">Country of Residence</label>
                                <select
                                    name="client_profile_country_of_residence"
                                    value={profile.client_profile.country_of_residence}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-[11px] border border-orange-300 rounded-lg focus:outline-none focus:ring-orange"
                                >
                                    <option value="">Select Country</option>
                                    {countries.map((country) => (
                                        <option key={country.id} value={country.id}>
                                            {country.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            {/* <div className="mt-">
                                <label className="block text-orange-700 font-semibold mb-2">Personal Website</label>
                                <input
                                    type="url"
                                    name="client_profile_website"
                                    value={profile.client_profile.website}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-2 border border-orange-300 rounded-lg focus:outline-none focus:ring-orange"
                                    placeholder="Enter your personal website URL"
                                />
                            </div> */}
                        </div>
                        {/* Professional Information */}
                       



                        {/* Submit Button */}
                        <div className="mt-8 flex justify-center">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className={`bg-orange text-white px-8 py-3 rounded-lg hover:bg-orange transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-orange focus:ring-opacity-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                                {isLoading ? 'Loading...' : 'Save Profile'}
                            </button>
                        </div>
                    </form>
                    <div className="mt-6 border-t pt-6">
                        <h3 className="text-2xl font-semibold mb-4 text-orange">Change Password</h3>
                        <form onSubmit={handlePasswordChangeSubmit} className="grid md:grid-cols-1 gap-6">
                            {/* Current Password */}
                            <div className="relative">
                                <label className="block text-orange-700 font-semibold mb-2">Current Password</label>
                                <input
                                    type={passwordVisibility.old_password ? "text" : "password"}
                                    name="old_password"
                                    value={passwordFields.old_password}
                                    onChange={handlePasswordChange}
                                    className={`w-full px-4 py-2 border ${passwordErrors.old_password ? 'border-red-500' : 'border-orange-300'} rounded-lg focus:outline-none focus:ring-orange`}
                                    placeholder="Enter current password"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('old_password')}
                                    className="absolute right-3 top-10 text-gray-600"
                                >
                                    {passwordVisibility.old_password ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                                {passwordErrors.old_password && (
                                    <p className="text-red-500 text-sm mt-1">{passwordErrors.old_password}</p>
                                )}
                            </div>

                            {/* New Password */}
                            <div className="relative">
                                <label className="block text-orange-700 font-semibold mb-2">New Password</label>
                                <input
                                    type={passwordVisibility.new_password ? "text" : "password"}
                                    name="new_password"
                                    value={passwordFields.new_password}
                                    onChange={handlePasswordChange}
                                    className={`w-full px-4 py-2 border ${passwordErrors.new_password ? 'border-red-500' : 'border-orange-300'} rounded-lg focus:outline-none focus:ring-orange`}
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('new_password')}
                                    className="absolute right-3 top-10 text-gray-600"
                                >
                                    {passwordVisibility.new_password ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                                {passwordErrors.new_password && (
                                    <p className="text-red-500 text-sm mt-1">{passwordErrors.new_password}</p>
                                )}
                            </div>

                            {/* Confirm New Password */}
                            <div className="relative">
                                <label className="block text-orange-700 font-semibold mb-2">Confirm New Password</label>
                                <input
                                    type={passwordVisibility.confirm_new_password ? "text" : "password"}
                                    name="confirm_new_password"
                                    value={passwordFields.confirm_new_password}
                                    onChange={handlePasswordChange}
                                    className={`w-full px-4 py-2 border ${passwordErrors.confirm_new_password ? 'border-red-500' : 'border-orange-300'} rounded-lg focus:outline-none focus:ring-orange`}
                                    placeholder="Confirm new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirm_new_password')}
                                    className="absolute right-3 top-10 text-gray-600"
                                >
                                    {passwordVisibility.confirm_new_password ? <Eye size={20} /> : <EyeOff size={20} />}
                                </button>
                                {passwordErrors.confirm_new_password && (
                                    <p className="text-red-500 text-sm mt-1">{passwordErrors.confirm_new_password}</p>
                                )}
                            </div>

                            {/* Password Change Submit Button */}
                            <div className="mt-4 flex justify-center">
                                <button
                                    type="submit"
                                    disabled={isPasswordLoading}
                                    className={`bg-orange text-white px-8 py-3 rounded-lg hover:bg-orange transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-orange focus:ring-opacity-50 ${isPasswordLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    {isPasswordLoading ? 'Changing Password...' : 'Change Password'}
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}

        </div>
    );
};

export default AccountSettings;


