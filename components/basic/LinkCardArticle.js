import React from 'react';
import ArticleCard from './ArticleCard'

function ArticleCardLink({post,summary}) {
  //console.log(post)
  const {id,key,content,data,pagePath} = post
  // const stripped = content.replace(/(<([^>]+)>)/gi, "");
  return (
      <a href={id}>
        <ArticleCard post={post} summary={summary}/>
      </a>
  );
}

export default ArticleCardLink;