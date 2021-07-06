// import { Menu } from '@headlessui/react'

function MainMenu({menu,logo}) {

  return menu ? (
    <div className="hidden flex-1 space-x-8 lg:flex items-center justify-center sm:items-stretch sm:justify-start">
      <div className="w-24 flex items-center lg:w-32">
        {logo ? (
          <a href="/">
            <img src={logo} width={100} className="w-full" alt="Sklar Kirsh Logo"/>
          </a>
        ) : ''}
      </div>
      <div className="sm:flex flex-wrap max-w-xl xl:max-w-3xl">
        {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-brand-primary hover:border-gray-300 hover:text-gray-700" */}
        {menu.map( (item,i) => {
          return  (
            <a key={i}
            href={item.href.replace('index.md','')}
            className="uppercase text-center border-transparent text-brand-primary hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-2 xl:px-4 pt-1 border-b-2 text-sm font-medium"
          >
            <span className="" aria-hidden={true}>{item.name}</span>
          </a>
          )
        })}
      </div>
    </div>
  ) : 'No menu';
}

export default MainMenu;