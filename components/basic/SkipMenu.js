import React from 'react';
import BlockContainer from '../blocks/BlockContainer';
import Breadcrumbs from 'nextjs-breadcrumbs';


function SkipMenu({directions}) {
  return (
    <div id="skip-menu" className="absolute top-0 w-full z-0 focus-within:z-70 bg-gray-100 overflow-hidden h-36 max-h-0">
      <BlockContainer landingPage={true}>
        <div className="p-8 flex items-center gap-6">
          <a href="#content" tabIndex="0">Skip to Content</a>
          <Breadcrumbs
            listClassName="flex gap-4 py-4 pr-4"
            activeItemClassName="text-brand-secondary"
            inactiveItemClassName="text-gray-900"
            />
        </div>
      </BlockContainer>
    </div>
  );
}

export default SkipMenu;