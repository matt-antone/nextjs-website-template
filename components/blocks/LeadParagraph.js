import React from 'react';
import ReactMarkdown from 'react-markdown';
import Block from './Block';
import BlockContainer from './BlockContainer';

function LeadParagraph({text}) {
  return (
    <Block>
      <BlockContainer>
        <div className={`py-8sm:py-20 prose-xl`}>
          <ReactMarkdown children={text}/>
        </div>
      </BlockContainer>
    </Block>
  );
}

export default LeadParagraph;