import React from 'react';
import ArticleSummary from './ArticleSummary'

function ArticleSummaryLink({post}) {
  //console.log(post)
  const {key,content,data,pagePath} = post
  const stripped = content.replace(/(<([^>]+)>)/gi, "");
  return (
      <a href={pagePath}>
        <ArticleSummary post={post}/>
      </a>
  );
}

export default ArticleSummaryLink;