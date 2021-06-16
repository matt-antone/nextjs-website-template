import { useEffect } from "react"
import CloudinaryImage from "../CloudinaryImage"
import Block from "./Block"
import BlockContainer from "./BlockContainer"

export default function LogoBlock({heading,logos}) {
  useEffect(()=>{
    AOS.init()
    AOS.refresh()
  })
  return (
    <Block>
      <div className="bg-brand-blue-light py-16">
        <BlockContainer landingPage={true}>
          {
              heading ? (
                <h2 className="text-3xl font-extrabold text-brand-blue text-center">
                  {heading}
                </h2>
              ) : ''
            }
            <div className="flow-root mt-8 lg:mt-10">
              <div id="logos" className="-mt-4 -ml-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center lg:justify-between lg:-ml-4">
                { logos ? logos.map(
                  (logo, i) => {
                    return (
                      <div key={i} className="mt-4 ml-8 p-2 flex-2 lg:p-0 lg:flex-1 lg:ml-4" data-aos="fade-down">
                        <CloudinaryImage
                          src={logo.image}
                          className="h-7 w-full block object-contain mx-auto "
                          width={250}
                          height={80}
                          transform="c_fit,w_250,h_80,f_auto"
                          alt={`${logo.name} Logo`}
                        />
                      </div>
                    )
                  }
                ) : '' }
              </div>
            </div>
        </BlockContainer>
      </div>
    </Block>
  )
}
