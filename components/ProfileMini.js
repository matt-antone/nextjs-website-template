import React from 'react';
import CloudinaryImage from '../components/CloudinaryImage'

function ProfileMini({name,position,image,email}) {
  return (
    <article className="text-center">
      {image ?
        <CloudinaryImage
          width={300}
          height={300}
          src={image}
          transform="c_fill,w_300,h_300"
          className="rounded-full mx-auto"/>
      : ''}
      <header className="text-xl my-8">
        {name}
        <small>{position}</small>
      </header>
      <footer>
        {/* <LinkEmail email={email}/> */}
      </footer>
    </article>
  );
}

export default ProfileMini;