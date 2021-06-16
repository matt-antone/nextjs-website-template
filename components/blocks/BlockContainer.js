import React from 'react';

function BlockContainer({children, landingPage, className = ''}) {
  return (
    <div
      className={`${landingPage ? 'max-w-4/5 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto px-6 lg:px-8' : ''} ${className}`}
    >
      {children}
    </div>
  );
}

export default BlockContainer;