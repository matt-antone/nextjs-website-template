export default function Button({onClick,onFocus,role,className,text,children,selected = false}){
  return <button
          onClick={onClick}
          onFocus={onFocus}
          role={role}
          className={`${className} ${selected ? 'text-brand-primary bg-brand-light' : 'bg-brand-primary text-white'} my-2 flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium  hover:text-brand-primary hover:bg-brand-light`}
          >{text ? text : children}</button>
}