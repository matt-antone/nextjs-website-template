/* This example requires Tailwind CSS v2.0+ */
import { MDXRemote } from 'next-mdx-remote'
import shortcodes from '@lib/shortcodes'
import dynamic from 'next/dynamic'
import BlockContainer from './blocks/BlockContainer'
import Image from 'next/image'

shortcodes.h1 = ({children}) => {
  return <h1 className="text-sm font-bold mb-4 text-brand-primary">{children}</h1>
}

export default function Hero({heroSource,children,hero}) {
  //////console.log(props)
  return (
    <>
    <div id="hero" className="relative bg-white overflow-hidden mb-8 sm:mb-20 min-h-full">
      <BlockContainer landingPage={true}>
        <div className="relative lg:z-10 pt-8 bg-white sm:pb-8 md:pb-8 lg:max-w-2xl lg:w-full">
          { heroSource ?
          (
          <div className="mt-0 px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28 relative">
            <div className="sm:text-center prose prose-xs md:prose-md">
              <MDXRemote {...heroSource} components={shortcodes}/>
            </div>
          </div>) : children }
        </div>
      </BlockContainer>
      <div className="hidden lg:w-3/12 xl:w-5/12 lg:block lg:absolute lg:inset-y-0 lg:right-0 aspect-x-8 aspect-y-7">
        <Image
          width={800}
          height={800}
          objectFit="cover"
          priority={true}
          src={hero.hero_image}
          alt={hero.hero_alt}
        />
      </div>
    </div>
    </>
  )
}
