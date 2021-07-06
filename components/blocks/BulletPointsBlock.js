import React from 'react';
import ReactMarkdown from 'react-markdown';
import Image from 'next/image'
import Block from './Block';
import BlockContainer from './BlockContainer';

function BulletPoinstBlock({bulletPoints,landingPage,headerText,headerIcon,}) {
  return (
    <Block>
      <BlockContainer>
        <div className="rounded rounded-xl bg-brand-light px-8 pb-8">
            <Image
              src={headerIcon}
              width={300}
              height={300}
              className="max-w-1/3 mx-auto"
              transform="c_fit,w_300,h_300"
            />
            <h2 className="text-center">{headerText}</h2>
          { bulletPoints ? (
            <ol className="list-inside text-left block max-w-md mx-auto">
              {bulletPoints.map((bullet,i) => (
                <li key={i}>
                  <ReactMarkdown children={bullet.text}/>
                </li>
              ))}
            </ol>
          ) : ''}
        </div>
      </BlockContainer>
    </Block>
  );
}

export default BulletPoinstBlock;