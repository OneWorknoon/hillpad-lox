import React from 'react';

const getOSUsingUserAgent = () => {
    const userAgent = window.navigator.userAgent;

    if (userAgent.indexOf('Windows') !== -1) return 'Windows';
    if (userAgent.indexOf('Mac') !== -1) return 'Mac OS';
    if (userAgent.indexOf('Linux') !== -1) return 'Linux';
    if (userAgent.indexOf('Android') !== -1) return 'Android';
    if (userAgent.indexOf('iOS') !== -1) return 'iOS';

    return 'Unknown OS';
  };
  export default getOSUsingUserAgent
