import React from 'react'

const Sidebarlayout = ({children}) => {
  return (
    <div className="grid grid-cols-12 gap-8">
      {children}
    </div>
  )
}

export default Sidebarlayout
