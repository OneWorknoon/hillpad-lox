import React, { useState, useEffect } from 'react';
import { Eye, EyeOff } from 'lucide-react';

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  useEffect(() => {
    if (focused) {
      setIsValid(inputProps.pattern ? new RegExp(inputProps.pattern).test(inputProps.value) : true);
    }
  }, [inputProps.value, inputProps.pattern, focused]);

  const handleFocus = (e) => {
    setFocused(true);
  };

  const handleBlur = (e) => {
    setFocused(true);
    setIsValid(inputProps.pattern ? new RegExp(inputProps.pattern).test(e.target.value) : true);
  };

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="my-4">
      <label>{label}</label><br />
      <div className="relative">
        <input
          {...inputProps}
          type={inputProps.type === 'password' && showPassword ? 'text' : inputProps.type}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={() => inputProps.name === 'confirmPassword' ? setFocused(true) : null}
          className={`p-2 text-sm w-full border ${!isValid ? 'border-red-500' : 'border-light_black'} border-opacity-40 rounded-md outline-none mt-2 ${inputProps.type === 'password' ? 'pr-10' : ''}`}
        />
        {inputProps.type === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-[60%] transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            {showPassword ? (
              <Eye className="w-4 h-4" />
            ) : (
              <EyeOff className="w-4 h-4" />
            )}
          </button>
        )}
      </div>
      {!isValid && focused && <span className="text-sm text-red">{errorMessage}</span>}
    </div>
  );
};

export default FormInput;