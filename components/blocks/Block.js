import React from 'react';

function Block({children,className}) {
  return (
    <div className={`my-2 py-2 md:my-4 md:py-4 lg:my-8 lg:py-8  ${className}`}>
      {children}
    </div>
  );
}

export default Block;