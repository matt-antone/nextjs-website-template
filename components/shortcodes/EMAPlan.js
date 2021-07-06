import React from 'react';
import { useOpenInWindow }  from 'use-open-window';

function EMAPlan(props) {
  const url = 'https://connect.emaplan.com/6p';
  const options = {
    centered: true, /* default */
    specs: {
        width: 800, /* window width */
        height: 600, /* window height */
    }
  };
  const [handleWindowOpen, newWindowHandle] = useOpenInWindow(url, options);

  return (
    <button
      className="max-w-1/2 mx-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white hover:text-brand-primary bg-brand-secondary text-white hover:bg-brand-light md:py-4 md:text-lg md:px-10"
      onClick={handleWindowOpen}
    >
      Check Your Progress
    </button>
  );
}

export default EMAPlan;