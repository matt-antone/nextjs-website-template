import BlockContainer from './blocks/BlockContainer'
import menus from '@data/menus'
import site from '@data/site-data'

export default function Footer() {
  const date = new Date()
  const { streetAddress, addressLocality, addressRegion, postalCode } = site.BUSINESS.address
  return (
    <footer className="bg-white pt-16">
      <BlockContainer landingPage={true}>
        <div className="flex justify-center w-full space-x-16 print:hidden">
          {site.LOGO ? (
            <div className="flex-strink">
              <a href="/">
                <img src={site.LOGO} width={250} className="block" alt={`${site.SITE_NAME} Logo`}/>
              </a>
            </div>
          ) : '' }
          <div>
            <p>
              {streetAddress}<br/>
              {addressLocality}, {addressRegion} {postalCode}
              {}
            </p>
          </div>
        </div>
        <nav className="-mx-5 my-8 flex flex-wrap justify-center print:text-sm" aria-label="Footer">
          {menus.footer.map((item) => (
            <div key={item.name} className="px-5 py-2">
              <a href={item.href} className="text-brand-secondary text-gray-500 hover:text-gray-900">
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <p className="mt-8 text-center text-sm text-gray-600 print:text-xs">&copy; {date.getFullYear()} {site.ORG.name} All Rights Reserved</p>
      </BlockContainer>
    </footer>
  )
}
