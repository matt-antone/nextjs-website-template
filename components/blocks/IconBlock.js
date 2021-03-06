import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image'
import Block from './Block';
import BlockContainer from './BlockContainer';

function IconBlock({icon,text,title,landingPage}) {
  useEffect(() => {
    AOS.init()
  })
  return (
    <Block>
      <BlockContainer>
        <div data-aos="fade-right">
          <Image
            src={icon}
            width={200}
            height={200}
            ariaHidden={true}
          />
        </div>
        <div className="prose prose-lg">
          <ReactMarkdown children={text}/>
        </div>
      </BlockContainer>
    </Block>
  );
}

export default IconBlock;