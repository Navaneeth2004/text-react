import React from 'react'

const Options = () => {

  const option= [
    {
        title:"Appearance",
    },
    {
        title:"Backup",
    },
    {
        title:"Help",
    },

]
  return (
    <>
        {
          option.map((item)=>
          (
            <button key={item.title} className='w-screen hover:bg-green-400 flex bg-green-300 pb-4 border-solid border-2 border-gray-500'>
              <p className='mt-4 text-lg ml-4'>{item.title}</p>
            </button>
          ))     
        }
    </>

  )
}

export default Options