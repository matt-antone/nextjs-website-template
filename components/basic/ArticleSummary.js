import React from 'react';
import ReactMarkdown from 'react-markdown'
import Summary from '../basic/Summary'
import Image from 'next/image'

function ArticleSummary({post}) {
  const {content,data,filePath} = post
  const stripped = content;
  const {title,featured_image} = data
  return (
    <article className="grid grid-cols-12 gap-4 mb-8">
      {featured_image ?
      <div className="col-span-3">
        <Image
          width={300}
          height={300}
          objectFit="cover"
          src={data.featured_image.url}
          alt={data.featured_image.alt}
        />
      </div>
      : ''}
      <div className="col-span-9">
        <header className="text-xl font-bold">{data.title}</header>
        <Summary>
          <ReactMarkdown children={content}/>
        </Summary>
      </div>
    </article>
  );
}

export default ArticleSummary;