import React, { useState, useEffect } from 'react';

const AnimatedCheckmark = ({ isOpen, onClose, text, link }) => {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setIsAnimating(true);
            const timer = setTimeout(() => setIsAnimating(false), 4250);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    const handleClose = () => {
        onClose();
        if (link) {
            window.location.href = link;
        } else {
            window.location.reload()
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-contents">
                {/* <button className="close-button" onClick={handleClose}>×</button> */}
                <h2 className="modal-title">Success!</h2>
                <p className="modal-text">{text}</p>
                <div className={`success-checkmark ${isAnimating ? 'animate' : ''}`}>
                    <div className="check-icon">
                        <span className="icon-line line-tip"></span>
                        <span className="icon-line line-long"></span>
                        <div className="icon-circle"></div>
                        <div className="icon-fix"></div>
                    </div>
                </div>
                <button className="close-modal-button" onClick={handleClose}>Close</button>
                <style jsx>{`
          .modal-overlay {
            z-index: 99;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .modal-contents {
            background-color: white;
            padding: 20px;
            position:relative;
            top: 20px;
            border-radius: 5px;
            position: relative;
            width: 190%;
            max-width: 400px;
          }
          .close-button {
            position: absolute;
            right: 10px;
            top: 10px;
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
          }
          .modal-title {
            text-align: center;
            margin-top: 0;
          }
          .modal-text {
            text-align: center;
          }
          .close-modal-button {
            display: block;
            margin: 20px auto 0;
            padding: 10px 20px;
            background-color: #FF5757;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .success-checkmark {
            width: 80px;
            height: 115px;
            margin: 0 auto;
          }
          .success-checkmark .check-icon {
            width: 80px;
            height: 80px;
            position: relative;
            border-radius: 50%;
            box-sizing: content-box;
            border: 4px solid #FF5757;
          }
          .success-checkmark .check-icon::before {
            top: 3px;
            left: -2px;
            width: 30px;
            transform-origin: 100% 50%;
            border-radius: 100px 0 0 100px;
          }
          .success-checkmark .check-icon::after {
            top: 0;
            left: 30px;
            width: 60px;
            transform-origin: 0 50%;
            border-radius: 0 100px 100px 0;
            animation: rotate-circle 4.25s ease-in;
          }
          .success-checkmark .check-icon::before,
          .success-checkmark .check-icon::after {
            content: '';
            height: 100px;
            position: absolute;
            background: #FFFFFF;
            transform: rotate(-45deg);
          }
          .success-checkmark .check-icon .icon-line {
            height: 5px;
            background-color: #FF5757;
            display: block;
            border-radius: 2px;
            position: absolute;
            z-index: 10;
          }
          .success-checkmark .check-icon .icon-line.line-tip {
            top: 46px;
            left: 14px;
            width: 25px;
            transform: rotate(45deg);
            animation: icon-line-tip 0.75s;
          }
          .success-checkmark .check-icon .icon-line.line-long {
            top: 38px;
            right: 4px;
            width: 47px;
            transform: rotate(-45deg);
            animation: icon-line-long 0.75s;
          }
          .success-checkmark .check-icon .icon-circle {
            top: -4px;
            left: -4px;
            z-index: 10;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            position: absolute;
            box-sizing: content-box;
            border: 4px solid #FF5757;
          }
          .success-checkmark .check-icon .icon-fix {
            top: 8px;
            width: 5px;
            left: 26px;
            z-index: 1;
            height: 85px;
            position: absolute;
            transform: rotate(-45deg);
            background-color: #FFFFFF;
          }
          @keyframes rotate-circle {
            0% {
              transform: rotate(-45deg);
            }
            5% {
              transform: rotate(-45deg);
            }
            12% {
              transform: rotate(-405deg);
            }
            100% {
              transform: rotate(-405deg);
            }
          }
          @keyframes icon-line-tip {
            0% {
              width: 0;
              left: 1px;
              top: 19px;
            }
            54% {
              width: 0;
              left: 1px;
              top: 19px;
            }
            70% {
              width: 50px;
              left: -8px;
              top: 37px;
            }
            84% {
              width: 17px;
              left: 21px;
              top: 48px;
            }
            100% {
              width: 25px;
              left: 14px;
              top: 45px;
            }
          }
          @keyframes icon-line-long {
            0% {
              width: 0;
              right: 46px;
              top: 54px;
            }
            65% {
              width: 0;
              right: 46px;
              top: 54px;
            }
            84% {
              width: 55px;
              right: 0px;
              top: 35px;
            }
            100% {
              width: 47px;
              right: 8px;
              top: 38px;
            }
          }
        `}</style>
            </div>
        </div>
    );
};

export default AnimatedCheckmark;