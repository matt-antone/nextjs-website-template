/*
  This Testimonial requires Tailwind CSS v2.0+
  
  This Testimonial requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/aspect-ratio'),
    ]
  }
  ```
*/

import BlockContainer from "@components/blocks/BlockContainer";
import CloudinaryImage from "@components/CloudinaryImage";


export default function Testimonial({content}) {
  return (
    <div className="bg-white pt-16 lg:py-24">
      <div className="pt-8 lg:pt-0 pb-16 bg-brand-blue lg:pb-0 lg:z-10 lg:relative">
        <BlockContainer>
          <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-3 lg:gap-8">
            <div className="relative lg:-my-8">
              <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-white lg:hidden" />
              <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:p-0 lg:h-full">
                <div className="aspect-w-10 aspect-h-6 rounded-xl shadow-xl overflow-hidden sm:aspect-w-16 sm:aspect-h-7 lg:aspect-none lg:h-full hidden lg:block">
                  <CloudinaryImage
                    src={content.image}
                    width={480}
                    height={640}
                    transform={'w_480,h_640,c_fill,f_auto'}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div className="mt-12 lg:m-0 lg:col-span-2 lg:pl-8">
              <div className="mx-auto max-w-md px-4 sm:max-w-2xl sm:px-6 lg:px-0 lg:py-20 lg:max-w-none">
                <blockquote>
                  <div>
                    <svg
                      className="h-12 w-12 text-white opacity-25"
                      fill="currentColor"
                      viewBox="0 0 32 32"
                      aria-hidden="true"
                    >
                      <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                    </svg>
                    <p className="mt-6 font-medium text-white text-5xl lg:text-3xl xl:text-5xl">{content.reviewBody}</p>
                  </div>
                  <footer className="mt-6">
                    <p className="font-medium text-white text-3xl lg:text-xl xl:text-3xl">{content.author}</p>
                    <p className="text-base font-medium text-brand-blue-light text-xl">{content.profession}</p>
                  </footer>
                </blockquote>
              </div>
            </div>
          </div>
        </BlockContainer>
      </div>
    </div>
  )
}
