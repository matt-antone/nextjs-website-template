import Head from 'next/head'

function YouTube(props) {
  return (
    <div>
      <Head>
        <link rel="stylesheet" href="node_modules/lite-youtube-embed/src/lite-yt-embed.css" />
        <script defer src="node_modules/lite-youtube-embed/src/lite-yt-embed.min.js"></script>
      </Head>
      <lite-youtube
        videoid={props.video_id}
        // videotitle="This is a video title"
      ></lite-youtube>
    </div>
  );
}

export default YouTube;