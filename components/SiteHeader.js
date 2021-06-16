/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from 'react'
import { Popover, Transition } from '@headlessui/react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import {
  CheckCircleIcon,
  MenuIcon,
  PhoneIcon,
  PlayIcon,
  XIcon,
} from '@heroicons/react/outline'
import { ChevronDownIcon } from '@heroicons/react/solid'

// import Icon401k from '../components/icons/Icon401k'
// import IconFinancialPlanning from '../components/icons/IconFinancialPlanning'
// import IconInvestmentServices from '../components/icons/IconInvestmentServices'
// import IconRetirement from '../components/icons/IconRetirement'

const Icon401k = dynamic(()=>import('../components/icons/Icon401k'))
const IconFinancialPlanning = dynamic(()=>import('./icons/IconFinancialPlanning'))
const IconInvestmentServices = dynamic(()=>import('./icons/IconInvestmentServices'))
const IconRetirement = dynamic(()=>import('./icons/IconRetirement'))

const BlockContainer = dynamic(()=>import('./blocks/BlockContainer'))
const Link = dynamic(()=>import('next/link'))
const LinkLogo = dynamic(()=>import('./basic/LinkLogo'))

const whatWeDo = [
  {
    name: 'Financial Planning',
    description: 'Fiduciary financial planning for individuals, families and business owners. Navalign\'s team of Certified Financial Planner professionals can help you.',
    href: '/what-we-do/fiduciary-financial-planning',
    icon: IconFinancialPlanning,
  },
  {
    name: 'Investment Services',
    description: 'Fiduciary investment management services for individuals, families and business owners. Navalign professionally manages custom portfolios to build and preserve wealth.',
    href: '/what-we-do/fiduciary-investment-services',
    icon: IconInvestmentServices,
  },
  {
    name: 'Retirement Strategies',
    description: "Financial planning and advice for retirement. Navalign\'s team of Certified Financial Planner professionals can help you achieve your retirement goals.",
    href: '/what-we-do/retirement-planning-strategies',
    icon: IconRetirement },
  {
    name: '401(k) & Pension Plans',
    description: "Fiduciary retirement plan advisor for 401(k) and Defined Benefit pension plans. Navalign helps businesses setup and manage successful retirement benefits plans for employees.",
    href: '/what-we-do/401k-and-pension-plan-fiduciary',
    icon: Icon401k,
  },
]
const callsToAction = [
  { name: 'Watch Demo', href: '#', icon: PlayIcon },
  { name: 'View All Products', href: '#', icon: CheckCircleIcon },
  { name: 'Contact Sales', href: '#', icon: PhoneIcon },
]
// const company = [
//   { name: 'About', href: '#', icon: InformationCircleIcon },
//   { name: 'Customers', href: '#', icon: OfficeBuildingIcon },
//   { name: 'Press', href: '#', icon: NewspaperIcon },
//   { name: 'Careers', href: '#', icon: BriefcaseIcon },
//   { name: 'Privacy', href: '#', icon: ShieldCheckIcon },
// ]
// const resources = [
//   { name: 'Community', href: '#', icon: UserGroupIcon },
//   { name: 'Partners', href: '#', icon: GlobeAltIcon },
//   { name: 'Guides', href: '#', icon: BookmarkAltIcon },
//   { name: 'Webinars', href: '#', icon: DesktopComputerIcon },
// ]
const blogPosts = [
  {
    id: 1,
    name: 'Boost your conversion rate',
    href: '#',
    preview: 'Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.',
    imageUrl:
      'https://images.unsplash.com/photo-1558478551-1a378f63328e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2849&q=80',
  },
  {
    id: 2,
    name: 'How to use search engine optimization to drive traffic to your site',
    href: '#',
    preview: 'Eget ullamcorper ac ut vulputate fames nec mattis pellentesque elementum. Viverra tempor id mus.',
    imageUrl:
      'https://images.unsplash.com/1/apple-gear-looking-pretty.jpg?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80',
  },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function SiteHeader() {
  const router = useRouter()

  return (
    <Popover key="SiteHeader" className="relative bg-brand-blue z-60">
      {({ open }) => (
        <>
          <div className="absolute inset-0 shadow z-60 pointer-events-none" aria-hidden="true" />
          <div className="relative">
            <BlockContainer landingPage={true}>
            <div className="flex justify-between items-center px-4 py-5 sm:px-6 sm:py-4 lg:px-8 lg:justify-start md:space-x-10">
              {/** Logo **/}
              <div>
                <LinkLogo
                  url={'/'}
                  text={'Navalign Wealth Partners'}
                  image="https://res.cloudinary.com/navalign/image/upload/q_auto:good/v1546980899/navalign-logo-top.svg"
                />
              </div>
              {/* Menu Icon */}
              <div className="-mr-2 -my-2 lg:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-600 hover:text-brand-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue">
                  <span className="sr-only">Open menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>

              <div className="hidden md:flex-1 lg:flex lg:items-center lg:justify-between">
                {/** Dropdown */}
                <Popover.Group as="nav" className="flex space-x-10">
                  <span
                    className={`${router.pathname === '/who-we-are' ? 'text-brand-blue-light' : 'text-white'} text-base font-medium hover:text-white`}
                  >
                  <Link
                    href={'/who-we-are'}
                    >Who We Are</Link>
                  </span>
                  <Popover>
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? 'text-brand-blue-light' : 'text-white',
                            'focus:ring group bg-transparent rounded-md inline-flex items-center text`-white font-medium hover:text-white focus:outline-none'
                          )}
                        >
                          <span>What We Do</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? 'text-gray-600' : 'text-white',
                              'ml-2 h-5 w-5 group-hover:text-white'
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 -translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 -translate-y-1"
                        >
                          <Popover.Panel
                            static
                            className="hidden md:block absolute z-60 top-full inset-x-0 transform shadow-lg bg-white"
                          >
                            <BlockContainer landingPage={true}>
                              <div className="grid gap-y-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-6 sm:py-8 lg:grid-cols-4 lg:px-8 lg:py-12 xl:py-16">
                                {whatWeDo.map((item) =>   {//console(router.asPath,router.asPath === item.href)
                                return (

                                  <span
                                    key={item.href}
                                    className={`text-base font-medium hover:text-brand-blue`}
                                  >
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className={`${router.asPath === item.href ? 'ring-2 ring-brand-blue-light' : ''} -m-3 p-3 flex flex-col justify-between rounded-lg hover:bg-gray-50`}
                                  >
                                      <div className="flex md:h-full lg:flex-col">
                                        <div className="flex-shrink-0">
                                          <span className="inline-flex items-center justify-center h-24 w-auto rounded-md sm:w-24 sm:w-24">
                                            <item.icon className="block h-20 w-auto" aria-hidden="true" />
                                          </span>
                                        </div>
                                        <div className="ml-4 md:flex-1 md:flex md:flex-col md:justify-between lg:ml-0 lg:mt-4">
                                          <div>
                                            <p className="text-base font-medium text-brand-blue">{item.name}</p>
                                            <p className="mt-1 text-sm">{item.description}</p>
                                          </div>
                                          <p className="mt-2 text-sm font-medium text-brand-blue lg:mt-4">
                                            Learn more <span aria-hidden="true">&rarr;</span>
                                          </p>
                                        </div>
                                      </div>
                                    </a>
                                  </span>
                                )})}
                              </div>
                            </BlockContainer>
                            <div className="bg-gray-50">
                              <BlockContainer landingPage={true}>
                                <div className="space-y-6 px-4 py-5 sm:flex sm:space-y-0 sm:space-x-10 sm:px-6 lg:px-8">
                                  {callsToAction.map((item) => (
                                    <div key={item.name} className="flow-root">
                                      <a
                                        href={item.href}
                                        className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-brand-blue hover:bg-gray-100"
                                      >
                                        <item.icon className="flex-shrink-0 h-6 w-6 text-gray-600" aria-hidden="true" />
                                        <span className="ml-3">{item.name}</span>
                                      </a>
                                    </div>
                                  ))}
                                </div>
                              </BlockContainer>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                  <a
                    href="/why-navalign"
                    className={`${router.asPath === '/why-navalign' ? 'text-brand-blue-light' : 'text-white'} text-base font-medium hover:text-white`}>
                    Why Navalign
                  </a>
                  <a
                    href="/updates"
                    className={`${router.asPath === '/updates' ? 'text-brand-blue-light' : 'text-white'} text-base font-medium hover:text-white`}>
                    Updates
                  </a>
                  <a
                    href="/contact"
                    className={`${router.asPath === '/contact' ? 'text-brand-blue-light' : 'text-white'} text-base font-medium hover:text-white`}>
                    Contact Us
                  </a>
                </Popover.Group>
                <div className="flex items-center md:ml-12">
                  <a
                    href="https://wealth.emaplan.com/ema/SignIn?ema%2fria%2f1080financial"
                    target="new"
                    rel="noopener noreferrer"
                    className="block text-base font-medium text-white rounded hover:text-white px-2 py-1 rounded border border-white hover:bg-brand-secondary">
                    Login
                  </a>
                </div>
              </div>
            </div>

            </BlockContainer>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute z-30 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5 sm:pb-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <img
                        className="h-8 w-auto"
                        src="https://res.cloudinary.com/navalign/image/upload/q_auto:good/v1546980899/navalign-logo-bottom.svg"
                        alt="Workflow"
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-600 hover:text-brand-blue hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-blue">
                        <span className="sr-only">Close menu</span>
                        <XIcon className="h-6 w-6" aria-hidden="true" /> esc
                      </Popover.Button>
                    </div>
                  </div>
                  <div className="mt-6 sm:mt-8">
                    <nav>
                      <div className="grid gap-7 sm:grid-cols-2 sm:gap-y-8 sm:gap-x-4">
                        {whatWeDo.map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="-m-3 flex items-center p-3 rounded-lg hover:bg-gray-50"
                          >
                            <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-md bg-brand-blue text-white sm:h-12 sm:w-12">
                              <item.icon className="h-6 w-6" aria-hidden="true" />
                            </div>
                            <div className="ml-4 text-base font-medium text-brand-blue">{item.name}</div>
                          </a>
                        ))}
                      </div>
                      {/* <div className="mt-8 text-base">
                        <a href="#" className="font-medium text-brand-blue hover:text-brand-blue">
                          {' '}
                          View our Servcies <span aria-hidden="true">&rarr;</span>
                        </a>
                      </div> */}
                    </nav>
                  </div>
                </div>
                <div className="py-6 px-5">
                  <div className="grid grid-cols-2 gap-4">
                    <a href="/who-we-are" className="rounded-md text-base font-medium text-brand-blue hover:text-gray-700">
                      Who we are
                    </a>

                    <a href="/why-navalign" className="rounded-md text-base font-medium text-brand-blue hover:text-gray-700">
                      Why Navalign
                    </a>

                    <a href="/updates" className="rounded-md text-base font-medium text-brand-blue hover:text-gray-700">
                      Updates
                    </a>

                    <a href="/contact" className="rounded-md text-base font-medium text-brand-blue hover:text-gray-700">
                      Contact Us
                    </a>

                    {/*<a href="#" className="rounded-md text-base font-medium text-brand-blue hover:text-gray-700">
                      Resources
                    </a>

                    <a href="#" className="rounded-md text-base font-medium text-brand-blue hover:text-gray-700">
                      Blog
                    </a>

                    <a href="#" className="rounded-md text-base font-medium text-brand-blue hover:text-gray-700">
                      Contact Sales
                    </a> */}
                  </div>
                  <div className="mt-6">
                    <a
                      target="new"
                      rel="noreferrer nofollow"
                      href="https://wealth.emaplan.com/ema/SignIn?ema%2fria%2f1080financial"
                      className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-brand-blue hover:bg-brand-blue"
                    >
                      Login
                    </a>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
