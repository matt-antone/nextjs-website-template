function MobileMenu({menu}) {
  return (
    <div className="pt-2 pb-4 space-y-1">
      {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
      { menu.map( item => {
        return (
          <a
          href={item.href}
          className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
        >
          {item.name}
        </a>
        )
      }) }
    </div>
  );
}

export default MobileMenu;