/* This example requires Tailwind CSS v2.0+ */
import { Disclosure, } from '@headlessui/react'
import { MenuIcon, XIcon } from '@heroicons/react/outline'
import BlockContainer from './blocks/BlockContainer'
import MainMenu from './MainMenu'
import MobileMenu from './MobileMenu'
import site from '@data/site-data'
import menus from '@data/menus.json'
import MainSocialAccounts from './MainSocialAccounts'
import Image from 'next/image'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-white shadow relative z-60 print:hidden">
      {({ open }) => (
        <>
          <BlockContainer landingPage={true}>
            <div className="relative flex justify-center items-center lg:justify-between h-32">
              <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              {site.LOGO ? (
                <div className="w-1/4 lg:hidden">
                  <a href="/">
                    <img src={site.LOGO} width={100} className="w-11/12 h-auto max-w-xxs" alt="Sklar Kirsh Logo"/>
                  </a>
                </div>
              ) : ''}
              <MainMenu menu={menus.main} logo={site.LOGO}/>
              <MainSocialAccounts social={site.social_accounts}/>
              {site.badges && site.badges.length > 0 ? (site.badges.map( badge => (
                <div key={badge} className="pl-4">
                  <Image
                    src={badge.url}
                    width={100}
                    height={100}
                    objectFit='contain'
                    alt={badge.alt}
                  />
                </div>
              ))) : ''}
            </div>
          </BlockContainer>
          <Disclosure.Panel className="md:hidden">
            <MobileMenu menu={menus.mobile}/>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
