import React from 'react';
import {useState} from 'react';
import Slider from "react-slick";
import { PauseIcon,PlayIcon } from '@heroicons/react/solid'
import "slick-carousel/slick/slick.css";
import ReactMarkdown from 'react-markdown';
import Image from 'next/image'

function SimpleSlider({slides}) {
  const [pause,setPause] = useState(false)
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: false,
    respondTo: 'slider',
    // variableWidth: true,
  }
  const slider = React.createRef()

  const pauseSlick = () => {
    //console.log(pause)
    if(pause){
      slider.current.slickPlay()
      setPause(false)
    }else{
      slider.current.slickPause()
      setPause(true)
    }
  }


  return slides ? (
    <div className="relative" stle>
      <Slider {...settings} ref={slider} className="">
        {slides.map( (slide,i) => {
          return (
            <div key={slide.image} style={pause ? {opacity: .7} : ''}>
              {slide.image ? (
                <div className="relative">
                  <div className="aspect-w-16 aspect-h-16 md:aspect-h-8 lg:aspect-h-7 xl:aspect-h-5">
                    <Image src={slide.image} layout="fill" objectFit="cover" priority={true} alt={slide.alt}/>
                  </div>
                  <div className="absolute z-20 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4/5 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl px-6 lg:px-8">
                    {slide.caption ? (
                    <div
                      className="hero-text max-w-hero-text bg-brand-primary text-white p-8 prose prose-md">
                        <article>
                          <header className="text-xl">{slide.title}</header>
                          <ReactMarkdown children={slide.caption}/>
                        </article>
                      </div>
                    ) : ''}
                  </div>
                </div>
              ) : '' }
            </div>
          )
        })}
      </Slider>
      <button onClick={pauseSlick} className="absolute bottom-8 right-8 bg-brand-primary rounded p-1">
        { pause ? (
          <PlayIcon className="h-8 w-8 text-white"/>
        ) : (
          <PauseIcon className="h-8 w-8 text-white"/>
        )}
      </button>
      {/* <button>Play</button> */}
      {/* {//console.log(slider)} */}
    </div>
  ): '';
}

export default SimpleSlider;