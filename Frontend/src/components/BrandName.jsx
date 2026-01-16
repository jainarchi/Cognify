import React from 'react'

const BrandName = ({size}) => {
  return (
    <div>
      <h2 className={`text-${size ? size :'2xl'} font-black tracking-tighter text-gray-900 mb-4`}>
            Skill
            <span 
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Sphere
          </span>
         </h2>
    </div>
  )
}

export default BrandName
