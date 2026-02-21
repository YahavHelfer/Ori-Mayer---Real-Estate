import React, { useState, useEffect } from 'react';

const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'true');
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white p-4 text-center">
      <p>
        אנו משתמשים בעוגיות כדי לשפר את חוויית המשתמש באתר. 
        <a href="/privacy-policy" className="underline ml-2">מדיניות פרטיות</a>
      </p>
      <button onClick={handleAccept} className="ui-btn mt-2 bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 focus-visible:ring-blue-400 px-4 py-2">
        אישור
      </button>
    </div>
  );
};

export default CookieBanner;