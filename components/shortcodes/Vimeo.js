import {useEffect,useState} from 'react';
import Head from 'next/head'

function Vimeo(props) {
  const [visible,setVisible] = useState(false)
  useEffect(()=>{
    setVisible(true)
  })
  return (
    <div className="w-full">
      <Head>
        <script defer type="module" src="https://cdn.jsdelivr.net/npm/@slightlyoff/lite-vimeo@0.1.1/lite-vimeo.min.js"></script>
      </Head>
      <lite-vimeo
        videoid={props.video_id}
        // videotitle="This is a video title"
      ></lite-vimeo>
    </div>
  );
}

export default Vimeo;