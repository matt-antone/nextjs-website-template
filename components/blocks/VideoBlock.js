import React from 'react'
import Vimeo from '../shortcodes/Vimeo'
import ReactMarkdown from 'react-markdown'
import BlockContainer from './BlockContainer'
import Block from './Block'

function VideoBlock({video,text,landingPage = true}) {
  return (
    <Block className="">
      <BlockContainer landingPage={landingPage}>
        {video ?
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center">
                <Vimeo video_id={video}/>
              </div>
              <div className="flex items-center">
                <div className="prose prose-md">
                  <ReactMarkdown
                    children={text}
                  />
                </div>
              </div>
            </div>
          : ''}
      </BlockContainer>
    </Block>
  )
}

export default VideoBlock;
